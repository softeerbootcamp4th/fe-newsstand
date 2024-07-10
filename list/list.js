import { deleteNav, generateNav } from "../components/nav.js";
import { generateBanner } from "../components/newsBanner.js";
import { getTodayString } from "../utils/utils.js";
import store from "../utils/stoageManager.js";
import { updateMyList, headlineData } from "../resources/data.js";

let currentHeaderCategoryIndex = 0;

//요소 생성
//header
const today = document.querySelector(".today");
today.innerHTML = getTodayString();
//banner
const bannerContainer = document.getElementById("banner_container");
generateBanner(bannerContainer, headlineData[0]);
generateBanner(bannerContainer, headlineData[1]);
//nav
const navContainer = document.getElementById("nav_container");
generateNav(navContainer, currentHeaderCategoryIndex);

//각 배너는 time delay를 가지고 롤링
function rollingCallback(time) {
  const prevElements = bannerContainer.querySelectorAll(".prev");
  prevElements.forEach((prev, index) => {
    setTimeout(() => {
      prev.classList.remove("prev");
    }, index * time);
  });

  const currentElements = bannerContainer.querySelectorAll(".current");
  currentElements.forEach((current, index) => {
    setTimeout(() => {
      current.classList.remove("current");
      current.classList.add("prev");
    }, index * time);
  });

  const nextElements = bannerContainer.querySelectorAll(".next");
  nextElements.forEach((next, index) => {
    setTimeout(() => {
      next.classList.remove("next");
      next.classList.add("current");

      let nextNext = next.nextElementSibling;
      if (!nextNext) {
        nextNext = next.parentElement.firstElementChild;
      }
      nextNext.classList.add("next");
    }, index * time);
  });
}
const headerCategory = document.querySelectorAll(".headerCategory");
const headerShow = document.querySelectorAll(".headerShow");

setInterval(() => rollingCallback(1000), 5000);

// 초기화 함수
function initialize() {
  store.setSet("myList", new Set());
  //header_selected 초기화
  headerCategory[0].classList.add("selected");
  headerShow[0].classList.add("selected");

  headerCategory.forEach((element, index) => {
    element.addEventListener("click", () => {
      headerCategory[currentHeaderCategoryIndex].classList.remove("selected");
      element.classList.add("selected");

      currentHeaderCategoryIndex = index;

      //nav 삭제후 재생성
      updateMyList();
      deleteNav();
      generateNav(navContainer, currentHeaderCategoryIndex);
    });
  });
}

// 초기화
initialize();
