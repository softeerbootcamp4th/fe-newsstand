import {
  getCateogryLength,
  getMediaLengthByIndex,
  getMyListLength,
} from "../resources/data.js";
import {
  updateNavElements,
  updateCategoryByIndex,
  updateMyMedia,
} from "./nav.js";
import state from "../list/state.js";

const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");

leftButton.addEventListener("click", () => movePrevMedia(state));
rightButton.addEventListener("click", () => moveNextMedia(state));

/**
 * 상태를 받아 왼쪽으로 이동한 값으로 변경하고 nav와 content부분을 업데이트 함
 * @param {object} state 현재 상태
 */
function movePrevMedia(state) {
  resetCover();

  const newState =
    state.headerCategory === 0
      ? handleMovePrev(state, getCateogryLength, getMediaLengthByIndex)
      : handleMovePrev(state, getMyListLength, () => 0);

  state.currentCategoryIndex = newState.currentCategoryIndex;
  state.currentMediaIndex = newState.currentMediaIndex;

  updateNavElements(document.querySelectorAll(".contentList li"));
  state.headerCategory === 0
    ? updateCategoryByIndex(state.currentCategoryIndex)
    : updateMyMedia(state.currentCategoryIndex);
}

/**
 * 상태를 받아 오른쪽으로 이동한 값으로 변경하고 nav와 content부분을 업데이트 함
 * @param {object} state 현재 상태
 */
function moveNextMedia(state) {
  resetCover();

  const newState =
    state.headerCategory === 0
      ? handleMoveNext(state, getCateogryLength, getMediaLengthByIndex)
      : handleMoveNext(state, getMyListLength, () => 0);

  state.currentCategoryIndex = newState.currentCategoryIndex;
  state.currentMediaIndex = newState.currentMediaIndex;

  updateNavElements(document.querySelectorAll(".contentList li"));
  state.headerCategory === 0
    ? updateCategoryByIndex(state.currentCategoryIndex)
    : updateMyMedia(state.currentCategoryIndex);
}

/**
 * 왼쪽 이동 함수
 * @param {object} state 현재 상태
 * @param {function} getCategoryLength data 접근 함수
 * @param {function} getMediaLengthByIndex data 접근 함수
 * @returns
 */
function handleMovePrev(state, getCategoryLength, getMediaLengthByIndex) {
  let currentMediaIndex = state.currentMediaIndex;
  let currentCategoryIndex = state.currentCategoryIndex;

  currentMediaIndex--;

  if (currentMediaIndex < 0) {
    currentCategoryIndex--;
    if (currentCategoryIndex < 0) {
      currentCategoryIndex = getCategoryLength() - 1;
    }
    currentMediaIndex = getMediaLengthByIndex(currentCategoryIndex) - 1;
  }

  return { currentCategoryIndex, currentMediaIndex };
}

/**
 * 오른쪽 이동 함수
 * @param {object} state 현재 상태
 * @param {function} getCategoryLength data 접근 함수
 * @param {function} getMediaLengthByIndex data 접근 함수
 * @returns
 */
function handleMoveNext(state, getCategoryLength, getMediaLengthByIndex) {
  let currentMediaIndex = state.currentMediaIndex;
  let currentCategoryIndex = state.currentCategoryIndex;

  currentMediaIndex++;

  if (currentMediaIndex >= getMediaLengthByIndex(currentCategoryIndex)) {
    currentCategoryIndex++;
    if (currentCategoryIndex >= getCategoryLength()) {
      currentCategoryIndex = 0;
    }
    currentMediaIndex = 0;
  }

  return { currentCategoryIndex, currentMediaIndex };
}

/**
 * 페이지가 넘어갈 때 progress animation을 재시작
 */
function resetCover() {
  const cover = document.querySelector(".contentList li.selected .cover");
  if (!cover) return;
  cover.classList.remove("cover");
  void cover.offsetWidth;
  cover.classList.add("cover");
}
