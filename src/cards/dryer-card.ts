import { BaseApplianceCard } from "./base-appliance-card";
import { dryerDefinition } from "../definitions";
import type { DryerCardConfig } from "../types/config";
import { registerElement } from "../helpers/register";

export class HomeConnectDryerCard extends BaseApplianceCard {
  protected definition = dryerDefinition;
  static getConfigElement() { return document.createElement(dryerDefinition.editorTag); }
  static getStubConfig(): DryerCardConfig { return { type: dryerDefinition.cardType, name: dryerDefinition.defaultName }; }
}
registerElement("home-connect-dryer-card", HomeConnectDryerCard);
