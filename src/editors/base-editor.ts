import { LitElement, PropertyValues, css, html, nothing } from "lit";
import type { ApplianceCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition } from "../types/schema";
import { discoverEntities } from "../helpers/registry";
import { fieldLabel, translate } from "../helpers/localize";
import { copyText } from "../helpers/clipboard";
import { createDiscoveryReport, serializeCardConfig } from "../helpers/export";

const GROUPS = [
  { id: "general", label: "General", icon: "mdi:information-outline" },
  { id: "program", label: "Program", icon: "mdi:tune-variant" },
  { id: "actions", label: "Actions", icon: "mdi:gesture-tap-button" },
  { id: "options", label: "Options", icon: "mdi:toggle-switch-outline" },
  { id: "status", label: "Status & care", icon: "mdi:heart-pulse" },
  { id: "settings", label: "Device settings", icon: "mdi:cog-outline" },
];

export abstract class BaseApplianceEditor extends LitElement {
  static properties = {
    hass: { attribute: false }, _config: { state: true }, _discovering: { state: true }, _copying: { state: true }, _notice: { state: true },
  };
  hass?: HomeAssistant;
  protected _config?: ApplianceCardConfig;
  protected _discovering = false;
  protected _copying = "";
  protected _notice = "";
  private _autoDetectedAnchor = "";
  protected abstract definition: ApplianceDefinition;

  static styles = css`
    :host { display: block; color: var(--primary-text-color); }
    * { box-sizing: border-box; }
    .editor { display: grid; gap: 14px; }
    .intro { color: var(--secondary-text-color); font-size: 13px; line-height: 1.45; }
    .group { padding: 12px; border: 1px solid var(--divider-color); border-radius: 14px; background: var(--card-background-color); }
    .group-title { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; font-size: 14px; font-weight: 650; }
    .group-title ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
    .fields { display: grid; gap: 13px; }
    .field { display: grid; gap: 5px; }
    label { font-size: 12px; color: var(--secondary-text-color); }
    input[type=text] { width: 100%; height: 42px; padding: 0 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 9px; font: inherit; }
    .toggle { min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .toggle label { color: var(--primary-text-color); font-size: 13px; }
    .detect { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 10px; padding: 0 14px; color: var(--text-primary-color, white); background: var(--primary-color); font: inherit; font-weight: 650; cursor: pointer; }
    .detect:disabled { opacity: .55; cursor: not-allowed; }
    .tool-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .tool { min-height: 40px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 10px; border: 1px solid var(--divider-color); border-radius: 10px; color: var(--primary-text-color); background: var(--secondary-background-color); font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
    .tool:hover { border-color: var(--primary-color); }
    .tool:disabled { opacity: .55; cursor: not-allowed; }
    .tool ha-icon { --mdc-icon-size: 18px; }
    .program-names { border: 1px solid var(--divider-color); border-radius: 11px; background: color-mix(in srgb, var(--secondary-background-color), transparent 35%); }
    .program-names summary { min-height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 11px; color: var(--primary-text-color); font-size: 13px; font-weight: 650; cursor: pointer; }
    .program-names summary ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
    .program-names-body { display: grid; gap: 10px; padding: 0 11px 11px; }
    .program-names-help { margin: 0; color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
    .program-rename { display: grid; grid-template-columns: minmax(0, 1fr) minmax(140px, 1fr); align-items: center; gap: 9px; }
    .program-rename code { overflow: hidden; color: var(--secondary-text-color); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
    .program-rename input { height: 36px; font-size: 12px; }
    .notice { font-size: 12px; color: var(--secondary-text-color); }
    .loading { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (max-width: 480px) { .tool-row, .program-rename { grid-template-columns: 1fr; } .program-rename { gap: 4px; } }
  `;

  setConfig(config: ApplianceCardConfig): void { this._config = { ...config }; }

  protected updated(_changed: PropertyValues<this>): void {
    const anchor = this._config?.entity;
    if (!anchor) this._autoDetectedAnchor = "";
    if (this.hass && anchor && anchor !== this._autoDetectedAnchor) {
      this._autoDetectedAnchor = anchor;
      void this.autoDetect();
    }
  }

  private notify(config: ApplianceCardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  private change(key: string, value: string | boolean | undefined): void {
    if (!this._config) return;
    const config = { ...this._config };
    if (value === "" || value === undefined) delete config[key];
    else config[key] = value;
    this.notify(config);
  }

  private async autoDetect(): Promise<void> {
    if (!this.hass || !this._config?.entity || this._discovering) return;
    const anchor = this._config.entity;
    this._discovering = true;
    this._notice = "";
    try {
      const suggestions = await discoverEntities(this.hass, anchor, this.definition, this._config);
      if (this._config?.entity !== anchor) return;
      const safeSuggestions = Object.fromEntries(Object.entries(suggestions).filter(([key]) => !this._config?.[key]));
      const count = Object.keys(safeSuggestions).length;
      this.notify({ ...this._config, ...safeSuggestions });
      this._notice = count
        ? `${count} ${translate(this.hass, "editor.detected", "matching entities added. Review every suggestion before saving.")}`
        : translate(this.hass, "editor.no_matches", "No additional unambiguous matches were found.");
    } catch (error) {
      this._notice = error instanceof Error ? error.message : "Automatic discovery failed.";
    } finally {
      this._discovering = false;
      if (this._config?.entity && this._config.entity !== anchor) void this.autoDetect();
    }
  }

  private async copyYaml(): Promise<void> {
    if (!this._config || this._copying) return;
    this._copying = "yaml";
    try {
      await copyText(serializeCardConfig(this._config, this.definition));
      this._notice = translate(this.hass, "editor.yaml_copied", "YAML configuration copied to the clipboard.");
    } catch (error) {
      this._notice = error instanceof Error ? error.message : "Could not copy the YAML configuration.";
    } finally {
      this._copying = "";
    }
  }

  private async copyDiscoveryReport(): Promise<void> {
    if (!this.hass || !this._config?.entity || this._copying) return;
    this._copying = "report";
    try {
      const report = await createDiscoveryReport(this.hass, this._config.entity, this.definition, this._config);
      await copyText(report);
      this._notice = translate(this.hass, "editor.report_copied", "Entity discovery report copied. Review personal labels before sharing it.");
    } catch (error) {
      this._notice = error instanceof Error ? error.message : "Could not create the entity discovery report.";
    } finally {
      this._copying = "";
    }
  }

  private entitySelector(field: FieldDefinition) {
    const domain = field.domains && field.domains.length === 1 ? field.domains[0] : field.domains;
    return { entity: domain ? { domain } : {} };
  }

  private renderEntityField(field: FieldDefinition) {
    if (!this._config || !this.hass) return nothing;
    const value = typeof this._config[field.key] === "string" ? this._config[field.key] as string : "";
    return html`<div class="field"><label>${fieldLabel(this.hass, field)}</label><ha-selector
      .hass=${this.hass} .selector=${this.entitySelector(field)} .value=${value}
      @value-changed=${(ev: CustomEvent<{ value?: string }>) => {
        this.change(field.key, ev.detail.value);
        if (field.key === "entity" && ev.detail.value) void this.autoDetect();
      }}></ha-selector></div>`;
  }

  private renderToggle(key: string, label: string, defaultValue: boolean) {
    if (!this._config) return nothing;
    const checked = typeof this._config[key] === "boolean" ? Boolean(this._config[key]) : defaultValue;
    return html`<div class="toggle"><label for=${key}>${label}</label><ha-switch id=${key} .checked=${checked} @change=${(ev: Event) => this.change(key, (ev.currentTarget as HTMLInputElement).checked)}></ha-switch></div>`;
  }

  private availablePrograms(): string[] {
    if (!this._config || !this.hass) return [];
    const programs: string[] = [];
    const add = (value: unknown, explicitlyConfigured = false) => {
      if (typeof value !== "string" || !value.trim() || programs.includes(value)) return;
      const normalized = value.toLowerCase().replace(/[\s_.-]+/g, "");
      if (!explicitlyConfigured && (["unknown", "unavailable", "none", "null", "off"].includes(normalized) || /noprogram|notselected/.test(normalized))) return;
      programs.push(value);
    };
    const selectedId = this._config.selected_program_entity;
    const selected = typeof selectedId === "string" ? this.hass.states[selectedId] : undefined;
    for (const option of selected?.attributes.options || []) add(option);
    add(selected?.state);
    const activeId = this._config.active_program_entity;
    const active = typeof activeId === "string" ? this.hass.states[activeId] : undefined;
    add(active?.state);
    for (const original of Object.keys(this._config.program_names || {})) add(original, true);
    return programs;
  }

  private changeProgramName(original: string, value: string): void {
    if (!this._config) return;
    const config = { ...this._config };
    const names = { ...(config.program_names || {}) };
    const label = value.trim();
    if (label) names[original] = label;
    else delete names[original];
    if (Object.keys(names).length) config.program_names = names;
    else delete config.program_names;
    this.notify(config);
  }

  private renderProgramNames() {
    if (!this._config) return nothing;
    const programs = this.availablePrograms();
    if (!programs.length) return nothing;
    const names = this._config.program_names || {};
    return html`<details class="program-names"><summary><ha-icon icon="mdi:rename-box-outline"></ha-icon>${translate(this.hass, "editor.program_names", "Rename programs manually")}</summary><div class="program-names-body">
      <p class="program-names-help">${translate(this.hass, "editor.program_names_help", "Optional display names only. The original value is still sent to Home Assistant.")}</p>
      ${programs.map((program) => html`<label class="program-rename"><code title=${program}>${program}</code><input type="text" .value=${names[program] || ""} placeholder=${translate(this.hass, "editor.custom_program_name", "Custom name")} aria-label=${`${translate(this.hass, "editor.custom_program_name", "Custom name")}: ${program}`} @change=${(event: Event) => this.changeProgramName(program, (event.currentTarget as HTMLInputElement).value)}></label>`)}
    </div></details>`;
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    return html`<div class="editor">
      <p class="intro">${translate(this.hass, "editor.intro", "Choose any entity from the appliance as the anchor. Auto-detection uses Home Assistant's entity/device registry and only fills empty fields; every result remains editable.")}</p>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:palette-outline"></ha-icon>${translate(this.hass, "section.appearance", "Appearance")}</h3><div class="fields">
        <div class="field"><label for="name">${translate(this.hass, "editor.name", "Name override")}</label><input id="name" type="text" .value=${this._config.name || ""} placeholder=${this.definition.defaultName} @change=${(ev: Event) => this.change("name", (ev.currentTarget as HTMLInputElement).value)}></div>
        <div class="field"><label for="icon">${translate(this.hass, "editor.icon", "Icon override")}</label><input id="icon" type="text" .value=${this._config.icon || ""} placeholder=${this.definition.defaultIcon} @change=${(ev: Event) => this.change("icon", (ev.currentTarget as HTMLInputElement).value)}></div>
        <div class="field"><label for="accent_color">${translate(this.hass, "editor.accent_color", "Accent color")}</label><input id="accent_color" type="text" .value=${this._config.accent_color || ""} placeholder=${`${this.definition.accent} / var(--primary-color)`} @change=${(ev: Event) => this.change("accent_color", (ev.currentTarget as HTMLInputElement).value)}></div>
      </div></section>
      ${GROUPS.map((group) => {
        const fields = this.definition.fields.filter((field) => field.section === group.id);
        if (!fields.length) return nothing;
        return html`<section class="group"><h3 class="group-title"><ha-icon .icon=${group.icon}></ha-icon>${translate(this.hass, `section.${group.id}`, group.label)}</h3><div class="fields">${fields.map((field) => this.renderEntityField(field))}
          ${group.id === "program" ? this.renderProgramNames() : ""}
          ${group.id === "general" ? html`
            <button type="button" class="detect" ?disabled=${!this._config?.entity || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${translate(this.hass, "editor.detect", "Detect device entities")}</button>
            <div class="tool-row">
              <button type="button" class="tool" ?disabled=${Boolean(this._copying)} @click=${this.copyYaml}><ha-icon icon="mdi:content-copy"></ha-icon>${translate(this.hass, "editor.copy_yaml", "Copy YAML")}</button>
              <button type="button" class="tool" ?disabled=${!this._config?.entity || Boolean(this._copying)} @click=${this.copyDiscoveryReport}><ha-icon class=${this._copying === "report" ? "loading" : ""} .icon=${this._copying === "report" ? "mdi:loading" : "mdi:clipboard-text-search-outline"}></ha-icon>${translate(this.hass, "editor.copy_report", "Copy discovery report")}</button>
            </div>
            ${this._notice ? html`<div class="notice" role="status">${this._notice}</div>` : ""}` : ""}
        </div></section>`;
      })}
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${translate(this.hass, "section.layout", "Layout & behavior")}</h3><div class="fields">
        ${this.renderToggle("default_expanded", translate(this.hass, "option.default_expanded", "Expanded by default"), false)}
        ${this.renderToggle("animations", translate(this.hass, "option.animations", "Animations"), true)}
        ${this.renderToggle("confirm_cancel", translate(this.hass, "option.confirm_cancel", "Require a second tap to cancel a program"), true)}
        ${this.renderToggle("show_progress", translate(this.hass, "option.show_progress", "Show progress"), true)}
        ${this.renderToggle("show_remaining_time", translate(this.hass, "option.show_remaining_time", "Show remaining time"), true)}
        ${this.renderToggle("show_status_section", translate(this.hass, "option.show_status_section", "Show status section"), true)}
        ${this.renderToggle("show_options_section", translate(this.hass, "option.show_options_section", "Show options section"), true)}
        ${this.renderToggle("show_settings_section", translate(this.hass, "option.show_settings_section", "Show device settings"), true)}
      </div></section>
    </div>`;
  }
}
