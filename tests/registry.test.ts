import { describe, expect, it, vi } from "vitest";
import { discoverEntities } from "../src/helpers/registry";
import { dishwasherDefinition, dryerDefinition, ovenDefinition } from "../src/definitions";
import type { HomeAssistant } from "../src/types/home-assistant";

describe("registry-first discovery", () => {
  it("assigns a dryer power-state anchor to Status and finds its remaining device roles", async () => {
    const entries = [
      { entity_id: "sensor.bosch_trockner_power_state", device_id: "dryer-1", original_name: "Power State" },
      { entity_id: "sensor.bosch_trockner_betriebszustand", device_id: "dryer-1", original_name: "Betriebszustand" },
      { entity_id: "switch.bosch_trockner_einschalter", device_id: "dryer-1", original_name: "Einschalter" },
      { entity_id: "sensor.bosch_trockner_programmfortschritt", device_id: "dryer-1", original_name: "Programmfortschritt" },
    ];
    const hass = {
      states: Object.fromEntries(entries.map((entry) => [entry.entity_id, { attributes: { friendly_name: entry.original_name } }])),
      callWS: vi.fn(async () => entries),
    } as unknown as HomeAssistant;

    const result = await discoverEntities(hass, "sensor.bosch_trockner_power_state", dryerDefinition, {
      type: dryerDefinition.cardType,
      entity: "sensor.bosch_trockner_power_state",
    });

    expect(result.status_entity).toBe("sensor.bosch_trockner_power_state");
    expect(result.operating_state_entity).toBe("sensor.bosch_trockner_betriebszustand");
    expect(result.power_entity).toBe("switch.bosch_trockner_einschalter");
    expect(result.progress_entity).toBe("sensor.bosch_trockner_programmfortschritt");
  });

  it("can reuse the anchor itself as the matching status role", async () => {
    const entries = [
      { entity_id: "sensor.siemens_backofen_status", device_id: "oven-1", original_name: "Status" },
      { entity_id: "sensor.siemens_backofen_betriebszustand", device_id: "oven-1", original_name: "Betriebszustand" },
      { entity_id: "switch.siemens_backofen_einschalter", device_id: "oven-1", original_name: "Einschalter" },
    ];
    const hass = {
      states: {
        "sensor.siemens_backofen_status": { attributes: { friendly_name: "Siemens Backofen Status" } },
        "sensor.siemens_backofen_betriebszustand": { attributes: { friendly_name: "Siemens Backofen Betriebszustand" } },
        "switch.siemens_backofen_einschalter": { attributes: { friendly_name: "Siemens Backofen Einschalter" } },
      },
      callWS: vi.fn(async () => entries),
    } as unknown as HomeAssistant;

    const result = await discoverEntities(hass, "sensor.siemens_backofen_status", ovenDefinition, {
      type: ovenDefinition.cardType,
      entity: "sensor.siemens_backofen_status",
    });

    expect(result.status_entity).toBe("sensor.siemens_backofen_status");
    expect(result.operating_state_entity).toBe("sensor.siemens_backofen_betriebszustand");
    expect(result.power_entity).toBe("switch.siemens_backofen_einschalter");
  });

  it("uses only enabled entities from the anchor device and preserves manual choices", async () => {
    const entries = [
      { entity_id: "sensor.anchor", device_id: "device-a", original_name: "Status" },
      { entity_id: "switch.power", device_id: "device-a", original_name: "Power" },
      { entity_id: "sensor.progress", device_id: "device-a", original_name: "Program progress" },
      { entity_id: "sensor.other_progress", device_id: "device-b", original_name: "Program progress" },
      { entity_id: "button.disabled_start", device_id: "device-a", original_name: "Start", disabled_by: "user" },
      { entity_id: "button.hidden_start", device_id: "device-a", original_name: "Start", hidden_by: "user" },
    ];
    const hass = {
      states: {
        "sensor.anchor": { attributes: { friendly_name: "Dishwasher status" } },
        "switch.power": { attributes: { friendly_name: "Dishwasher power" } },
        "sensor.progress": { attributes: { friendly_name: "Dishwasher program progress" } },
      },
      callWS: vi.fn(async () => entries),
    } as unknown as HomeAssistant;

    const result = await discoverEntities(hass, "sensor.anchor", dishwasherDefinition, {
      type: dishwasherDefinition.cardType,
      entity: "sensor.anchor",
      status_entity: "sensor.manual_status",
    });

    expect(result.power_entity).toBe("switch.power");
    expect(result.progress_entity).toBe("sensor.progress");
    expect(result.status_entity).toBeUndefined();
    expect(result.start_entity).toBeUndefined();
    expect(Object.values(result)).not.toContain("sensor.other_progress");
  });

  it("detects dishwasher filter-system and AquaStop warnings without mixing filter roles", async () => {
    const entries = [
      { entity_id: "sensor.bosch_dishwasher_status", device_id: "dishwasher-1", original_name: "Status" },
      { entity_id: "binary_sensor.bosch_dishwasher_filtersystem_prufen", device_id: "dishwasher-1", original_name: "Filtersystem prüfen" },
      { entity_id: "binary_sensor.bosch_dishwasher_maschinenreinigung_filter", device_id: "dishwasher-1", original_name: "Maschinenreinigung Filter" },
      { entity_id: "binary_sensor.bosch_dishwasher_aquastop_aufgetreten", device_id: "dishwasher-1", original_name: "AquaStop aufgetreten" },
    ];
    const hass = {
      states: Object.fromEntries(entries.map((entry) => [entry.entity_id, { attributes: { friendly_name: entry.original_name } }])),
      callWS: vi.fn(async () => entries),
    } as unknown as HomeAssistant;

    const result = await discoverEntities(hass, "sensor.bosch_dishwasher_status", dishwasherDefinition, {
      type: dishwasherDefinition.cardType,
      entity: "sensor.bosch_dishwasher_status",
    });

    expect(result.filter_check_entity).toBe("binary_sensor.bosch_dishwasher_filtersystem_prufen");
    expect(result.filter_entity).toBe("binary_sensor.bosch_dishwasher_maschinenreinigung_filter");
    expect(result.aquastop_entity).toBe("binary_sensor.bosch_dishwasher_aquastop_aufgetreten");
  });
});
