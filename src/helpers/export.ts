import type { BaseApplianceCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { ApplianceDefinition } from "../types/schema";
import { VERSION } from "../version";
import { analyzeEntityDiscovery } from "./registry";

function yamlValue(value: string | boolean): string {
  if (typeof value === "boolean") return String(value);
  return /^[A-Za-z0-9_./:%-]+$/.test(value) ? value : JSON.stringify(value);
}

export function serializeCardConfig(config: BaseApplianceCardConfig, definition: ApplianceDefinition): string {
  const preferredKeys = [
    "type", "entity", "name", "icon", "accent_color",
    ...definition.fields.map((field) => field.key), "program_names",
    "default_expanded", "animations", "confirm_cancel", "show_progress", "show_remaining_time",
    "show_status_section", "show_options_section", "show_settings_section",
  ];
  const remainingKeys = Object.keys(config).filter((key) => !preferredKeys.includes(key)).sort();
  const keys = [...new Set([...preferredKeys, ...remainingKeys])];
  return `${keys.flatMap((key) => {
    const value = config[key];
    if (typeof value === "string" || typeof value === "boolean") return [`${key}: ${yamlValue(value)}`];
    if (value && typeof value === "object") {
      const entries = Object.entries(value)
        .filter((entry): entry is [string, string] => typeof entry[1] === "string" && Boolean(entry[1].trim()))
        .sort(([left], [right]) => left.localeCompare(right));
      return entries.length ? [`${key}:`, ...entries.map(([original, label]) => `  ${yamlValue(original)}: ${yamlValue(label)}`)] : [];
    }
    return [];
  }).join("\n")}\n`;
}

function cleanLabel(value: string | null | undefined): string {
  return (value || "").replace(/[\r\n]+/g, " ").trim();
}

export async function createDiscoveryReport(
  hass: HomeAssistant,
  anchorEntity: string,
  definition: ApplianceDefinition,
  config: BaseApplianceCardConfig,
): Promise<string> {
  const { candidates, suggestions } = await analyzeEntityDiscovery(hass, anchorEntity, definition, config);
  const mappings = definition.fields.flatMap((field) => {
    const configured = config[field.key];
    const suggested = suggestions[field.key];
    const value = typeof configured === "string" ? configured : typeof suggested === "string" ? `${suggested} (suggested)` : "—";
    return [`- ${field.key}: ${value}`];
  });
  const entities = candidates
    .slice()
    .sort((a, b) => a.entity_id.localeCompare(b.entity_id))
    .map((entry) => {
      const label = cleanLabel(entry.name || entry.original_name);
      return `- ${entry.entity_id}${label ? ` | ${label}` : ""}`;
    });

  return [
    "Home Connect Card Pack – entity discovery report",
    `Version: ${VERSION}`,
    `Card: ${definition.cardType}`,
    `Anchor: ${anchorEntity}`,
    "",
    "Role mappings",
    ...mappings,
    "",
    "Enabled entities found on the same device",
    ...(entities.length ? entities : ["- none"]),
    "",
    "Privacy note: No entity states, attributes, device IDs, IP addresses or credentials are included. Entity IDs and names can still contain personal labels; review this report before sharing it.",
    "",
  ].join("\n");
}
