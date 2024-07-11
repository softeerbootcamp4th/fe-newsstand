import { stopInterval } from "../global/interval.js";
import { getMyDataAsArray, mediaData } from "../resources/data.js";
import { generateNode } from "../utils/utils.js";
import state from "../global/state.js";

/**
 * headerCategory에 맞게 grid content를 container하위에 생성
 * @param {node} container
 * @param {int} headerCategoryIndex
 */
export function generateGridContent(container, headerCategoryIndex) {
  stopInterval();
  state.currentCategoryIndex = 0;
  let currentGridIndex = headerCategoryIndex;

  container.classList.remove("list");
  container.classList.add("grid");

  const divNewsGridWrapper = generateNode("ul", "newsGrid_wrapper");
  container.appendChild(divNewsGridWrapper);

  updateGridContent(currentGridIndex);
}

/**
 * 현재 그리드를 삭제하고 categoryIndex 페이지로 업데이트
 * @param {int} categoryIndex
 */
export function updateGridContent(categoryIndex) {
  const gridWrapper = document.querySelector(".newsGrid_wrapper");
  gridWrapper.innerHTML = "";

  let mediaPageList = [];
  if (state.headerCategory === 0) mediaPageList = getGridList(mediaData);
  else if (state.headerCategory === 1)
    mediaPageList = getGridList(getMyDataAsArray());

  if (mediaPageList.length !== 0)
    renderGridItems(gridWrapper, mediaPageList[categoryIndex]);
}

/**
 * 24개씩 요소를 나눈 그리드 생성에 필요한 리스트 생성
 * @param {object} mediaObjectList
 * @returns object array
 */
function getGridList(mediaObjectList) {
  let girdList = [];

  if (mediaObjectList.length === 0) return girdList;

  Object.entries(mediaObjectList).forEach((element, index) => {
    const object = { mediaId: element[0], media: element[1].media };
    if (index % 24 === 0) girdList[Math.floor(index / 24)] = new Array();
    girdList[Math.floor(index / 24)].push(object);
  });

  return girdList;
}

/**
 * 그리드 아이템 생성
 * @param {node} container
 * @param {array} itemList
 */
function renderGridItems(container, itemList) {
  itemList.forEach((element) => {
    const item = generateNode("li", "gridItem");
    item.innerHTML = element.media;

    container.appendChild(item);
  });
}
