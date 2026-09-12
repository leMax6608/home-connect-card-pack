import { BaseApplianceCard } from "./base-appliance-card";
import { coffeeDefinition } from "../definitions";
import type { CoffeeCardConfig } from "../types/config";
import { registerElement } from "../helpers/register";

export class HomeConnectCoffeeCard extends BaseApplianceCard {
  protected definition = coffeeDefinition;
  static getConfigElement() { return document.createElement(coffeeDefinition.editorTag); }
  static getStubConfig(): Partial<CoffeeCardConfig> { return { name: coffeeDefinition.defaultName }; }
}
registerElement("home-connect-coffee-card", HomeConnectCoffeeCard);
