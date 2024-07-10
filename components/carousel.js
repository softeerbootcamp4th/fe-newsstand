import {
  getCateogryLength,
  getMaxMediaLengthByIndex,
  getMyDataLength,
} from "../resources/data.js";
import {
  updateNavElements,
  updateCategoryByIndex,
  updateMyMedia,
} from "./nav.js";
import state from "../list/state.js";

const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");

leftButton.addEventListener("click", movePrevNewsMedia);
rightButton.addEventListener("click", moveNextNewsMedia);

/**
 * 왼쪽 화살표 이동 함수
 */
function movePrevNewsMedia() {
  resetCover();
  debugger;

  if (state.headerCategory === 0) handleNewsMovePrev();
  else if (state.headerCategory === 1) handleMyMovePrev();
}

/**
 * newsList 일 때 왼쪽 이동
 */
function handleNewsMovePrev() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  let currentMediaIndex = state.currentMediaIndex;
  let currentCategoryIndex = state.currentCategoryIndex;

  currentMediaIndex--;

  if (currentMediaIndex < 0) {
    currentCategoryIndex--;

    if (currentCategoryIndex < 0) {
      currentCategoryIndex = getCateogryLength() - 1;
    }

    currentMediaIndex = getMaxMediaLengthByIndex(currentCategoryIndex) - 1;
  }

  state.currentMediaIndex = currentMediaIndex;
  state.currentCategoryIndex = currentCategoryIndex;

  updateNavElements(navElementNodes);
  updateCategoryByIndex(currentCategoryIndex);
}

/**
 * myList 일 때 왼쪽 이동
 */
function handleMyMovePrev() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  let currentCategoryIndex = state.currentCategoryIndex;

  currentCategoryIndex--;
  if (currentCategoryIndex < 0) {
    currentCategoryIndex = getMyDataLength() - 1;
  }

  state.currentCategoryIndex = currentCategoryIndex;

  updateNavElements(navElementNodes);
  updateMyMedia(currentCategoryIndex);
}

/**
 * 오른쪽 화살표 이동 함수
 */
function moveNextNewsMedia() {
  resetCover();

  if (state.headerCategory === 0) handleNewsMoveNext();
  else if (state.headerCategory === 1) handleMyMoveNext();
}

/**
 * newsList 일 때 오른쪽 이동
 */
function handleNewsMoveNext() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  state.currentMediaIndex++;

  if (
    state.currentMediaIndex >=
    getMaxMediaLengthByIndex(state.currentCategoryIndex)
  ) {
    state.currentCategoryIndex++;

    if (state.currentCategoryIndex >= getCateogryLength()) {
      state.currentCategoryIndex = 0;
    }

    state.currentMediaIndex = 0;
  }

  updateNavElements(navElementNodes);
  updateCategoryByIndex(state.currentCategoryIndex);
}

/**
 * myList 일 때 오른쪽 이동
 */
function handleMyMoveNext() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  state.currentCategoryIndex =
    (state.currentCategoryIndex + 1) % getMyDataLength();

  updateNavElements(navElementNodes);
  updateMyMedia(state.currentCategoryIndex);
}

/**
 * 페이지가 넘어갈 때 progress animation을 재시작
 */
function resetCover() {
  const cover = document.querySelector(".contentList li.selected .cover");
  cover.classList.remove("cover");
  void cover.offsetWidth;
  cover.classList.add("cover");
}
