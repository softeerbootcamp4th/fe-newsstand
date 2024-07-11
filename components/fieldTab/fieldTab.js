import { cateData } from "../../data/cateData.js";
import { brandData } from "../../data/brandData.js";
import { getSubscribeList } from "../../util/getSubscribeList.js";
import { allNews } from "../news/allNews/allNews.js";
import { subscribeNews } from "../news/subscriptionNews/subscriptionNews.js";
import { renderProgressBar } from "./progressBar.js";

/**
 *
 * @param {"allTabPress" | "subscribeTabPress"} mode
 */
export const fieldTab = (mode) => {
  const fieldTab = document.querySelector(".field-tab");

  fieldTab.innerHTML = "";

  // 전체 언론사 버튼이 눌렸을 때
  if (mode === "allTabPress") {
    // field-tab-btn 렌더링
    renderAllFieldTab(fieldTab);

    // 기존의 이벤트 제거
    fieldTab.removeEventListener("click", handleClickSubscribeField);

    // 이벤트 위임을 사용하여 클릭 이벤트 리스너 추가
    fieldTab.addEventListener("click", handleClickAllField);
  }

  // 구독한 언론사 버튼이 눌렸을 때
  if (mode === "subscribeTabPress") {
    // 기존의 이벤트 제거
    fieldTab.removeEventListener("click", handleClickAllField);

    // field-tab-btn 렌더링
    // 구독한 언론사가 없는 경우 렌더링하지 않음
    if (renderSubscribeFieldTab(fieldTab) === -1) return;

    // 이벤트 위임을 사용하여 클릭 이벤트 리스너 추가
    fieldTab.addEventListener("click", handleClickSubscribeField);
  }

  // 탭이 렌더링될 때 fieldTab의 첫 번째 버튼이 클릭되도록 함
  fieldTab.querySelector("button").click();
};

const renderAllFieldTab = (fieldTab) => {
  fieldTab.innerHTML += cateData.reduce(
    (accData, newsData, cateIdx) =>
      accData +
      `  <button class="field-tab-btn text-weak available-medium14 pointer ${
        cateIdx === 0 ? "active" : ""
      } " data-cate-idx=${cateIdx} data-brand-idx = 0>
    ${newsData.cate}
    <div class = "brand-page-wrap ${
      cateIdx === 0 ? "" : "hidden"
    } display-bold12">
     <span class = "cur-brand-page text-white-default">1</span> 
     <span class = "total-brand-page text-white-weak}">/${
       newsData.data.length
     }</span>
    </div>
    <div class="progress-bar hidden"></div>
  </button>`,
    ""
  );
};

const renderSubscribeFieldTab = (fieldTab) => {
  let subscribeBrandIdList = getSubscribeList();

  // 구독한 언론사가 없는 경우
  if (subscribeBrandIdList.length === 0) {
    subscribeNews(-1);
    return -1;
  }

  subscribeBrandIdList.forEach((brandId, brandIdx) => {
    const fieldTabBtn = `
      <button class="field-tab-btn text-weak available-medium14 pointer ${
        brandIdx === 0 ? "active" : ""
      }" data-brand-idx=${brandIdx} data-brand-id=${Number(brandId)}>
        ${brandData[brandId].brandName}
        <img src = "../asset/icons/arrow.svg" class = "arrow ${
          brandIdx === 0 ? "" : "hidden"
        }" ></img>
        <div class="progress-bar hidden"></div>

      </button>
    `;
    fieldTab.innerHTML += fieldTabBtn;
  });
};

const handleClickAllField = (event) => {
  const btn = event.target.closest(".field-tab-btn");
  if (!btn) return;

  // 모든 버튼에서 active 클래스 제거
  document.querySelectorAll(".field-tab-btn").forEach((btn) => {
    btn.classList.remove("active");

    // 모든 버튼에 hidden 클래스 추가
    btn.querySelector(".brand-page-wrap").classList.add("hidden");
  });

  // 클릭된 버튼에 active 클래스 추가
  btn.classList.add("active");

  // 언론사 인덱스에 hidden 클래스 제거
  btn.querySelector(".brand-page-wrap").classList.remove("hidden");

  // 언론사 인덱스 1로 표시
  btn.querySelector(".cur-brand-page").innerHTML = 1;

  // 선택된 언론사 뉴스 렌더링
  allNews(btn.dataset.cateIdx, btn.dataset.brandIdx);

  renderProgressBar();
};

const handleClickSubscribeField = (event) => {
  const btn = event.target.closest(".field-tab-btn");
  if (!btn) return;

  // 모든 버튼에서 active 클래스 제거
  document.querySelectorAll(".field-tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    btn.querySelector(".arrow").classList.add("hidden");
  });

  // 클릭된 버튼에 active 클래스 추가
  btn.classList.add("active");

  // 화살표 아이콘 hidden 처리
  btn.querySelector(".arrow").classList.remove("hidden");

  // 선택된 언론사 뉴스 렌더링
  subscribeNews(btn.dataset.brandIdx);

  renderProgressBar();
};
