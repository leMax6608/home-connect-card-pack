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
    { key: "phase_entity", label: "Process phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["process phase", "programmphase", "prozessphase", "phase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tür"], warning: true },
    { key: "washing_temperature_entity", label: "Washing temperature", section: "program", kind: "select", domains: ["select"], aliases: ["washing temperature", "waschtemperatur", "temperature", "temperatur", "wastemperatuur"] },
    { key: "spin_speed_entity", label: "Spin speed", section: "program", kind: "select", domains: ["select", "sensor"], aliases: ["spin speed", "drehzahl", "spin speed level"] },
    { key: "finish_at_entity", label: "Finish in", section: "status", kind: "status", domains: ["sensor"], aliases: ["finish at", "finish in", "fertig in"] },
    { key: "drum_clean_reminder_entity", label: "Drum clean reminder", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["drum clean reminder", "trommel reinigen"], warning: true },
    { key: "i_dos_1_fill_level_entity", label: "i-Dos 1 low", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["poor i dos 1 fill level", "poor idos1 fill level", "idos1 fill level poor", "i dos 1 fill level", "idos1 fill level", "i dos 1 fullstand"], warning: true, warningStates: ["on", "true", "1", "present", "confirmed", "poor", "low", "empty"] },
    { key: "i_dos_2_fill_level_entity", label: "i-Dos 2 low", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["poor i dos 2 fill level", "poor idos2 fill level", "idos2 fill level poor", "i dos 2 fill level", "idos2 fill level", "i dos 2 fullstand"], warning: true, warningStates: ["on", "true", "1", "present", "confirmed", "poor", "low", "empty"] },
    { key: "prewash_entity", label: "Prewash", section: "options", kind: "toggle", domains: ["switch"], aliases: ["prewash", "vorwäsche"] },
    { key: "less_ironing_entity", label: "Less ironing", section: "options", kind: "toggle", domains: ["switch"], aliases: ["less ironing", "weniger bügeln"] },
    { key: "drum_light_entity", label: "Drum light", section: "options", kind: "light", domains: ["light", "switch"], aliases: ["drum light", "trommellicht"] },
  ],
};
