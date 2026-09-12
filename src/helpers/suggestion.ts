import type { ApplianceKind } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";

const KIND_TERMS: Record<ApplianceKind, string[]> = {
  dishwasher: ["dishwasher", "dish care", "dishcare", "geschirrspuler", "spulmaschine"],
  oven: ["oven", "backofen", "herd"],
  coffee: ["coffee maker", "coffeemaker", "coffee machine", "kaffeemaschine", "kaffeevollautomat", "espresso"],
  dryer: ["dryer", "tumble dryer", "tumbledryer", "trockner", "waschetrockner"],
};

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function matchesApplianceEntity(hass: HomeAssistant, entityId: string, kind: ApplianceKind): boolean {
  const entity = hass.states[entityId];
  if (!entity) return false;
  const haystack = normalize([
    entityId,
    entity.attributes.friendly_name,
    entity.attributes.device_class,
    entity.attributes.icon,
  ].filter(Boolean).join(" "));
  return KIND_TERMS[kind].some((term) => haystack.includes(normalize(term)));
}
