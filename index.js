import { generateBanner } from "../components/banner/newsBanner.js";
import { headlineData } from "../resources/data.js";
import { startBannerInterval } from "../global/interval.js";
import { setupHeader } from "../components/header/header.js";
import { generateListContent } from "./list/list.js";
import store from "../global/stoageManager.js";
import state from "../global/state.js";
import {
  addHeaderCategoryEvent,
  addHeaderShowEvent,
} from "./components/content_header/content_header.js";

store.setSet("myList", new Set());

//header
setupHeader();

//banner
const bannerContainer = document.getElementById("banner_container");
generateBanner(bannerContainer, headlineData[0]);
generateBanner(bannerContainer, headlineData[1]);
startBannerInterval();

//content header
const headerCategory = document.querySelectorAll(".headerCategory");
const headerShow = document.querySelectorAll(".headerShow");
headerCategory[state.headerCategory].classList.add("selected");
headerShow[state.headerShow].classList.add("selected");
addHeaderCategoryEvent();
addHeaderShowEvent();

//content
const contentContainer = document.getElementById("content_wrapper");
generateListContent(contentContainer, state.headerCategory);
