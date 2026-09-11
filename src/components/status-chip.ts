import { LitElement, css, html } from "lit";
import { registerElement } from "../helpers/register";

export class StatusChip extends LitElement {
  static properties = { label: {}, value: {}, warning: { type: Boolean }, icon: {} };
  label = "";
  value = "";
  warning = false;
  icon = "";
  static styles = css`
    :host { display: inline-block; }
    .chip { display: inline-flex; align-items: center; gap: 6px; max-width: 240px; padding: 7px 10px; border: 1px solid color-mix(in srgb, var(--divider-color), transparent 35%); border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), transparent 8%); font-size: 11px; color: var(--secondary-text-color); }
    .warning { color: var(--warning-color, #f59e0b); border-color: color-mix(in srgb, var(--warning-color, #f59e0b), transparent 72%); background: color-mix(in srgb, var(--warning-color, #f59e0b), transparent 90%); }
    ha-icon { --mdc-icon-size: 15px; }
    span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    b { color: currentColor; font-weight: 650; }
  `;
  render() { return html`<span class="chip ${this.warning ? "warning" : ""}">${this.icon ? html`<ha-icon .icon=${this.icon}></ha-icon>` : ""}<span>${this.label}${this.value ? html` <b>${this.value}</b>` : ""}</span></span>`; }
}
registerElement("hc-status-chip", StatusChip);
