import { BaseApplianceCard } from "./base-appliance-card";
import { dishwasherDefinition } from "../definitions";
import type { DishwasherCardConfig } from "../types/config";
import { registerElement } from "../helpers/register";

export class HomeConnectDishwasherCard extends BaseApplianceCard {
  protected definition = dishwasherDefinition;
  static getConfigElement() { return document.createElement(dishwasherDefinition.editorTag); }
  static getStubConfig(): DishwasherCardConfig { return { type: dishwasherDefinition.cardType, name: dishwasherDefinition.defaultName }; }
}
registerElement("home-connect-dishwasher-card", HomeConnectDishwasherCard);
