import { CategoryEventHandler } from "./eventHandlers/CategoryEventHandler.js";
import { CategoryRenderer } from "./renderers/CategoryRenderer.js";
import { NewsStates } from "./states/newsStates.js";
import { categoryClickEventInfo } from "./events/categoryEvent.js";
import { fetchAllNewsData, fetchRollingNewsData, fetchSubscribedNewsData } from "./data/newsDataFetcher.js";
import { SubAllEventHandler } from "./eventHandlers/SubAllEventHandler.js";
import { subAllClickEventInfo } from "./events/subAllEvent.js";
import { SubAllRenderer } from "./renderers/SubAllRenderer.js";
import { NewsListEventHandler } from "./eventHandlers/NewsListEventHandler.js";
import { NewsListRenderer } from "./renderers/NewsListRenderer.js";
import { arrowClickEventInfo } from "./events/newsListEvent.js";
import { RollingNewsStates } from "./states/RollingNewsStates.js";
import { RollingNewsEventHandler } from "./eventHandlers/RollingNewsEventHandler.js";
import { rollingNewsEventInfo } from "./events/rollingNewsEvent.js";
import { RollingNewsRenderer } from "./renderers/RollingNewsRenderer.js";
import { InitEventHandler } from "./eventHandlers/InitEventHandler.js";
import { InitEventInfo } from "./events/InitEvent.js";

const allNewsData = await fetchAllNewsData();
const subscribedNewsData = await fetchSubscribedNewsData();
const rollingNewsData = await fetchRollingNewsData();

const newsStates = new NewsStates({ allNewsData, subscribedNewsData });

new SubAllEventHandler(newsStates, [subAllClickEventInfo]);
new CategoryEventHandler(newsStates, [categoryClickEventInfo]);
new NewsListEventHandler(newsStates, [arrowClickEventInfo]);

newsStates.subscribe(new SubAllRenderer);
newsStates.subscribe(new CategoryRenderer);
newsStates.subscribe(new NewsListRenderer);

const rollingNewsStates = new RollingNewsStates({ rollingNewsData });

new RollingNewsEventHandler(rollingNewsStates, [rollingNewsEventInfo]);

rollingNewsStates.subscribe(new RollingNewsRenderer);

// 초기화
new InitEventHandler([newsStates], [InitEventInfo]);
