import state from "../../global/state.js";
import { deleteNodeById } from "../../utils/utils.js";
import { generateGridContent } from "../../grid/grid.js";
import { generateListContent } from "../../list/list.js";
import { updateMyList } from "../../resources/data.js";

const headerCategory = document.querySelectorAll(".headerCategory");
const headerShow = document.querySelectorAll(".headerShow");
const contentContainer = document.getElementById("content_wrapper");

export function addHeaderCategoryEvent() {
  headerCategory.forEach((element, index) => {
    element.addEventListener("click", () => {
      headerCategory[state.headerCategory].classList.remove("selected");
      element.classList.add("selected");

      state.headerCategory = index;

      deleteNodeById("content_wrapper");
      updateMyList();

      if (state.headerShow === 0)
        generateListContent(contentContainer, state.headerCategory);
      else if (state.headerShow === 1)
        generateGridContent(contentContainer, state.headerCategory);
    });
  });
}

export function addHeaderShowEvent() {
  headerShow.forEach((element, index) => {
    element.addEventListener("click", () => {
      headerShow[state.headerShow].classList.remove("selected");
      element.classList.add("selected");

      state.headerShow = index;

      deleteNodeById("nav_container");
      deleteNodeById("content_wrapper");

      if (index === 0)
        generateListContent(contentContainer, state.headerCategory);
      else if (index === 1)
        generateGridContent(contentContainer, state.headerCategory);
    });
  });
}
