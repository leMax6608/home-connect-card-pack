import { LitElement, css, html } from "lit";
import { registerElement } from "../helpers/register";

export interface ApplianceAction { key: string; label: string; confirmLabel?: string; icon: string; entityId: string; primary?: boolean; danger?: boolean; disabled?: boolean; }

export class ActionButtons extends LitElement {
  static properties = { actions: { attribute: false }, busyIds: { attribute: false }, confirmingId: {} };
  actions: ApplianceAction[] = [];
  busyIds = new Set<string>();
  confirmingId = "";
  static styles = css`
    :host { display: block; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; }
    button { min-height: 42px; flex: 1 1 92px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid var(--divider-color); border-radius: 12px; padding: 0 12px; color: var(--primary-text-color); background: color-mix(in srgb, var(--card-background-color), var(--secondary-background-color) 18%); box-shadow: 0 1px 2px #0000000b; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform 140ms ease, border-color 140ms ease, background 140ms ease; }
    button:hover:not(:disabled) { transform: translateY(-1px); border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 55%); }
    button:active:not(:disabled) { transform: translateY(0); }
    button.primary { color: var(--text-primary-color, white); border-color: transparent; background: linear-gradient(135deg, color-mix(in srgb, var(--hc-accent), white 10%), var(--hc-accent)); box-shadow: 0 5px 14px color-mix(in srgb, var(--hc-accent), transparent 74%); }
    button.danger { color: var(--error-color); background: color-mix(in srgb, var(--error-color), transparent 95%); }
    button.confirming { color: var(--text-primary-color, white); border-color: var(--error-color); background: var(--error-color); box-shadow: 0 5px 14px color-mix(in srgb, var(--error-color), transparent 72%); }
    button:disabled { opacity: .5; cursor: not-allowed; }
    ha-icon { --mdc-icon-size: 17px; }
    .busy ha-icon { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  render() { return html`<div class="row">${this.actions.map((action) => {
    const busy = this.busyIds.has(action.entityId);
    const confirming = this.confirmingId === action.entityId;
    return html`<button type="button" class="${action.primary ? "primary" : ""} ${action.danger ? "danger" : ""} ${confirming ? "confirming" : ""} ${busy ? "busy" : ""}" ?disabled=${action.disabled || busy} @click=${() => this.dispatchEvent(new CustomEvent("hc-action", { detail: action, bubbles: true, composed: true }))}><ha-icon .icon=${busy ? "mdi:loading" : confirming ? "mdi:alert-circle-outline" : action.icon}></ha-icon><span>${confirming ? action.confirmLabel || action.label : action.label}</span></button>`;
  })}</div>`; }
}
registerElement("hc-action-buttons", ActionButtons);
