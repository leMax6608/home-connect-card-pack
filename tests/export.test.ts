import { describe, expect, it, vi } from "vitest";
import { createDiscoveryReport, serializeCardConfig } from "../src/helpers/export";
import { dishwasherDefinition } from "../src/definitions";
import type { HomeAssistant } from "../src/types/home-assistant";

describe("configuration exports", () => {
  it("serializes a card configuration in a stable, paste-ready order", () => {
    const yaml = serializeCardConfig({
      type: dishwasherDefinition.cardType,
      show_progress: false,
      name: "Spülmaschine Küche",
      power_entity: "switch.dishwasher_power",
      entity: "sensor.dishwasher_status",
    }, dishwasherDefinition);

    expect(yaml).toBe([
      "type: custom:home-connect-dishwasher-card",
      "entity: sensor.dishwasher_status",
      "name: \"Spülmaschine Küche\"",
      "power_entity: switch.dishwasher_power",
      "show_progress: false",
      "",
    ].join("\n"));
  });

  it("serializes manual program display names as a nested YAML mapping", () => {
    const yaml = serializeCardConfig({
      type: dishwasherDefinition.cardType,
      selected_program_entity: "select.dishwasher_program",
      program_names: {
        "Dishcare.Dishwasher.Program.Auto2": "Automatik",
        "Dishcare.Dishwasher.Program.Quick45": "Schnell 45°",
      },
    }, dishwasherDefinition);

    expect(yaml).toContain([
      "program_names:",
      "  Dishcare.Dishwasher.Program.Auto2: Automatik",
      "  Dishcare.Dishwasher.Program.Quick45: \"Schnell 45°\"",
    ].join("\n"));
  });

  it("creates a privacy-conscious discovery report without states or registry device IDs", async () => {
    const entries = [
      { entity_id: "sensor.dishwasher_status", device_id: "private-device-id", original_name: "Dishwasher status" },
      { entity_id: "switch.dishwasher_power", device_id: "private-device-id", original_name: "Power" },
    ];
    const hass = {
      states: {
        "sensor.dishwasher_status": { state: "secret-state", attributes: {} },
        "switch.dishwasher_power": { state: "on", attributes: {} },
      },
      callWS: vi.fn(async () => entries),
    } as unknown as HomeAssistant;

    const report = await createDiscoveryReport(hass, "sensor.dishwasher_status", dishwasherDefinition, {
      type: dishwasherDefinition.cardType,
      entity: "sensor.dishwasher_status",
    });

    expect(report).toContain("Version: 1.6.4");
    expect(report).toContain("status_entity: sensor.dishwasher_status (suggested)");
    expect(report).toContain("switch.dishwasher_power");
    expect(report).not.toContain("private-device-id");
    expect(report).not.toContain("secret-state");
  });
});
