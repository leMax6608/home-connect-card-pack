import { BaseApplianceEditor } from "./base-editor";
import { coffeeDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
export class CoffeeCardEditor extends BaseApplianceEditor { protected definition = coffeeDefinition; }
registerElement(coffeeDefinition.editorTag, CoffeeCardEditor);
