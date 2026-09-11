import { describe, expect, it, vi } from "vitest";
import { discoverEntities } from "../src/helpers/registry";
import { dishwasherDefinition } from "../src/definitions";
import type { HomeAssistant } from "../src/types/home-assistant";

describe("registry-first discovery", () => {
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
});
