import { LitElement, css, html } from "lit";
import { registerElement } from "../helpers/register";

export class ProgressDisplay extends LitElement {
  static properties = { value: { type: Number }, label: {}, animated: { type: Boolean } };
  value = 0;
  label = "Progress";
  animated = true;
  static styles = css`
    :host { display: block; }
    .top { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 7px; font-size: 12px; color: var(--secondary-text-color); }
    .value { color: var(--primary-text-color); font-variant-numeric: tabular-nums; font-weight: 600; }
    .track { height: 8px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), var(--divider-color) 20%); box-shadow: inset 0 1px 2px #0001; }
    .fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hc-accent), white 12%), var(--hc-accent)); box-shadow: 0 0 10px color-mix(in srgb, var(--hc-accent), transparent 62%); transition: transform 420ms cubic-bezier(.2,.8,.2,1); transform-origin: left; }
    .static .fill { transition: none; }
    @media (prefers-reduced-motion: reduce) { .fill { transition: none; } }
  `;
  render() {
    const safe = Math.max(0, Math.min(100, Number.isFinite(this.value) ? this.value : 0));
    return html`<div class=${this.animated ? "" : "static"} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(safe)}>
      <div class="top"><span>${this.label}</span><span class="value">${Math.round(safe)}%</span></div>
      <div class="track"><div class="fill" style=${`transform:scaleX(${safe / 100})`}></div></div>
    </div>`;
  }
}
registerElement("hc-progress-display", ProgressDisplay);
