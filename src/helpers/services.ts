import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { canonicalState } from "./formatting";

export async function toggleEntity(hass: HomeAssistant, entity: HassEntity): Promise<void> {
  const domain = entity.entity_id.split(".")[0];
  if (domain === "select" || domain === "input_select") {
    const options = entity.attributes.options || [];
    const normalized = (value: string) => value.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "";
    const on = options.find((value) => ["on", "ein", "active"].includes(normalized(value)));
    const off = options.find((value) => ["off", "aus", "inactive", "standby"].includes(normalized(value)));
    const option = ["on", "ein", "active"].includes(canonicalState(entity)) ? off : on;
    if (!option) throw new Error("This select has no recognizable on/off options.");
    await hass.callService("select", "select_option", { entity_id: entity.entity_id, option });
    return;
  }
  await hass.callService(domain, entity.state === "on" ? "turn_off" : "turn_on", { entity_id: entity.entity_id });
}

export async function pressEntity(hass: HomeAssistant, entity: HassEntity): Promise<void> {
  const domain = entity.entity_id.split(".")[0];
  if (domain !== "button" && domain !== "input_button") throw new Error("The configured action is not a button entity.");
  await hass.callService(domain, "press", { entity_id: entity.entity_id });
}

export async function selectOption(hass: HomeAssistant, entity: HassEntity, option: string): Promise<void> {
  const domain = entity.entity_id.split(".")[0];
  if (domain !== "select" && domain !== "input_select") throw new Error("The configured entity is not a select.");
  await hass.callService(domain, "select_option", { entity_id: entity.entity_id, option });
}

export async function setNumber(hass: HomeAssistant, entity: HassEntity, value: number): Promise<void> {
  const domain = entity.entity_id.split(".")[0];
  await hass.callService(domain, "set_value", { entity_id: entity.entity_id, value });
}
