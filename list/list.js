import { deleteNav, generateNav } from "../components/nav.js";
import { generateBanner } from "../components/newsBanner.js";
import { getTodayString } from "../utils/utils.js";
import store from "../utils/stoageManager.js";

const headlineData = [
  {
    media: "언론사1",
    news: [
      "[1보] 경제 성장률, 기대 이상의 상승",
      "[1보] 코로나19 백신 접종률, 예상을 웃도는 증가",
      "[속보] 기후 변화 대응, 세계 각국 공조 모색",
      "[속보] 디지털 트랜스포메이션 가속화, 기업들 반응",
      "[1보] 주식 시장 급락, 투자자들 불안 증가",
    ],
  },
  {
    media: "언론사2",
    news: [
      "[1보] 금리 인상 기대에 부동산 시장 영향",
      "[속보] 글로벌 무역 갈등 재점화 가능성",
      "[속보] 기술 기업들의 인공지능 연구 경쟁",
      "[1보] 5G 네트워크 확장 속도, 소비자 접근성 향상",
      "[1보] 통신사들의 요금 인하 경쟁 가열",
    ],
  },
];

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
      deleteNav();
      generateNav(navContainer, currentHeaderCategoryIndex);
    });
  });
}

// 초기화
initialize();
