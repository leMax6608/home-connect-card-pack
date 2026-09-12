import "./editors/dishwasher-editor";
import "./editors/oven-editor";
import "./editors/coffee-editor";
import "./editors/dryer-editor";
import "./cards/dishwasher-card";
import "./cards/oven-card";
import "./cards/coffee-card";
import "./cards/dryer-card";
import { coffeeDefinition, dishwasherDefinition, dryerDefinition, ovenDefinition } from "./definitions";

const definitions = [dishwasherDefinition, ovenDefinition, coffeeDefinition, dryerDefinition];
window.customCards = window.customCards || [];
for (const definition of definitions) {
  if (!window.customCards.some((card) => card.type === definition.cardType.replace("custom:", ""))) {
    window.customCards.push({
      type: definition.cardType.replace("custom:", ""),
      name: definition.displayName,
      description: definition.description,
      preview: true,
    });
  }
}

console.info(`%c HOME-CONNECT-CARD-PACK %c v1.3.0 `, "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
