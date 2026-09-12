export function fireMoreInfo(target: EventTarget, entityId: string): void {
  target.dispatchEvent(new CustomEvent("hass-action", {
    detail: {
      config: { entity: entityId, tap_action: { action: "more-info" } },
      action: "tap",
    },
    bubbles: true,
    composed: true,
  }));
}
