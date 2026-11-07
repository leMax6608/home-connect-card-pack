import { BaseApplianceCard } from "./base-appliance-card";
import { washerDefinition } from "../definitions";
import type { WasherCardConfig } from "../types/config";
import { registerElement } from "../helpers/register";

export class HomeConnectWasherCard extends BaseApplianceCard {
  protected definition = washerDefinition;
  static getConfigElement() { return document.createElement(washerDefinition.editorTag); }
  static getStubConfig(): Partial<WasherCardConfig> { return { name: washerDefinition.defaultName }; }
}
registerElement("home-connect-washer-card", HomeConnectWasherCard);
