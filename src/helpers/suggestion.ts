import type { ApplianceKind } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";

const KIND_TERMS: Record<ApplianceKind, string[]> = {
  dishwasher: ["dishwasher", "dish care", "dishcare", "geschirrspuler", "spulmaschine"],
  oven: ["oven", "backofen", "herd"],
  coffee: ["coffee maker", "coffeemaker", "coffee machine", "kaffeemaschine", "kaffeevollautomat", "espresso"],
  dryer: ["dryer", "tumble dryer", "tumbledryer", "trockner", "waschetrockner"],
  washer: ["washer", "washing machine", "washingmachine", "waschmaschine", "wasmachine"],
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
  // "washer" is also a substring of "dishwasher". Match complete terms for
  // this appliance while preserving existing suggestions for the other cards.
  return KIND_TERMS[kind].some((term) => kind === "washer"
    ? ` ${haystack} `.includes(` ${normalize(term)} `)
    : haystack.includes(normalize(term)));
}
