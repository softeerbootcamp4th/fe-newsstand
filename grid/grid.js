import { mediaData } from "../resources/data.js";
import { generateNode } from "../utils/utils.js";

export function generateGridContent(container, categoryIndex) {
  container.classList.remove("list");
  container.classList.add("grid");
  const divNewsGridWrapper = generateNode("ul", "newsGrid_wrapper");

  const mediaList = Object.entries(mediaData).map((element) => {
    const object = { mediaId: element[0], media: element[1].media };
    return object;
  });

  mediaList.forEach((element) => {
    const item = generateNode("li", "gridItem");
    item.innerHTML = element.media;

    divNewsGridWrapper.appendChild(item);
  });

  container.appendChild(divNewsGridWrapper);
}
