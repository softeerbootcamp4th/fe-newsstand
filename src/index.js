import { CategoryEventHandler } from "./eventHandlers/CategoryEventHandler.js";
import { CategoryRenderer } from "./renderers/CategoryRenderer.js";
import { NewsStates } from "./states/newsStates.js";
import { categoryClickEventInfo, categoryOnloadEventInfo } from "./events/categoryEvent.js";
import { fetchAllNewsData, fetchSubscribedNewsData } from "./data/newsDataFetcher.js";


const allNewsData = await fetchAllNewsData();
const subscribedNewsData = await fetchSubscribedNewsData();

const newsStates = new NewsStates({ allNewsData, subscribedNewsData });

new CategoryEventHandler(newsStates, [categoryOnloadEventInfo, categoryClickEventInfo]);

newsStates.subscribe(new CategoryRenderer);