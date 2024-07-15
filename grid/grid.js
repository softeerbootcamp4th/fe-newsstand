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
  let currentGridIndex = state.currentCategoryIndex;

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
    renderGridItems(
      gridWrapper,
      mediaPageList[categoryIndex],
      state.headerCategory
    );
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
function renderGridItems(container, itemList, headerCategory) {
  addSubscribeEventToGrid();
  itemList.forEach((element) => {
    const item = generateNode("li", "gridItem");
    item.innerHTML = element.media;

    const subItem = generateNode("button", "subscribe");
    if (headerCategory === 0) subItem.innerHTML = "+ 구독하기";
    else if (headerCategory === 1) subItem.innerHTML = "구독해지";

    item.appendChild(subItem);
    container.appendChild(item);
  });
}

function addSubscribeEventToGrid() {
  const gridWrapper = document.querySelector(".newsGrid_wrapper");
  gridWrapper.addEventListener("click", ({ target }) =>
    subscribeCallBack(target)
  );
}

//target이 어떤 언론사 id를 가지는지 알아야 함
//innerHTML밖에 정보가 없어 mediaData와 비교 필요
//target.innerHTML === mediaData[index].media 일 때 index를 이용해서 mediaID를 가져온 뒤
//store.addItemToSet("myList", medaiId);
//지금 자료의 형태가 매우 좋지 못함,, 확장성이 없음
function subscribeCallBack(target) {
  if (target.tagName === "BUTTON") {
  }
}
