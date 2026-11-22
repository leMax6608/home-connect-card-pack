import type { BaseApplianceCardConfig, ExtraWarning } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { ApplianceDefinition } from "../types/schema";
import { canonicalState, displayState, isWarningActive } from "./formatting";
import { fieldLabel } from "./localize";

export function extraWarnings(config: BaseApplianceCardConfig): ExtraWarning[] {
  if (!Array.isArray(config.extra_warnings)) return [];
  return config.extra_warnings.filter((item): item is ExtraWarning => !!item && typeof item.entity === "string" && item.entity.includes("."));
}

export function activeWarnings(hass: HomeAssistant, config: BaseApplianceCardConfig, definition: ApplianceDefinition) {
  const candidates = definition.fields.filter((field) => field.warning).flatMap((field) => {
    const id = config[field.key];
    if (typeof id !== "string") return [];
    const entity = hass.states[id];
    const active = isWarningActive(entity) && (field.warningStates
      ? field.warningStates.some((value) => canonicalState(entity) === value || canonicalState(entity).endsWith(value))
      : true);
    return active ? [{ entity, label: fieldLabel(hass, field) }] : [];
  });
  for (const warning of extraWarnings(config)) {
    const entity = hass.states[warning.entity];
    if (isWarningActive(entity)) candidates.push({ entity, label: (typeof warning.name === "string" ? warning.name.trim() : "") || entity.attributes.friendly_name || warning.entity });
  }
  const seen = new Set<string>();
  return candidates.filter(({ entity }) => {
    if (seen.has(entity.entity_id)) return false;
    seen.add(entity.entity_id);
    return true;
  }).map(({ entity, label }) => ({ entity, label, value: entity.entity_id.startsWith("binary_sensor.") ? "" : displayState(hass, entity) }));
}
