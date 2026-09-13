import { LitElement, css, html, nothing } from "lit";
import type { ControlKind } from "../types/schema";
import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { displayState, isAvailable, isOn, numericState } from "../helpers/formatting";
import { registerElement } from "../helpers/register";
import { fireMoreInfo } from "../helpers/actions";
import { customProgramName } from "../helpers/programs";
import type { ProgramNameMap } from "../types/config";

export interface ControlEventDetail { entity: HassEntity; action: "toggle" | "select" | "number"; value?: string | number; }

export class EntityControl extends LitElement {
  static properties = { hass: { attribute: false }, entity: { attribute: false }, valueLabels: { attribute: false }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean } };
  hass?: HomeAssistant;
  entity?: HassEntity;
  valueLabels: ProgramNameMap = {};
  label = "";
  kind: ControlKind = "status";
  disabled = false;
  busy = false;

  static styles = css`
    :host { display: block; min-width: 0; }
    .control { min-height: 48px; display: grid; gap: 6px; }
    .line { min-height: 45px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .label { min-width: 0; color: var(--secondary-text-color); font-size: 12px; font-weight: 520; }
    .value { padding: 4px 0; color: var(--primary-text-color); font-size: 13px; font-weight: 600; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .status-line { width: 100%; padding: 0; border: 0; color: inherit; background: transparent; text-align: left; font: inherit; cursor: pointer; }
    .status-line:hover .value { color: var(--hc-accent); }
    select { max-width: 62%; min-width: 120px; height: 37px; padding: 0 30px 0 11px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; font: inherit; font-size: 13px; transition: border-color 150ms ease, box-shadow 150ms ease; }
    select:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 45%); }
    .switch { position: relative; width: 42px; height: 24px; flex: none; border: 0; border-radius: 999px; padding: 2px; background: var(--switch-unchecked-track-color, var(--disabled-color)); cursor: pointer; transition: background 160ms ease; }
    .switch::after { content: ""; display: block; width: 20px; height: 20px; border-radius: 50%; background: var(--switch-unchecked-button-color, #fff); box-shadow: 0 1px 3px #0004; transition: transform 160ms ease; }
    .switch.on { background: var(--hc-accent); }
    .switch.on::after { transform: translateX(18px); }
    input[type=range] { width: 100%; height: 18px; accent-color: var(--hc-accent); cursor: pointer; }
    .number-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 12px; }
    .number-value { font-weight: 650; font-variant-numeric: tabular-nums; }
    .unavailable { opacity: .58; }
    button:disabled, select:disabled, input:disabled { cursor: not-allowed; opacity: .55; }
  `;

  private emit(action: ControlEventDetail["action"], value?: string | number) {
    if (!this.entity || this.disabled || this.busy) return;
    this.dispatchEvent(new CustomEvent<ControlEventDetail>("hc-control", { detail: { entity: this.entity, action, value }, bubbles: true, composed: true }));
  }

  render() {
    if (!this.entity || !this.hass) return nothing;
    const unavailable = !isAvailable(this.entity);
    const blocked = this.disabled || this.busy || unavailable;
    if (this.kind === "toggle" || this.kind === "light") {
      const on = isOn(this.entity);
      return html`<div class="line ${unavailable ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${on ? "on" : ""}" type="button" role="switch" aria-checked=${String(on)} aria-label=${this.label} ?disabled=${blocked} @click=${() => this.emit("toggle")}></button></div>`;
    }
    if (this.kind === "select") {
      const options = this.entity.attributes.options || [];
      const choices = options.includes(this.entity.state) || unavailable ? options : [this.entity.state, ...options];
      return html`<div class="line ${unavailable ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${blocked} @change=${(ev: Event) => this.emit("select", (ev.target as HTMLSelectElement).value)}>${choices.map((option) => html`<option .value=${option} ?selected=${option === this.entity?.state}>${customProgramName(option, this.valueLabels) || option}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const value = numericState(this.entity) ?? Number(this.entity.attributes.min ?? 0);
      const min = Number(this.entity.attributes.min ?? 0);
      const max = Number(this.entity.attributes.max ?? 100);
      const step = Number(this.entity.attributes.step ?? 1);
      return html`<div class="control ${unavailable ? "unavailable" : ""}"><div class="number-head"><label class="label" for="range">${this.label}</label><span class="number-value">${displayState(this.hass, this.entity)}</span></div><input id="range" type="range" min=${min} max=${max} step=${step} .value=${String(value)} ?disabled=${blocked} @change=${(ev: Event) => this.emit("number", Number((ev.target as HTMLInputElement).value))}></div>`;
    }
    const displayed = customProgramName(this.entity.state, this.valueLabels) || displayState(this.hass, this.entity);
    return html`<button type="button" class="line status-line ${unavailable ? "unavailable" : ""}" @click=${() => fireMoreInfo(this, this.entity!.entity_id)} aria-label=${`${this.label}: ${displayed}`}><span class="label">${this.label}</span><span class="value">${displayed}</span></button>`;
  }
}
registerElement("hc-entity-control", EntityControl);
