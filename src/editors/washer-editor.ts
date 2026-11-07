import { BaseApplianceEditor } from "./base-editor";
import { washerDefinition } from "../definitions";
import { registerElement } from "../helpers/register";

export class WasherCardEditor extends BaseApplianceEditor { protected definition = washerDefinition; }
registerElement(washerDefinition.editorTag, WasherCardEditor);
