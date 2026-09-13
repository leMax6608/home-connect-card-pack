import type { BaseApplianceCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/home-assistant";

export function stateFor(hass: HomeAssistant | undefined, config: BaseApplianceCardConfig, key: string): HassEntity | undefined {
  const entityId = config[key];
  return hass && typeof entityId === "string" ? hass.states[entityId] : undefined;
}

export function configuredEntityIds(config: BaseApplianceCardConfig): string[] {
  const result = new Set<string>();
  for (const [key, value] of Object.entries(config)) {
    if ((key === "entity" || key.endsWith("_entity")) && typeof value === "string" && value.includes(".")) result.add(value);
  }
  return [...result];
}

export function relevantStatesChanged(
  oldHass: HomeAssistant | undefined,
  newHass: HomeAssistant | undefined,
  entityIds: string[],
): boolean {
  if (oldHass === newHass) return false;
  if (!oldHass || !newHass) return true;
  if (oldHass.language !== newHass.language || oldHass.locale?.language !== newHass.locale?.language) return true;
  return entityIds.some((id) => oldHass.states[id] !== newHass.states[id]);
}

export function domainOf(entityId: string): string {
  return entityId.split(".", 1)[0];
}
