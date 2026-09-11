import { LitElement, css, html, nothing } from "lit";
import type { ApplianceCardConfig, BaseApplianceCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition } from "../types/schema";
import { discoverEntities } from "../helpers/registry";
import { fieldLabel, translate } from "../helpers/localize";

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
    hass: { attribute: false }, _config: { state: true }, _discovering: { state: true }, _notice: { state: true },
  };
  hass?: HomeAssistant;
  protected _config?: ApplianceCardConfig;
  protected _discovering = false;
  protected _notice = "";
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
    .notice { font-size: 12px; color: var(--secondary-text-color); }
    .loading { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;

  setConfig(config: ApplianceCardConfig): void { this._config = { ...config }; }

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

  render() {
    if (!this._config || !this.hass) return nothing;
    return html`<div class="editor">
      <p class="intro">${translate(this.hass, "editor.intro", "Choose any entity from the appliance as the anchor. Auto-detection uses Home Assistant's entity/device registry and only fills empty fields; every result remains editable.")}</p>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:palette-outline"></ha-icon>${translate(this.hass, "section.appearance", "Appearance")}</h3><div class="fields">
        <div class="field"><label for="name">${translate(this.hass, "editor.name", "Name override")}</label><input id="name" type="text" .value=${this._config.name || ""} placeholder=${this.definition.defaultName} @change=${(ev: Event) => this.change("name", (ev.currentTarget as HTMLInputElement).value)}></div>
        <div class="field"><label for="icon">${translate(this.hass, "editor.icon", "Icon override")}</label><input id="icon" type="text" .value=${this._config.icon || ""} placeholder=${this.definition.defaultIcon} @change=${(ev: Event) => this.change("icon", (ev.currentTarget as HTMLInputElement).value)}></div>
      </div></section>
      ${GROUPS.map((group) => {
        const fields = this.definition.fields.filter((field) => field.section === group.id);
        if (!fields.length) return nothing;
        return html`<section class="group"><h3 class="group-title"><ha-icon .icon=${group.icon}></ha-icon>${translate(this.hass, `section.${group.id}`, group.label)}</h3><div class="fields">${fields.map((field) => this.renderEntityField(field))}
          ${group.id === "general" ? html`<button type="button" class="detect" ?disabled=${!this._config?.entity || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${translate(this.hass, "editor.detect", "Detect device entities")}</button>${this._notice ? html`<div class="notice">${this._notice}</div>` : ""}` : ""}
        </div></section>`;
      })}
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${translate(this.hass, "section.layout", "Layout & behavior")}</h3><div class="fields">
        ${this.renderToggle("default_expanded", translate(this.hass, "option.default_expanded", "Expanded by default"), false)}
        ${this.renderToggle("animations", translate(this.hass, "option.animations", "Animations"), true)}
        ${this.renderToggle("show_progress", translate(this.hass, "option.show_progress", "Show progress"), true)}
        ${this.renderToggle("show_remaining_time", translate(this.hass, "option.show_remaining_time", "Show remaining time"), true)}
        ${this.renderToggle("show_status_section", translate(this.hass, "option.show_status_section", "Show status section"), true)}
        ${this.renderToggle("show_options_section", translate(this.hass, "option.show_options_section", "Show options section"), true)}
        ${this.renderToggle("show_settings_section", translate(this.hass, "option.show_settings_section", "Show device settings"), true)}
      </div></section>
    </div>`;
  }
}
