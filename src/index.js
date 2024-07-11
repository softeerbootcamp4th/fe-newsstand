import { CategoryEventHandler } from "./eventHandlers/CategoryEventHandler.js";
import { CategoryRenderer } from "./renderers/CategoryRenderer.js";
import { NewsStates } from "./states/newsStates.js";
import { categoryClickEventInfo } from "./events/categoryEvent.js";
import { fetchAllNewsData, fetchSubscribedNewsData } from "./data/newsDataFetcher.js";
import { SubAllEventHandler } from "./eventHandlers/SubAllEventHandler.js";
import { subAllClickEventInfo } from "./events/subAllEvent.js";
import { SubAllRenderer } from "./renderers/SubAllRenderer.js";


const allNewsData = await fetchAllNewsData();
const subscribedNewsData = await fetchSubscribedNewsData();

const newsStates = new NewsStates({ allNewsData, subscribedNewsData });

new CategoryEventHandler(newsStates, [categoryClickEventInfo]);
new SubAllEventHandler(newsStates, [subAllClickEventInfo]);

newsStates.subscribe(new CategoryRenderer);
newsStates.subscribe(new SubAllRenderer);