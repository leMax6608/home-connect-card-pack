import type { BaseApplianceCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition } from "../types/schema";

interface RegistryEntry {
  entity_id: string;
  device_id?: string | null;
  original_name?: string | null;
  name?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function scoreEntry(hass: HomeAssistant, entry: RegistryEntry, field: FieldDefinition): number {
  const domain = entry.entity_id.split(".")[0];
  if (field.domains?.length && !field.domains.includes(domain)) return -1000;
  const state = hass.states[entry.entity_id];
  const haystack = normalize([entry.entity_id, entry.name, entry.original_name, state?.attributes.friendly_name]
    .filter(Boolean).join(" "));
  let score = 10;
  for (const alias of field.aliases || []) {
    const needle = normalize(alias);
    if (haystack.includes(needle)) score = Math.max(score, 100 + needle.length);
  }
  const keyTokens = normalize(field.key.replace(/_entity$/, "")).split(" ");
  score += keyTokens.filter((token) => haystack.includes(token)).length * 4;
  if (entry.disabled_by || entry.hidden_by) score -= 50;
  return score;
}

export async function discoverEntities(
  hass: HomeAssistant,
  anchorEntity: string,
  definition: ApplianceDefinition,
  current: BaseApplianceCardConfig,
): Promise<Partial<BaseApplianceCardConfig>> {
  const registry = await hass.callWS<RegistryEntry[]>({ type: "config/entity_registry/list" });
  const anchor = registry.find((entry) => entry.entity_id === anchorEntity);
  if (!anchor?.device_id) throw new Error("The selected anchor entity has no device registry link.");
  const candidates = registry.filter((entry) => entry.device_id === anchor.device_id && !entry.disabled_by && !entry.hidden_by);
  const suggestions: Partial<BaseApplianceCardConfig> = {};
  const used = new Set(Object.values(current).filter((value): value is string => typeof value === "string" && value.includes(".")));

  for (const field of definition.fields) {
    if (field.key === "entity" || current[field.key]) continue;
    const ranked = candidates
      .filter((entry) => !used.has(entry.entity_id))
      .map((entry) => ({ entry, score: scoreEntry(hass, entry, field) }))
      .filter(({ score }) => score >= 50)
      .sort((a, b) => b.score - a.score || a.entry.entity_id.localeCompare(b.entry.entity_id));
    if (ranked[0]) {
      suggestions[field.key] = ranked[0].entry.entity_id;
      used.add(ranked[0].entry.entity_id);
    }
  }
  return suggestions;
}
