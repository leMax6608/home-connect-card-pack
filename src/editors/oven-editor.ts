import { BaseApplianceEditor } from "./base-editor";
import { ovenDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
export class OvenCardEditor extends BaseApplianceEditor { protected definition = ovenDefinition; }
registerElement(ovenDefinition.editorTag, OvenCardEditor);
