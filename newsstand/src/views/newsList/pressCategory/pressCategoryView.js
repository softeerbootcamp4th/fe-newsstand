// // pressCategoryView.js
// import { separateId } from "../../../utils/utils.js";

// export function createView({ model, onChangeCategory }) {
//   const element = document.createElement("div");
//   element.className = "press-category-container";

//   let buttons = [];
//   let progressBars = [];

//   function onClickEvent(event) {
//     const intId = separateId(event.target.id);
//     onChangeCategory(intId);
//   }

//   function updateSelectedButtonStyle() {
//     const rootStyles = getComputedStyle(document.documentElement);

//     buttons.forEach((button, index) => {
//       const tabModel = model.tabs[index];
//       const isSelected = tabModel.selectedIndex !== undefined;

//       button.style.backgroundColor = isSelected
//         ? rootStyles.getPropertyValue("--color-surface-brand-alt")
//         : "transparent";
//       button.style.color = isSelected
//         ? rootStyles.getPropertyValue("--color-text-white-default")
//         : rootStyles.getPropertyValue("--color-text-weak");

//       const categoryCountSpan = button.querySelector(".press-count-span");
//       if (categoryCountSpan) {
//         button.style.width = isSelected ? "166px" : "max-content";
//         categoryCountSpan.textContent = isSelected
//           ? `${tabModel.selectedIndex + 1}/${tabModel.tabDataCount}`
//           : "";
//       }

//       if (isSelected) {
//         progressBars[index].classList.add("selected");
//       } else {
//         progressBars[index].classList.remove("selected");
//       }
//     });
//   }

//   function createButtonHTML(category, index) {
//     const isSelected = category.selectedIndex !== undefined;
//     const countSpanText = isSelected
//       ? `${category.selectedIndex + 1}/${category.tabDataCount}`
//       : "";

//     return `
//       <button class="press-category-button" id="press-category-${index}">
//         <div class="press-category-button-progress"></div>
//         <div class="press-category-span-container">
//           <span>${category.tabName}</span>
//           <span class="press-count-span">${countSpanText}</span>
//         </div>
//       </button>
//     `;
//   }

//   function renderButtons() {
//     element.innerHTML = "";
//     buttons = [];
//     progressBars = [];

//     model.tabs.forEach((category, index) => {
//       const buttonHTML = createButtonHTML(category, index);
//       element.innerHTML += buttonHTML;
//     });

//     buttons = Array.from(element.querySelectorAll(".press-category-button"));
//     progressBars = Array.from(
//       element.querySelectorAll(".press-category-button-progress")
//     );

//     buttons.forEach((button) => {
//       button.addEventListener("click", onClickEvent);
//     });
//   }

//   function render() {
//     renderButtons();
//     updateSelectedButtonStyle();
//   }

//   return {
//     element,
//     render,
//   };
// }
