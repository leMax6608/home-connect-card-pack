import { commonFields } from "./common";
import type { ApplianceDefinition } from "../types/schema";

export const dishwasherDefinition: ApplianceDefinition = {
  kind: "dishwasher",
  cardType: "custom:home-connect-dishwasher-card",
  editorTag: "home-connect-dishwasher-card-editor",
  displayName: "Home Connect Dishwasher",
  description: "Compact controls and status for a Home Connect dishwasher.",
  defaultName: "Dishwasher",
  defaultIcon: "mdi:dishwasher",
  accent: "#4f8cff",
  fields: [...commonFields.filter((field) => field.key !== "pause_entity" && field.key !== "resume_entity"),
    { key: "phase_entity", label: "Program phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["program phase", "programmphase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["door", "tur"] },
    { key: "water_entity", label: "Estimated water", section: "status", kind: "status", domains: ["sensor"], aliases: ["water consumption", "wasserverbrauch"] },
    { key: "energy_entity", label: "Estimated energy", section: "status", kind: "status", domains: ["sensor"], aliases: ["energy consumption", "energieverbrauch"] },
    { key: "salt_entity", label: "Salt", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["salt", "salz"], warning: true },
    { key: "rinse_aid_entity", label: "Rinse aid", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["rinse aid", "klarspuler"], warning: true },
    { key: "vario_speed_entity", label: "VarioSpeed Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["variospeed"] },
    { key: "hygiene_entity", label: "Hygiene Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["hygiene plus"] },
    { key: "half_load_entity", label: "Half load", section: "options", kind: "toggle", domains: ["switch"], aliases: ["half load", "halbe ladung"] },
    { key: "silent_entity", label: "Silent", section: "options", kind: "toggle", domains: ["switch"], aliases: ["silent", "leise"] },
    { key: "care_entity", label: "Machine care", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["machine care", "maschinenreinigung"], warning: true },
    { key: "filter_entity", label: "Filter warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["filter"], warning: true },
    { key: "heater_scale_entity", label: "Heater scale warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["heater scale", "wasserheizung verkalkt"], warning: true },
  ],
};
