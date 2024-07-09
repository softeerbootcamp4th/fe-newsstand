import { brandData } from "../../data/brandData.js";
import { getSubscribeList } from "../../util/getSubscribeList.js";
import { subscribeNews } from "../news/subscribeNews/subscribeNews.js";
import { handleClickAllLeftBtn, handleClickAllRightBtn } from "./allSwipe.js";

// 구독한 언론사 탭에서의 스와이프
export const subscribeSwipe = () => {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  // subscribeSwipe에서의 이벤트 삭제
  leftBtn.removeEventListener("click", handleClickAllLeftBtn);
  rightBtn.removeEventListener("click", handleClickAllRightBtn);

  leftBtn.addEventListener("click", handleClickSubscribeLeftBtn);
  rightBtn.addEventListener("click", handleClickSubscribeRightBtn);
};

export const handleClickSubscribeLeftBtn = () => {
  let {
    dataset: { brandIdx },
  } = document.querySelector(".press-news");
  brandIdx = Number(brandIdx);
  const fieldTabBtns = document.querySelectorAll(".field-tab-btn");

  // 구독한 언론사가 없다면 스와이프 차단
  if (brandIdx === -1) return;

  let subscribeList = getSubscribeList();
  let curBrandIdx = Number(brandIdx);

  // 스와이프 한 후의 페이지를 계산
  let prevBrandIdx = curBrandIdx ? curBrandIdx - 1 : subscribeList.length - 1;

  // 필드 버튼 active 처리
  fieldTabBtns[curBrandIdx].classList.remove("active");
  fieldTabBtns[prevBrandIdx].classList.add("active");

  // 뉴스 렌더링
  subscribeNews(prevBrandIdx);
};

export const handleClickSubscribeRightBtn = () => {
  let {
    dataset: { brandIdx },
  } = document.querySelector(".press-news");
  brandIdx = Number(brandIdx);

  let subscribeList = getSubscribeList();
  const fieldTabBtns = document.querySelectorAll(".field-tab-btn");

  if (brandIdx === -1) return;

  let curBrandIdx = Number(brandIdx);

  // 스와이프 한 후의 페이지를 계산
  let prevBrandIdx =
    curBrandIdx === subscribeList.length - 1 ? 0 : curBrandIdx + 1;

  // 필드 버튼 active 처리
  fieldTabBtns[curBrandIdx].classList.remove("active");
  fieldTabBtns[prevBrandIdx].classList.add("active");

  // 뉴스 렌더링
  subscribeNews(prevBrandIdx);
};
