import { describe, expect, it } from "vitest";
import { customProgramName, displayProgramName } from "../src/helpers/programs";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

const hass = { states: {} } as unknown as HomeAssistant;
const program = {
  entity_id: "sensor.dryer_active_program",
  state: "LaundryCare.Dryer.Program.Cotton",
  attributes: {},
  last_changed: "",
  last_updated: "",
} as HassEntity;

describe("manual program names", () => {
  it("uses an exact manual display name without changing the original value", () => {
    const names = { "LaundryCare.Dryer.Program.Cotton": "Baumwolle" };
    expect(customProgramName(program.state, names)).toBe("Baumwolle");
    expect(displayProgramName(hass, program, names)).toBe("Baumwolle");
    expect(program.state).toBe("LaundryCare.Dryer.Program.Cotton");
  });

  it("falls back to the normal state display for missing or blank mappings", () => {
    expect(customProgramName(program.state, { [program.state]: "   " })).toBeUndefined();
    expect(displayProgramName(hass, program, {})).toBe("Cotton");
  });
});
