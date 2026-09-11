import { describe, expect, it, vi } from "vitest";
import { pressEntity, setNumber, toggleEntity } from "../src/helpers/services";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

function entity(entityId: string, state: string, options?: string[]): HassEntity {
  return { entity_id: entityId, state, attributes: { options }, last_changed: "", last_updated: "" };
}

function mockHass() {
  const callService = vi.fn(async () => undefined);
  return { hass: { states: {}, callService, callWS: async () => [] } as unknown as HomeAssistant, callService };
}

describe("service dispatch", () => {
  it("toggles switches", async () => {
    const { hass, callService } = mockHass();
    await toggleEntity(hass, entity("switch.power", "on"));
    expect(callService).toHaveBeenCalledWith("switch", "turn_off", { entity_id: "switch.power" });
  });

  it("toggles raw Home Connect power selects by exact enum tail", async () => {
    const { hass, callService } = mockHass();
    const options = ["BSH.Common.EnumType.PowerState.On", "BSH.Common.EnumType.PowerState.Off"];
    await toggleEntity(hass, entity("select.power", options[0], options));
    expect(callService).toHaveBeenCalledWith("select", "select_option", { entity_id: "select.power", option: options[1] });
  });

  it("fails safely when a select is not a binary power selector", async () => {
    const { hass } = mockHass();
    await expect(toggleEntity(hass, entity("select.mode", "Auto", ["Auto", "Manual"]))).rejects.toThrow(/on\/off options/);
  });

  it("presses buttons and sets numbers", async () => {
    const { hass, callService } = mockHass();
    await pressEntity(hass, entity("button.start", "unknown"));
    await setNumber(hass, entity("number.temperature", "180"), 200);
    expect(callService).toHaveBeenNthCalledWith(1, "button", "press", { entity_id: "button.start" });
    expect(callService).toHaveBeenNthCalledWith(2, "number", "set_value", { entity_id: "number.temperature", value: 200 });
  });
});
