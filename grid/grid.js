import { stopInterval } from "../global/interval.js";
import { getMyDataAsArray, mediaData } from "../resources/data.js";
import { generateNode } from "../utils/utils.js";
import state from "../global/state.js";

export function generateGridContent(container, categoryIndex) {
  stopInterval();
  state.currentCategoryIndex = 0;
  let currentGridIndex = state.currentCategoryIndex;

  container.classList.remove("list");
  container.classList.add("grid");
  const divNewsGridWrapper = generateNode("ul", "newsGrid_wrapper");

  let mediaPageList = [];
  if (categoryIndex === 0) mediaPageList = getGridList(mediaData);
  else if (categoryIndex === 1) mediaPageList = getGridList(getMyDataAsArray());

  if (mediaPageList.length != 0)
    renderGridItems(divNewsGridWrapper, mediaPageList[currentGridIndex]);

  container.appendChild(divNewsGridWrapper);
}

export function updateGridContent(headerCategoryIndex, categoryIndex) {
  const gridWrapper = document.querySelector(".newsGrid_wrapper");
  gridWrapper.innerHTML = "";

  let mediaPageList = [];
  if (headerCategoryIndex === 0) mediaPageList = getGridList(mediaData);
  else if (headerCategoryIndex === 1)
    mediaPageList = getGridList(getMyDataAsArray());

  if (mediaPageList.length !== 0)
    renderGridItems(gridWrapper, mediaPageList[categoryIndex]);
}

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

function renderGridItems(container, itemList) {
  itemList.forEach((element) => {
    const item = generateNode("li", "gridItem");
    item.innerHTML = element.media;

    container.appendChild(item);
  });
}
