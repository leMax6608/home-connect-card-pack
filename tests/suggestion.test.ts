import { describe, expect, it } from "vitest";
import { matchesApplianceEntity } from "../src/helpers/suggestion";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

function state(entityId: string, friendlyName: string): HassEntity {
  return { entity_id: entityId, state: "ready", attributes: { friendly_name: friendlyName }, last_changed: "", last_updated: "" };
}

const entities = [
  state("sensor.bosch_dishwasher_status", "Bosch Spülmaschine Status"),
  state("sensor.siemens_oven_state", "Backofen Betriebszustand"),
  state("select.coffee_drink", "Kaffeevollautomat Getränk"),
  state("sensor.dryer_state", "Trockner Status"),
  state("sensor.living_room_temperature", "Wohnzimmer Temperatur"),
];
const hass = { states: Object.fromEntries(entities.map((entity) => [entity.entity_id, entity])) } as unknown as HomeAssistant;

describe("card picker entity suggestions", () => {
  it.each([
    ["sensor.bosch_washer_status", "Bosch Washer Status"],
    ["sensor.siemens_washing_machine_status", "Siemens Washing Machine"],
    ["sensor.siemens_washingmachine_status", "Siemens Washingmachine"],
    ["sensor.bosch_waschmaschine_status", "Bosch Waschmaschine"],
    ["sensor.bosch_wasmachine_status", "Bosch Wasmachine"],
  ])("recognizes washer entities in supported languages: %s", (entityId, friendlyName) => {
    const washer = state(entityId, friendlyName);
    const washerHass = { states: { [entityId]: washer } } as unknown as HomeAssistant;
    expect(matchesApplianceEntity(washerHass, entityId, "washer")).toBe(true);
    expect(matchesApplianceEntity(washerHass, entityId, "dishwasher")).toBe(false);
  });

  it("does not suggest the washer card for dishwashers, dryers or unrelated entities", () => {
    expect(matchesApplianceEntity(hass, "sensor.bosch_dishwasher_status", "washer")).toBe(false);
    expect(matchesApplianceEntity(hass, "sensor.dryer_state", "washer")).toBe(false);
    expect(matchesApplianceEntity(hass, "sensor.living_room_temperature", "washer")).toBe(false);
    expect(matchesApplianceEntity(hass, "sensor.not_loaded", "washer")).toBe(false);
  });

  it("suggests only the matching appliance card", () => {
    expect(matchesApplianceEntity(hass, "sensor.bosch_dishwasher_status", "dishwasher")).toBe(true);
    expect(matchesApplianceEntity(hass, "sensor.bosch_dishwasher_status", "oven")).toBe(false);
    expect(matchesApplianceEntity(hass, "sensor.siemens_oven_state", "oven")).toBe(true);
    expect(matchesApplianceEntity(hass, "select.coffee_drink", "coffee")).toBe(true);
    expect(matchesApplianceEntity(hass, "sensor.dryer_state", "dryer")).toBe(true);
    expect(matchesApplianceEntity(hass, "sensor.living_room_temperature", "dryer")).toBe(false);
    expect(matchesApplianceEntity(hass, "sensor.not_loaded", "dishwasher")).toBe(false);
  });
});
