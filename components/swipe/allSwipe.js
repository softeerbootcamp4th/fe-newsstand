import { cateData } from "../../data/cateData.js";
import { brandData } from "../../data/brandData.js";
import { allNews } from "../news/allNews/allNews.js";
import { subscribeNews } from "../news/subscriptionNews/subscriptionNews.js";
import {
  handleClickSubscribeLeftBtn,
  handleClickSubscribeRightBtn,
} from "./subscriptionSwipe.js";

// 전체 언론사 탭에서의 스와이프
export const allSwipe = () => {
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  // subscribeSwipe에서의 이벤트 삭제
  leftBtn.removeEventListener("click", handleClickSubscribeLeftBtn);
  rightBtn.removeEventListener("click", handleClickSubscribeRightBtn);

  leftBtn.addEventListener("click", handleClickAllLeftBtn);
  rightBtn.addEventListener("click", handleClickAllRightBtn);
};

export const handleClickAllLeftBtn = () => {
  const {
    dataset: { cateIdx, brandIdx },
  } = document.querySelector(".press-news");
  const fieldTabBtns = document.querySelectorAll(".field-tab-btn");

  const [curCateIdx, curBrandIdx] = [cateIdx, brandIdx].map(Number);

  // 스와이프 한 후의 페이지를 계산
  let [prevCateIdx, prevBrandIdx] = calcPrevId(curCateIdx, curBrandIdx);

  // 필드 버튼 active 처리
  fieldTabBtns[curCateIdx].classList.remove("active");
  fieldTabBtns[prevCateIdx].classList.add("active");

  // brand-Page-wrap 업데이트
  updateBrandPageWrap(fieldTabBtns, curCateIdx, prevCateIdx, prevBrandIdx);

  // 뉴스 렌더링
  allNews(prevCateIdx, prevBrandIdx);
};

export const handleClickAllRightBtn = () => {
  const {
    dataset: { cateIdx, brandIdx },
  } = document.querySelector(".press-news");
  const fieldTabBtns = document.querySelectorAll(".field-tab-btn");

  const [curCateIdx, curBrandIdx] = [cateIdx, brandIdx].map(Number);

  // 스와이프 한 후의 페이지를 계산
  let [nextCateIdx, nextBrandIdx] = calcNextId(curCateIdx, curBrandIdx);

  // 필드 버튼 active 처리
  fieldTabBtns[curCateIdx].classList.remove("active");
  fieldTabBtns[nextCateIdx].classList.add("active");

  // brand-Page-wrap 업데이트
  updateBrandPageWrap(fieldTabBtns, curCateIdx, nextCateIdx, nextBrandIdx);

  // 뉴스 렌더링
  allNews(nextCateIdx, nextBrandIdx);
};

// left swipe 시 다음 페이지의 cateIdx, brandIdx를 반환
const calcPrevId = (curCateIdx, curBrandIdx) => {
  // curBrandIdx === 0 이면 cateIdx 변경
  let prevCateIdx =
    curBrandIdx === 0
      ? // curCateIdx === 0 이면 마지막 카테고리로 넘어가야 함
        curCateIdx === 0
        ? cateData.length - 1
        : curCateIdx - 1
      : curCateIdx;

  // curBrandIdx === 0 이면 카테고리가 바뀌므로 prevBrandIdx는 그대로 0
  //  그렇지 않으면 prevBrandIdx - 1
  let prevBrandIdx = curBrandIdx !== 0 ? curBrandIdx - 1 : 0;
  return [prevCateIdx, prevBrandIdx];
};

// right swipe 시 다음 페이지의 cateIdx, brandIdx를 반환
const calcNextId = (curCateIdx, curBrandIdx) => {
  let nextCateIdx, nextBrandIdx;

  // curBrandIdx가 마지막 언론사인 경우 cateIdx + 1
  if (curBrandIdx === cateData[curCateIdx].data.length - 1) {
    // 이 때, 마지막 카테고리라면 첫 번째 카테고리로 이동해야 함
    nextCateIdx =
      curCateIdx === cateData.length - 1 ? (curCateIdx = 0) : curCateIdx + 1;
    nextBrandIdx = 0;
  }
  // 마지막 언론사가 아니라면 cateIdx는 그대로, brandIdx + 1
  else {
    nextCateIdx = curCateIdx;
    nextBrandIdx = curBrandIdx + 1;
  }

  return [nextCateIdx, nextBrandIdx];
};

const updateBrandPageWrap = (
  fieldTabBtns,
  curCateIdx,
  followingCateIdx,
  followingBrandIdx
) => {
  // 이전에 active 였던 tab -> hidden
  let curBrandPageWrap =
    fieldTabBtns[curCateIdx].querySelector(".brand-page-wrap");
  let curBrandPage = curBrandPageWrap.querySelector(".cur-brand-page");

  let followingBrandPageWrap =
    fieldTabBtns[followingCateIdx].querySelector(".brand-page-wrap");
  let followingBrandPage =
    followingBrandPageWrap.querySelector(".cur-brand-page");

  // 몇 번째 언론사인지 표시
  followingBrandPage.innerHTML = followingBrandIdx + 1;

  // 카테고리가 변하지 않았다면 언론사 인덱스만 바꾸고 종료
  if (curCateIdx === followingCateIdx) return;

  // 카테고리가 변했다면 hidden 처리
  curBrandPageWrap.classList.add("hidden");
  followingBrandPageWrap.classList.remove("hidden");
};
