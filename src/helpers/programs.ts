import type { ProgramNameMap } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { displayState } from "./formatting";

export function customProgramName(value: string, names: ProgramNameMap | undefined): string | undefined {
  const name = names?.[value]?.trim();
  return name || undefined;
}

export function displayProgramName(
  hass: HomeAssistant,
  entity: HassEntity,
  names: ProgramNameMap | undefined,
): string {
  return customProgramName(entity.state, names) || displayState(hass, entity);
}
