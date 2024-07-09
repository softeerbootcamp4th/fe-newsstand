import { fieldTab } from "../fieldTab/fieldTab.js";
import { allSwipe } from "../swipe/allSwipe.js";
import { subscribeSwipe } from "../swipe/subscribeSwipe.js";

export const subscribeSwitchBtn = () => {
  const allBrandTabBtn = document.querySelector(".all-brand-tab-btn");
  const subscribeBrandTabBtn = document.querySelector(
    ".subscribe-brand-tab-btn"
  );

  allBrandTabBtn.addEventListener("click", () =>
    handleClickAllBrandTabBtn(allBrandTabBtn, subscribeBrandTabBtn)
  );

  subscribeBrandTabBtn.addEventListener("click", () =>
    handleClickSubscribeBrandTabBtn(allBrandTabBtn, subscribeBrandTabBtn)
  );

  // 페이지가 처음 렌더링될 때 allBrandTabBtn 클릭 이벤트 핸들러를 호출하여 기본값 설정
  allBrandTabBtn.click();
};

const handleClickAllBrandTabBtn = (allBrandTabBtn, subscribeBrandTabBtn) => {
  // 전체 언론사 버튼이 굵어져야 함
  subscribeBrandTabBtn.classList.remove("active");
  allBrandTabBtn.classList.add("active");

  // 전체 언론사 탭 버튼 렌더링
  fieldTab("all");

  // 전체 언론사일때의 스와이프 기능 작동
  allSwipe();
};

const handleClickSubscribeBrandTabBtn = (
  allBrandTabBtn,
  subscribeBrandTabBtn
) => {
  // 내가 구독한 언론사 버튼이 굵어져야 함
  allBrandTabBtn.classList.remove("active");
  subscribeBrandTabBtn.classList.add("active");

  // 구독한 언론사 탭 버튼 렌더링
  fieldTab("subscribe");

  // 구독한 언론사일때의 스와이프 기능 작동
  subscribeSwipe();
};
