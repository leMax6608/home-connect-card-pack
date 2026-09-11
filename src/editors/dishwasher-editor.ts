import { BaseApplianceEditor } from "./base-editor";
import { dishwasherDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
export class DishwasherCardEditor extends BaseApplianceEditor { protected definition = dishwasherDefinition; }
registerElement(dishwasherDefinition.editorTag, DishwasherCardEditor);
