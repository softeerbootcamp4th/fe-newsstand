import { CategoryEventHandler } from "./eventHandlers/CategoryEventHandler.js";
import { CategoryRenderer } from "./renderers/CategoryRenderer.js";
import { NewsStates } from "./states/newsStates.js";

const newsStates = new NewsStates({});
const categoryEventHandler = new CategoryEventHandler("click", newsStates);

newsStates.subscribe(new CategoryRenderer);