import { describe, expect, it } from "vitest";
import { activeWarnings } from "../src/helpers/warnings";
import { configuredEntityIds, relevantStatesChanged } from "../src/helpers/entity";
import { washerDefinition, dishwasherDefinition, ovenDefinition, coffeeDefinition, dryerDefinition } from "../src/definitions";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

const entity = (id: string, state: string): HassEntity => ({ entity_id: id, state, attributes: { friendly_name: "Cleaning due" }, last_changed: "", last_updated: "" });
const hass = (states: Record<string, HassEntity>) => ({ states, language: "en" }) as HomeAssistant;

describe("appliance warnings", () => {
  it("keeps filled tanks and closed doors normal while warning on open doors", () => {
    const id = "sensor.door";
    for (const definition of [ovenDefinition, coffeeDefinition, dishwasherDefinition, dryerDefinition, washerDefinition]) {
      const config = { type: definition.cardType, door_entity: id };
      expect(activeWarnings(hass({ [id]: entity(id, "BSH.Common.EnumType.DoorState.Locked") }), config, definition)).toEqual([]);
      expect(activeWarnings(hass({ [id]: entity(id, "BSH.Common.EnumType.DoorState.Open") }), config, definition)).toHaveLength(1);
    }
    expect(activeWarnings(hass({ [id]: entity(id, "Filled") }), { type: coffeeDefinition.cardType, water_tank_entity: id }, coffeeDefinition)).toEqual([]);
  });
  it("shows custom reminders for all five cards, with an optional name and no duplicates", () => {
    const id = "binary_sensor.idos_cleaning_due";
    const config = { type: washerDefinition.cardType, extra_warnings: [{ entity: id, name: "Clean i-Dos" }, { entity: id }] };
    for (const definition of [washerDefinition, dishwasherDefinition, ovenDefinition, coffeeDefinition, dryerDefinition]) {
      expect(activeWarnings(hass({ [id]: entity(id, "on") }), config, definition)).toMatchObject([{ label: "Clean i-Dos", value: "" }]);
    }
    expect(activeWarnings(hass({ [id]: entity(id, "on") }), { ...config, extra_warnings: [{ entity: id }] }, washerDefinition)[0].label).toBe("Cleaning due");
  });

  it("hides inactive, unknown, unavailable and missing custom sensors", () => {
    const id = "binary_sensor.warning";
    const config = { type: washerDefinition.cardType, extra_warnings: [{ entity: id }] };
    for (const state of ["off", "unknown", "unavailable"]) expect(activeWarnings(hass({ [id]: entity(id, state) }), config, washerDefinition)).toEqual([]);
    expect(activeWarnings(hass({}), config, washerDefinition)).toEqual([]);
  });

  it("subscribes to custom sensor changes without reacting to unrelated entities", () => {
    const id = "binary_sensor.warning";
    const config = { type: washerDefinition.cardType, extra_warnings: [{ entity: id }, { entity: id }] };
    const old = hass({ [id]: entity(id, "off") });
    const ids = configuredEntityIds(config);
    expect(ids).toEqual([id]);
    expect(relevantStatesChanged(old, hass({ ...old.states, [id]: entity(id, "on") }), ids)).toBe(true);
    expect(relevantStatesChanged(old, hass({ ...old.states, "sensor.other": entity("sensor.other", "1") }), ids)).toBe(false);
  });

  it("does not duplicate built-in warnings also configured as custom reminders", () => {
    const id = "binary_sensor.salt";
    expect(activeWarnings(hass({ [id]: entity(id, "on") }), { type: dishwasherDefinition.cardType, salt_entity: id, extra_warnings: [{ entity: id }] }, dishwasherDefinition)).toHaveLength(1);
  });

  it("handles i-Dos binary events and translated raw enums without warning on filled containers", () => {
    const id = "sensor.idos1";
    const config = { type: washerDefinition.cardType, i_dos_1_fill_level_entity: id };
    for (const state of ["poor", "low", "on", "LaundryCare.Washer.EnumType.IDosFillLevel.Poor", "laundry_care_washer_enum_type_i_dos_fill_level_poor"]) {
      expect(activeWarnings(hass({ [id]: entity(id, state) }), config, washerDefinition)).toHaveLength(1);
    }
    for (const state of ["filled", "full", "off", "BSH.Common.EnumType.EventPresentState.NotPresent", "LaundryCare.Washer.EnumType.IDosFillLevel.Filled", "laundry_care_washer_enum_type_i_dos_fill_level_filled", "unknown", "unavailable"]) {
      expect(activeWarnings(hass({ [id]: entity(id, state) }), config, washerDefinition)).toEqual([]);
    }
  });
});
