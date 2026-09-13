import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { commonCardStyles } from "../styles/common";
import type { ApplianceCardConfig } from "../types/config";
import type { HomeAssistant, HassEntity } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition, SectionId } from "../types/schema";
import { configuredEntityIds, relevantStatesChanged, stateFor } from "../helpers/entity";
import { deriveMode, displayState, isActiveMode, isAvailable, isWarningActive, progressValue, resolveAccentColor } from "../helpers/formatting";
import { pressEntity, selectOption, setNumber, toggleEntity } from "../helpers/services";
import { fieldLabel, translate } from "../helpers/localize";
import type { ControlEventDetail } from "../components/entity-control";
import type { ApplianceAction } from "../components/action-buttons";
import { fireMoreInfo } from "../helpers/actions";
import { displayProgramName } from "../helpers/programs";
import "../components/appliance-header";
import "../components/progress-display";
import "../components/status-chip";
import "../components/entity-control";
import "../components/expandable-section";
import "../components/action-buttons";

const SECTION_META: Record<SectionId, { title: string; icon: string }> = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" },
};

export abstract class BaseApplianceCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _expanded: { state: true },
    _busyIds: { state: true },
    _error: { state: true },
    _confirmingId: { state: true },
  };

  hass?: HomeAssistant;
  protected _config?: ApplianceCardConfig;
  protected _expanded = false;
  protected _busyIds = new Set<string>();
  protected _error = "";
  protected _confirmingId = "";
  private _expandedByUser = false;
  private _confirmationTimer?: number;
  protected abstract definition: ApplianceDefinition;

  static styles = [commonCardStyles, css`
    .section-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 18px; }
    .entity-slot { min-width: 0; border-bottom: 1px solid color-mix(in srgb, var(--divider-color), transparent 45%); }
    .entity-slot:nth-last-child(-n+2) { border-bottom-color: transparent; }
    .program-grid .entity-slot:first-child { grid-column: 1 / -1; }
    .power-row { padding: 2px 11px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 82%); border-radius: 13px; background: color-mix(in srgb, var(--hc-accent), transparent 94%); }
    .program-focus { padding: 2px 0 5px; }
    .activity { display: grid; gap: 10px; padding: 12px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 80%); border-radius: 14px; background: linear-gradient(135deg, color-mix(in srgb, var(--hc-accent), transparent 91%), color-mix(in srgb, var(--secondary-background-color), transparent 24%)); }
    .activity-top { display: flex; align-items: end; justify-content: space-between; gap: 12px; }
    .activity-copy { min-width: 0; }
    .activity-label { margin-bottom: 3px; color: var(--secondary-text-color); font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .activity-program { overflow: hidden; color: var(--primary-text-color); font-size: 15px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
    .activity-time { flex: none; padding: 5px 8px; border-radius: 9px; color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 88%); font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }
    @container (max-width: 620px) {
      .section-grid { grid-template-columns: 1fr; }
      .program-grid .entity-slot:first-child { grid-column: auto; }
      .entity-slot:nth-last-child(-n+2) { border-bottom-color: color-mix(in srgb, var(--divider-color), transparent 45%); }
      .entity-slot:last-child { border-bottom-color: transparent; }
    }
  `];

  setConfig(config: ApplianceCardConfig): void {
    if (!config || typeof config !== "object") throw new Error("Invalid card configuration.");
    const first = !this._config;
    const defaultChanged = this._config?.default_expanded !== config.default_expanded;
    this._config = { ...config };
    if (first || (defaultChanged && !this._expandedByUser)) this._expanded = config.default_expanded === true;
  }

  getCardSize(): number { return this._expanded ? 6 : 1; }

  getGridOptions() { return { columns: 6, min_columns: 3 }; }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearConfirmation();
  }

  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    if (!changed.has("hass")) return true;
    if (!this._config) return true;
    return relevantStatesChanged(changed.get("hass") as HomeAssistant | undefined, this.hass, configuredEntityIds(this._config));
  }

  private getState(key: string): HassEntity | undefined {
    return this._config && stateFor(this.hass, this._config, key);
  }

  private toggleExpanded(): void {
    this._expandedByUser = true;
    this._expanded = !this._expanded;
  }

  private infoEntityId(): string | undefined {
    if (!this._config) return undefined;
    for (const key of ["entity", "operating_state_entity", "status_entity", "power_state_entity", "power_entity"]) {
      const value = this._config[key];
      if (typeof value === "string" && value.includes(".")) return value;
    }
    return undefined;
  }

  private showMoreInfo(): void {
    const entityId = this.infoEntityId();
    if (!entityId) return;
    fireMoreInfo(this, entityId);
  }

  private clearConfirmation(): void {
    if (this._confirmationTimer !== undefined) window.clearTimeout(this._confirmationTimer);
    this._confirmationTimer = undefined;
    this._confirmingId = "";
  }

  private supportsField(key: string): boolean {
    return this.definition.fields.some((field) => field.key === key);
  }

  private configuredFields(section: SectionId): Array<{ field: FieldDefinition; entity: HassEntity }> {
    if (!this._config || !this.hass) return [];
    return this.definition.fields
      .filter((field) => field.section === section)
      .filter((field) => !["active_program_entity", "progress_entity", "remaining_time_entity"].includes(field.key))
      .map((field) => ({ field, entity: this.getState(field.key)! }))
      .filter(({ entity }) => !!entity);
  }

  private async withBusy(entity: HassEntity, task: () => Promise<void>): Promise<void> {
    if (this._busyIds.has(entity.entity_id)) return;
    this._busyIds = new Set(this._busyIds).add(entity.entity_id);
    this._error = "";
    try { await task(); }
    catch (error) { this._error = error instanceof Error ? error.message : "The Home Assistant service call failed."; }
    finally {
      const next = new Set(this._busyIds);
      next.delete(entity.entity_id);
      this._busyIds = next;
    }
  }

  private handleControl(event: CustomEvent<ControlEventDetail>): void {
    const { entity, action, value } = event.detail;
    void this.withBusy(entity, async () => {
      if (!this.hass) return;
      if (action === "toggle") await toggleEntity(this.hass, entity);
      if (action === "select" && typeof value === "string") await selectOption(this.hass, entity, value);
      if (action === "number" && typeof value === "number") await setNumber(this.hass, entity, value);
    });
  }

  private handleAction(event: CustomEvent<ApplianceAction>): void {
    const action = event.detail;
    if (action.danger && this._config?.confirm_cancel !== false && this._confirmingId !== action.entityId) {
      this.clearConfirmation();
      this._confirmingId = action.entityId;
      this._confirmationTimer = window.setTimeout(() => this.clearConfirmation(), 5000);
      return;
    }
    this.clearConfirmation();
    const entity = this.hass?.states[action.entityId];
    if (entity) void this.withBusy(entity, () => pressEntity(this.hass!, entity));
  }

  private renderPower(disabled: boolean) {
    const power = this.getState("power_entity") || this.getState("power_state_entity");
    if (!power) return nothing;
    const domain = power.entity_id.split(".")[0];
    const kind = domain === "select" || domain === "input_select" ? "select" : domain === "light" ? "light" : domain === "switch" || domain === "input_boolean" ? "toggle" : "status";
    return html`<div class="power-row"><hc-entity-control .hass=${this.hass} .entity=${power} .label=${translate(this.hass, "power", "Power")} .kind=${kind} .busy=${this._busyIds.has(power.entity_id)} .disabled=${disabled}></hc-entity-control></div>`;
  }

  private renderActions(mode: ReturnType<typeof deriveMode>) {
    if (!this._config || !this.hass || mode === "off" || mode === "unavailable") return nothing;
    const actionSpec = mode === "paused"
      ? [["resume_entity", translate(this.hass, "action.resume", "Resume"), "mdi:play", true, false], ["cancel_entity", translate(this.hass, "action.cancel", "Cancel"), "mdi:stop", false, true]]
      : mode === "running"
        ? [["pause_entity", translate(this.hass, "action.pause", "Pause"), "mdi:pause", false, false], ["cancel_entity", translate(this.hass, "action.cancel", "Cancel"), "mdi:stop", false, true]]
        : [["start_entity", translate(this.hass, "action.start", "Start"), "mdi:play", true, false]];
    const actions: ApplianceAction[] = actionSpec.flatMap(([key, label, icon, primary, danger]) => {
      if (!this.definition.fields.some((field) => field.key === key)) return [];
      const id = this._config?.[key as string];
      const entity = typeof id === "string" ? this.hass?.states[id] : undefined;
      const domain = entity?.entity_id.split(".")[0];
      return entity ? [{ key, label, confirmLabel: danger ? translate(this.hass, "action.confirm_cancel", "Confirm cancel") : undefined, icon, entityId: id as string, primary, danger, disabled: entity.state === "unavailable" || (domain !== "button" && domain !== "input_button") } as ApplianceAction] : [];
    });
    return actions.length ? html`<div class="primary-actions"><hc-action-buttons .actions=${actions} .busyIds=${this._busyIds} .confirmingId=${this._confirmingId}></hc-action-buttons></div>` : nothing;
  }

  private renderSection(section: SectionId, disabled: boolean) {
    if (!this._config) return nothing;
    if (section === "options" && this._config.show_options_section === false) return nothing;
    if (section === "status" && this._config.show_status_section === false) return nothing;
    if (section === "settings" && this._config.show_settings_section === false) return nothing;
    const fields = this.configuredFields(section);
    if (!fields.length) return nothing;
    const meta = SECTION_META[section];
    return html`<hc-expandable-section .title=${translate(this.hass, `section.${section}`, meta.title)} .icon=${meta.icon} .open=${false}>
      <div class="section-grid ${section === "program" ? "program-grid" : ""}">${fields.map(({ field, entity }) => html`
        <div class="entity-slot"><hc-entity-control .hass=${this.hass} .entity=${entity} .label=${fieldLabel(this.hass, field)} .kind=${this.controlKind(field, entity)}
          .valueLabels=${field.key === "selected_program_entity" || field.key === "active_program_entity" ? this._config?.program_names || {} : {}}
          .busy=${this._busyIds.has(entity.entity_id)} .disabled=${disabled && field.kind !== "status"}></hc-entity-control>
        </div>
      `)}</div>
    </hc-expandable-section>`;
  }

  private controlKind(field: FieldDefinition, entity: HassEntity): FieldDefinition["kind"] {
    if (field.kind === "status") return "status";
    const domain = entity.entity_id.split(".")[0];
    if (domain === "select" || domain === "input_select") return "select";
    if (domain === "number" || domain === "input_number") return "number";
    if (domain === "light") return "light";
    if (domain === "switch" || domain === "input_boolean") return "toggle";
    return "status";
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const status = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_state_entity") || this.getState("power_entity") || this.getState("entity");
    const power = this.getState("power_entity") || this.getState("power_state_entity");
    const activeProgram = this.getState("active_program_entity");
    const selectedProgram = this.getState("selected_program_entity");
    const progress = progressValue(this.getState("progress_entity"));
    const remaining = (this.supportsField("remaining_time_entity") ? this.getState("remaining_time_entity") : undefined)
      || (this.supportsField("finish_at_entity") ? this.getState("finish_at_entity") : undefined);
    const mode = deriveMode(power, status);
    const active = isActiveMode(mode);
    const program = active ? activeProgram || selectedProgram : selectedProgram || activeProgram;
    const summaryProgram = mode === "off" ? undefined : program;
    const summaryProgress = active ? progress : undefined;
    const summaryRemaining = active ? remaining : undefined;
    const headerStatus = mode === "off" && power ? power : status;
    const animations = this._config.animations !== false;
    const warnings = this.definition.fields
      .filter((field) => field.warning)
      .map((field) => ({ field, entity: this.getState(field.key) }))
      .filter(({ entity }) => entity && isWarningActive(entity));
    const prominent = this.definition.fields
      .filter((field) => field.prominent)
      .map((field) => ({ field, entity: this.getState(field.key) }))
      .filter(({ entity }) => isAvailable(entity));
    const detailsDisabled = mode === "running" || mode === "paused";
    const infoEntityId = this.infoEntityId();
    const accent = resolveAccentColor(this._config.accent_color, this.definition.accent);
    const programNames = this._config.program_names;

    const showActivity = mode !== "off" && (isAvailable(program) || isAvailable(summaryRemaining) || summaryProgress !== undefined);

    return html`<ha-card style=${styleMap({ "--hc-accent": accent })} @hc-control=${this.handleControl} @hc-action=${this.handleAction}>
      <div class="shell mode-${mode} ${this._expanded ? "expanded" : ""} ${animations ? "" : "no-animation"} ${mode === "unavailable" ? "unavailable" : ""}">
        <div class="summary ${summaryProgress !== undefined && this._config.show_progress !== false ? "has-progress" : ""}">
          <button class="summary-button header-button" type="button" ?disabled=${!infoEntityId} @click=${this.showMoreInfo} title=${translate(this.hass, "action.more_info", "More information")} aria-label=${translate(this.hass, "action.more_info", "More information")}>
            <hc-appliance-header .name=${this._config.name || translate(this.hass, `device.${this.definition.kind}`, this.definition.defaultName)} .icon=${this._config.icon || this.definition.defaultIcon}
              .status=${displayState(this.hass, headerStatus)} .program=${isAvailable(summaryProgram) ? displayProgramName(this.hass, summaryProgram!, programNames) : ""} .mode=${mode} .accent=${accent}></hc-appliance-header>
          </button>
          <button class="summary-button summary-toggle" type="button" @click=${this.toggleExpanded} aria-expanded=${String(this._expanded)} aria-label=${translate(this.hass, "action.toggle_details", "Toggle details")}><div class="metrics">
            ${prominent.map(({ entity }) => html`<span class="metric">${displayState(this.hass!, entity)}</span>`)}
            ${summaryProgress !== undefined && this._config.show_progress !== false ? html`<span class="metric progress">${Math.round(summaryProgress)}%</span>` : ""}
            ${isAvailable(summaryRemaining) && this._config.show_remaining_time !== false ? html`<span class="metric">${displayState(this.hass, summaryRemaining)}</span>` : ""}
          </div><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button>
          ${summaryProgress !== undefined && this._config.show_progress !== false ? html`<div class="summary-progress" aria-hidden="true"><div class="summary-progress-fill" style=${`transform:scaleX(${summaryProgress / 100})`}></div></div>` : ""}
        </div>
        <div class="details"><div class="details-inner"><div class="details-content">
          ${warnings.length ? html`<div class="warning-strip">${warnings.map(({ field, entity }) => html`<hc-status-chip .label=${fieldLabel(this.hass, field)} .value=${entity?.entity_id.startsWith("binary_sensor.") ? "" : displayState(this.hass!, entity)} warning icon="mdi:alert-outline"></hc-status-chip>`)}</div>` : ""}
          ${this.renderPower(false)}
          ${showActivity ? html`<div class="activity"><div class="activity-top"><div class="activity-copy"><div class="activity-label">${mode === "running" ? translate(this.hass, "running", "Now running") : mode === "paused" ? translate(this.hass, "paused", "Paused") : translate(this.hass, "ready", "Ready")}</div><div class="activity-program">${isAvailable(program) ? displayProgramName(this.hass, program!, programNames) : translate(this.hass, "appliance_status", "Appliance status")}</div></div>${isAvailable(summaryRemaining) && this._config.show_remaining_time !== false ? html`<div class="activity-time">${displayState(this.hass, summaryRemaining)}</div>` : ""}</div>${summaryProgress !== undefined && this._config.show_progress !== false ? html`<hc-progress-display .value=${summaryProgress} .label=${translate(this.hass, "progress", "Program progress")} .animated=${animations}></hc-progress-display>` : ""}</div>` : ""}
          ${this.renderActions(mode)}
          ${this.renderSection("program", detailsDisabled)}
          ${this.renderSection("options", detailsDisabled)}
          ${this.renderSection("status", false)}
          ${this.renderSection("settings", detailsDisabled)}
        </div></div></div>
        ${this._error ? html`<div class="error" role="alert"><span>${this._error}</span><button type="button" @click=${() => { this._error = ""; }} aria-label=${translate(this.hass, "action.dismiss", "Dismiss")} title=${translate(this.hass, "action.dismiss", "Dismiss")}><ha-icon icon="mdi:close"></ha-icon></button></div>` : ""}
      </div>
    </ha-card>`;
  }
}
