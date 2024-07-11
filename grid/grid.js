import { generateNode } from "../utils/utils.js";

export function generateGridContent(container, categoryIndex) {
  container.classList.add("grid");
  const divNewsGridWrapper = generateNode("div", "newsGrid_wrapper");

  container.appendChild(divNewsGridWrapper);
}
