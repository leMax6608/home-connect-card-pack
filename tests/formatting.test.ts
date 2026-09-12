import { describe, expect, it } from "vitest";
import { canonicalState, cleanLabel, deriveMode, displayState, isActiveMode, isWarningActive, progressValue, resolveAccentColor } from "../src/helpers/formatting";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

function entity(state: string, entityId = "sensor.test", attributes: HassEntity["attributes"] = {}): HassEntity {
  return { entity_id: entityId, state, attributes, last_changed: "", last_updated: "" };
}

const hass = { states: {}, callService: async () => undefined, callWS: async () => [] } as unknown as HomeAssistant;

describe("Home Connect state formatting", () => {
  it("extracts human labels and canonical enum values", () => {
    const run = entity("BSH.Common.EnumType.OperationState.Run");
    expect(cleanLabel(run.state)).toBe("Run");
    expect(canonicalState(run)).toBe("run");
  });

  it("formats ISO durations when Home Assistant has no formatter", () => {
    expect(displayState(hass, entity("PT1H5M"))).toBe("1:05 h");
    expect(displayState(hass, entity("PT42M"))).toBe("42 min");
  });

  it("localizes raw Home Connect states and unavailable values", () => {
    const germanHass = { ...hass, language: "de", formatEntityState: (value: HassEntity) => cleanLabel(value.state) };
    expect(displayState(germanHass, entity("BSH.Common.EnumType.OperationState.Run"))).toBe("Läuft");
    expect(displayState(germanHass, entity("unavailable"))).toBe("Nicht verfügbar");
  });

  it("normalizes fractional and percentage progress", () => {
    expect(progressValue(entity("0.64"))).toBe(64);
    expect(progressValue(entity("64", "sensor.progress", { unit_of_measurement: "%" }))).toBe(64);
  });

  it("does not raise warnings for inactive Home Connect enum values", () => {
    expect(isWarningActive(entity("BSH.Common.EnumType.EventPresentState.Off"))).toBe(false);
    expect(isWarningActive(entity("BSH.Common.EnumType.EventPresentState.NotPresent"))).toBe(false);
    expect(isWarningActive(entity("closed"))).toBe(false);
    expect(isWarningActive(entity("on"))).toBe(true);
    expect(isWarningActive(entity("empty"))).toBe(true);
  });

  it("derives contextual modes from Home Connect enums", () => {
    expect(deriveMode(entity("BSH.Common.EnumType.OperationState.Run"))).toBe("running");
    expect(deriveMode(entity("BSH.Common.EnumType.OperationState.Pause"))).toBe("paused");
    expect(deriveMode(entity("BSH.Common.EnumType.PowerState.Off"))).toBe("off");
    expect(deriveMode(entity("BSH.Common.EnumType.PowerState.Off"), entity("BSH.Common.EnumType.OperationState.Run"))).toBe("off");
    expect(deriveMode(entity("unavailable"))).toBe("unavailable");
    expect(isActiveMode("running")).toBe(true);
    expect(isActiveMode("paused")).toBe(true);
    expect(isActiveMode("idle")).toBe(false);
    expect(isActiveMode("off")).toBe(false);
  });

  it("accepts safe CSS colors and falls back for malformed values", () => {
    expect(resolveAccentColor("#4f8cff", "blue")).toBe("#4f8cff");
    expect(resolveAccentColor("var(--primary-color)", "blue")).toBe("var(--primary-color)");
    expect(resolveAccentColor("oklch(70% 0.15 240)", "blue")).toBe("oklch(70% 0.15 240)");
    expect(resolveAccentColor("red; display:none", "blue")).toBe("blue");
    expect(resolveAccentColor("#12345", "blue")).toBe("blue");
  });
});
