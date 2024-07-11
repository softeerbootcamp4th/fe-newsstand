import { getMyDataAsArray, mediaData } from "../resources/data.js";
import { generateNode } from "../utils/utils.js";

export function generateGridContent(container, categoryIndex) {
  let currentGridIndex = 0;

  container.classList.remove("list");
  container.classList.add("grid");
  const divNewsGridWrapper = generateNode("ul", "newsGrid_wrapper");

  let mediaPageList = [];
  if (categoryIndex === 0) mediaPageList = getGridList(mediaData);
  else if (categoryIndex === 1) mediaPageList = getGridList(getMyDataAsArray());

  renderGridItems(divNewsGridWrapper, mediaPageList[currentGridIndex]);

  container.appendChild(divNewsGridWrapper);
}

function getGridList(mediaObjectList) {
  let girdList = [];

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
