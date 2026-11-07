import { commonFields } from "./common";
import type { ApplianceDefinition } from "../types/schema";

export const washerDefinition: ApplianceDefinition = {
  kind: "washer",
  cardType: "custom:home-connect-washer-card",
  editorTag: "home-connect-washer-card-editor",
  displayName: "Home Connect Washer",
  description: "Compact controls and status for a Home Connect washer.",
  defaultName: "Washer",
  defaultIcon: "mdi:washing-machine",
  accent: "#58a6ff",
  fields: [...commonFields,
    { key: "phase_entity", label: "Process phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["process phase", "programmphase", "phase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tür"], warning: true },
    { key: "washing_temperature_entity", label: "Washing temperature", section: "program", kind: "select", domains: ["select"], aliases: ["washing temperature", "waschtemperatur"] },
    { key: "spin_speed_entity", label: "Spin speed", section: "program", kind: "select", domains: ["select", "sensor"], aliases: ["spin speed", "drehzahl", "spin speed level"] },
    { key: "finish_at_entity", label: "Finish in", section: "status", kind: "status", domains: ["sensor"], aliases: ["finish at", "fertig in"] },
    { key: "drum_clean_reminder_entity", label: "Drum clean reminder", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["drum clean reminder", "trommel reinigen"], warning: true },
    { key: "prewash_entity", label: "Prewash", section: "options", kind: "toggle", domains: ["switch"], aliases: ["prewash", "vorwäsche"] },
    { key: "less_ironing_entity", label: "Less ironing", section: "options", kind: "toggle", domains: ["switch"], aliases: ["less ironing", "weniger bügeln"] },
    { key: "drum_light_entity", label: "Drum light", section: "options", kind: "light", domains: ["light", "switch"], aliases: ["drum light", "trommellicht"] },
  ],
};
