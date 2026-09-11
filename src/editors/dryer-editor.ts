import { BaseApplianceEditor } from "./base-editor";
import { dryerDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
export class DryerCardEditor extends BaseApplianceEditor { protected definition = dryerDefinition; }
registerElement(dryerDefinition.editorTag, DryerCardEditor);
