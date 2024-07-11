import { deleteNav, generateNav } from "../components/content/nav.js";
import { generateBanner } from "../components/banner/newsBanner.js";
import { updateMyList, headlineData } from "../resources/data.js";
import { startBannerInterval } from "../global/interval.js";
import store from "../global/stoageManager.js";
import state from "../global/state.js";
import { setupHeader } from "../components/content_header/header.js";
import { getTodayString, generateNode } from "../utils/utils.js";
import { generateListContent } from "./list/list.js";

//요소 생성
const sampleNewsData = {
  thumbnailUrl: "../resources/Thumbnail.png",
  title: "이미지 뉴스 제목",
};
//header
setupHeader();
//banner
const bannerContainer = document.getElementById("banner_container");
generateBanner(bannerContainer, headlineData[0]);
generateBanner(bannerContainer, headlineData[1]);
startBannerInterval();

const contetContainer = document.getElementById("content_wrapper");
generateListContent(contetContainer, sampleNewsData);

//nav
const navContainer = document.getElementById("nav_container");
generateNav(navContainer, 0);

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

      //nav 삭제후 재생성
      updateMyList();
      deleteNav();
      generateNav(navContainer, state.headerCategory);
    });
  });
}

// 초기화
initialize();
