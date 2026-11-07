import { describe, expect, it } from "vitest";
import { dictionaryKeys, fieldLabel, translate, uiLanguage } from "../src/helpers/localize";
import { cleanLabel, displayState } from "../src/helpers/formatting";
import { dishwasherDefinition, washerDefinition } from "../src/definitions";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

function entity(state: string, entityId = "sensor.test", attributes: HassEntity["attributes"] = {}): HassEntity {
  return { entity_id: entityId, state, attributes, last_changed: "", last_updated: "" };
}

function hassFor(language: string): HomeAssistant {
  return { language, states: {}, callService: async () => undefined, callWS: async () => [] } as unknown as HomeAssistant;
}

describe("UI localization", () => {
  it.each([
    ["de", "Waschmaschine", "Vorwäsche", "Waschtemperatur"],
    ["nl", "Wasmachine", "Voorwassen", "Wastemperatuur"],
  ])("localizes washer names and controls in %s", (language, name, prewashLabel, temperatureLabel) => {
    const hass = hassFor(language);
    expect(translate(hass, "device.washer", "Washer")).toBe(name);
    const prewash = washerDefinition.fields.find(({ key }) => key === "prewash_entity")!;
    const temperature = washerDefinition.fields.find(({ key }) => key === "washing_temperature_entity")!;
    expect(fieldLabel(hass, prewash)).toBe(prewashLabel);
    expect(fieldLabel(hass, temperature)).toBe(temperatureLabel);
  });

  it("resolves the base language from regional Home Assistant languages", () => {
    expect(uiLanguage(hassFor("nl-BE"))).toBe("nl");
    expect(uiLanguage(hassFor("de-CH"))).toBe("de");
    expect(uiLanguage(undefined)).toBe("en");
  });

  it("translates fixed UI copy and field labels to Dutch", () => {
    const dutch = hassFor("nl");
    expect(translate(dutch, "section.options", "Options")).toBe("Opties");
    expect(translate(dutch, "action.cancel", "Cancel")).toBe("Annuleren");
    const salt = dishwasherDefinition.fields.find((field) => field.key === "salt_entity")!;
    expect(fieldLabel(dutch, salt)).toBe("Zout");
  });

  it("keeps German and the English fallback unchanged", () => {
    expect(translate(hassFor("de"), "section.options", "Options")).toBe("Optionen");
    expect(translate(hassFor("fr"), "section.options", "Options")).toBe("Options");
  });

  it("provides a Dutch translation for every German key", () => {
    expect(dictionaryKeys("nl")).toEqual(dictionaryKeys("de"));
  });

  it("localizes raw Home Connect states and unavailable values in Dutch", () => {
    const dutch = { ...hassFor("nl"), formatEntityState: (value: HassEntity) => cleanLabel(value.state) };
    expect(displayState(dutch, entity("BSH.Common.EnumType.OperationState.Run"))).toBe("Bezig");
    expect(displayState(dutch, entity("unavailable"))).toBe("Niet beschikbaar");
    expect(displayState(dutch, undefined)).toBe("Niet geconfigureerd");
  });
});
