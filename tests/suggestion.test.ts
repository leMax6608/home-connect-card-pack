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
