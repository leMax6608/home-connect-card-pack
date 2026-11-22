import { describe, expect, it, vi } from "vitest";
import { pressEntity, selectOption, setNumber, toggleEntity } from "../src/helpers/services";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

function entity(entityId: string, state: string, options?: string[]): HassEntity {
  return { entity_id: entityId, state, attributes: { options }, last_changed: "", last_updated: "" };
}

function mockHass() {
  const callService = vi.fn(async () => undefined);
  return { hass: { states: {}, callService, callWS: async () => [] } as unknown as HomeAssistant, callService };
}

describe("service dispatch", () => {
  it("routes helper entities to their own domains and rejects writes to sensors", async () => {
    const { hass, callService } = mockHass();
    await toggleEntity(hass, entity("input_select.power", "On", ["On", "Off"]));
    expect(callService).toHaveBeenLastCalledWith("input_select", "select_option", { entity_id: "input_select.power", option: "Off" });
    await selectOption(hass, entity("input_select.program", "Mix", ["Mix", "Cotton"]), "Cotton");
    expect(callService).toHaveBeenLastCalledWith("input_select", "select_option", { entity_id: "input_select.program", option: "Cotton" });
    await setNumber(hass, entity("input_number.temperature", "30"), 40);
    expect(callService).toHaveBeenLastCalledWith("input_number", "set_value", { entity_id: "input_number.temperature", value: 40 });
    callService.mockClear();
    await expect(setNumber(hass, entity("sensor.temperature", "30"), 40)).rejects.toThrow(/not a number/);
    await expect(setNumber(hass, entity("number.temperature", "30"), NaN)).rejects.toThrow(/finite/);
    await expect(toggleEntity(hass, entity("sensor.power", "off"))).rejects.toThrow(/not a switch/);
    expect(callService).not.toHaveBeenCalled();
  });
  it("sends exact washer select options and never writes to a spin-speed sensor", async () => {
    const { hass, callService } = mockHass();
    const option = "LaundryCare.Washer.EnumType.SpinSpeed.RPM1200";
    await selectOption(hass, entity("select.washer_spin_speed", option, [option]), option);
    expect(callService).toHaveBeenCalledWith("select", "select_option", {
      entity_id: "select.washer_spin_speed", option,
    });
    callService.mockClear();
    await expect(selectOption(hass, entity("sensor.washer_spin_speed", option), option)).rejects.toThrow(/not a select/);
    expect(callService).not.toHaveBeenCalled();
  });

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
