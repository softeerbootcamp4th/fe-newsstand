import { generateBanner } from "../components/banner/newsBanner.js";
import { headlineData } from "../resources/data.js";
import { startBannerInterval } from "../global/interval.js";
import store from "../global/stoageManager.js";
import state from "../global/state.js";
import { setupHeader } from "../components/content_header/header.js";
import { generateListContent } from "./list/list.js";
import { deleteNodeById } from "./utils/utils.js";
import { generateGridContent } from "./grid/grid.js";

//요소 생성
//header
setupHeader();
state.headerCategory = 0;
state.headerShow = 0;
//banner
const bannerContainer = document.getElementById("banner_container");
generateBanner(bannerContainer, headlineData[0]);
generateBanner(bannerContainer, headlineData[1]);
startBannerInterval();

const contentContainer = document.getElementById("content_wrapper");
generateListContent(contentContainer, state.headerCategory);

//각 배너는 time delay를 가지고 롤링
const headerCategory = document.querySelectorAll(".headerCategory");
const headerShow = document.querySelectorAll(".headerShow");

// 초기화 함수
function initialize() {
  store.setSet("myList", new Set());
  //header_selected 초기화
  headerCategory[0].classList.add("selected");
  headerShow[0].classList.add("selected");

  headerCategory.forEach((element, index) => {
    element.addEventListener("click", () => {
      headerCategory[state.headerCategory].classList.remove("selected");
      element.classList.add("selected");

      state.headerCategory = index;

      deleteNodeById("content_wrapper");

      if (state.headerShow === 0)
        generateListContent(contentContainer, state.headerCategory);
      else if (state.headerShow === 1)
        generateGridContent(contentContainer, state.headerCategory);
    });
  });

  headerShow.forEach((element, index) => {
    element.addEventListener("click", () => {
      headerShow[state.headerShow].classList.remove("selected");
      element.classList.add("selected");

      state.headerShow = index;

      deleteNodeById("nav_container");
      deleteNodeById("content_wrapper");

      if (index === 0)
        generateListContent(contentContainer, state.headerCategory);
      else if (index === 1)
        generateGridContent(contentContainer, state.headerCategory);
    });
  });
}

// 초기화
initialize();
