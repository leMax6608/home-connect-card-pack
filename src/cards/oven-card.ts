import { BaseApplianceCard } from "./base-appliance-card";
import { ovenDefinition } from "../definitions";
import type { OvenCardConfig } from "../types/config";
import { registerElement } from "../helpers/register";

export class HomeConnectOvenCard extends BaseApplianceCard {
  protected definition = ovenDefinition;
  static getConfigElement() { return document.createElement(ovenDefinition.editorTag); }
  static getStubConfig(): Partial<OvenCardConfig> { return { name: ovenDefinition.defaultName }; }
}
registerElement("home-connect-oven-card", HomeConnectOvenCard);
