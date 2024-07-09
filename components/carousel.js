import {
  getCateogryLength,
  getMaxMediaLengthByIndex,
  getMyDataLength,
} from "../resources/data.js";
import {
  getCurrentCategoryIndex,
  setCurrentCategoryIndex,
  getCurrentMediaIndex,
  setCurrentMediaIndex,
  getHeaderCategory,
  updateNavElements,
  updateCategoryByIndex,
  updateMyMedia,
} from "./nav.js";

const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");

leftButton.addEventListener("click", movePrevNewsMedia);
rightButton.addEventListener("click", moveNextNewsMedia);

/**
 * 왼쪽 화살표 이동 함수
 */
function movePrevNewsMedia() {
  resetCover();

  if (getHeaderCategory() === 0) handleNewsMovePrev();
  else if (getHeaderCategory() === 1) handleMyMovePrev();
}

/**
 * newsList 일 때 왼쪽 이동
 */
function handleNewsMovePrev() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  let currentMediaIndex = getCurrentMediaIndex();
  let currentCategoryIndex = getCurrentCategoryIndex();

  currentMediaIndex--;

  if (currentMediaIndex < 0) {
    currentCategoryIndex--;

    if (currentCategoryIndex < 0)
      currentCategoryIndex = getCateogryLength() - 1;

    currentMediaIndex = getMaxMediaLengthByIndex(currentCategoryIndex) - 1;
  }

  setCurrentMediaIndex(currentMediaIndex);
  setCurrentCategoryIndex(currentCategoryIndex);

  updateNavElements(navElementNodes);
  updateCategoryByIndex(getCurrentCategoryIndex());
}

/**
 * myList 일 때 왼쪽 이동
 */
function handleMyMovePrev() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  let currentCategoryIndex = getCurrentCategoryIndex();

  currentCategoryIndex--;
  if (currentCategoryIndex < 0) currentCategoryIndex = getMyDataLength() - 1;

  setCurrentCategoryIndex(currentCategoryIndex);

  updateNavElements(navElementNodes);
  updateMyMedia(getCurrentCategoryIndex());
}

/**
 * 오른쪽 화살표 이동 함수
 */
function moveNextNewsMedia() {
  resetCover();

  if (getHeaderCategory() === 0) handleNewsMoveNext();
  else if (getHeaderCategory() === 1) handleMyMoveNext();
}

/**
 * newsList 일 때 오른쪽 이동
 */
function handleNewsMoveNext() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  let currentMediaIndex = getCurrentMediaIndex();
  let currentCategoryIndex = getCurrentCategoryIndex();

  currentMediaIndex++;

  if (currentMediaIndex > getMaxMediaLengthByIndex(currentCategoryIndex) - 1) {
    currentCategoryIndex++;

    if (currentCategoryIndex > getCateogryLength() - 1)
      currentCategoryIndex = 0;

    currentMediaIndex = 0;
  }

  setCurrentMediaIndex(currentMediaIndex);
  setCurrentCategoryIndex(currentCategoryIndex);

  updateNavElements(navElementNodes);
  updateCategoryByIndex(getCurrentCategoryIndex());
}

/**
 * myList 일 때 오른쪽 이동
 */
function handleMyMoveNext() {
  const navElementNodes = document.querySelectorAll(".contentList li");

  let currentCategoryIndex = getCurrentCategoryIndex();

  currentCategoryIndex++;
  if (currentCategoryIndex > getMyDataLength() - 1) currentCategoryIndex = 0;

  setCurrentCategoryIndex(currentCategoryIndex);

  updateNavElements(navElementNodes);
  updateMyMedia(getCurrentCategoryIndex());
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
