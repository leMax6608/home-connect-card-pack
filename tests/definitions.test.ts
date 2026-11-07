import { describe, expect, it } from "vitest";
import { coffeeDefinition, dishwasherDefinition, washerDefinition } from "../src/definitions";

const keys = (definition: typeof coffeeDefinition) => definition.fields.map((field) => field.key);

describe("device-specific editor roles", () => {
  it("does not expose unsupported coffee machine fields", () => {
    expect(keys(coffeeDefinition)).not.toContain("remaining_time_entity");
    expect(keys(coffeeDefinition)).not.toContain("power_state_entity");
    expect(keys(coffeeDefinition)).not.toContain("cups_entity");
    expect(keys(coffeeDefinition).filter((key) => key === "status_entity")).toHaveLength(1);
    expect(keys(coffeeDefinition).filter((key) => key === "operating_state_entity")).toHaveLength(1);
  });

  it("models multiple beverages only as a switch", () => {
    const field = coffeeDefinition.fields.find(({ key }) => key === "multiple_beverages_entity");
    expect(field).toMatchObject({ section: "program", kind: "toggle", domains: ["switch"] });
  });

  it("keeps the cup warmer in device settings and has no Options section", () => {
    const cupWarmer = coffeeDefinition.fields.find(({ key }) => key === "cup_warmer_entity");
    expect(cupWarmer).toMatchObject({ section: "settings", kind: "toggle", domains: ["switch"] });
    expect(coffeeDefinition.fields.filter(({ section }) => section === "options")).toHaveLength(0);
  });

  it("does not expose dishwasher pause or resume actions", () => {
    expect(keys(dishwasherDefinition)).not.toContain("pause_entity");
    expect(keys(dishwasherDefinition)).not.toContain("resume_entity");
  });

  it("exposes both dishwasher safety and filter warnings", () => {
    expect(keys(dishwasherDefinition)).toContain("filter_check_entity");
    expect(keys(dishwasherDefinition)).toContain("aquastop_entity");
    expect(dishwasherDefinition.fields.find((field) => field.key === "filter_check_entity")?.warning).toBe(true);
    expect(dishwasherDefinition.fields.find((field) => field.key === "aquastop_entity")?.warning).toBe(true);
  });

  it("includes a minimum viable washer definition with shared appliance fields and essential washer controls", () => {
    expect(keys(washerDefinition)).toContain("power_entity");
    expect(keys(washerDefinition)).toContain("selected_program_entity");
    expect(keys(washerDefinition)).toContain("active_program_entity");
    expect(keys(washerDefinition)).toContain("progress_entity");
    expect(keys(washerDefinition)).toContain("remaining_time_entity");
    expect(keys(washerDefinition)).toContain("start_entity");
    expect(keys(washerDefinition)).toContain("door_entity");
    expect(keys(washerDefinition)).toContain("washing_temperature_entity");
    expect(keys(washerDefinition)).toContain("spin_speed_entity");
    expect(keys(washerDefinition)).toContain("finish_at_entity");
    expect(washerDefinition.defaultName).toBe("Washer");
    expect(washerDefinition.cardType).toBe("custom:home-connect-washer-card");
  });
});
