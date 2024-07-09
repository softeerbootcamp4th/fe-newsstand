// import { createModel } from "./pressCategoryModel.js";
// import { createView } from "./pressCategoryView.js";

// export function createController({ tabs, onChangeCategory }) {
//   const model = createModel(tabs);
//   const view = createView({ model, onChangeCategory });

//   function init() {
//     view.render();
//   }

//   function updateTabs(newTabs) {
//     model.setTabs(newTabs);
//     view.render();
//   }

//   return {
//     getElement: () => view.element,
//     updateTabs,
//     init,
//   };
// }