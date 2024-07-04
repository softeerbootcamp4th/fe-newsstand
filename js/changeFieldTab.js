import { allFieldTabLabel, myFieldTabLabel } from "../data/fieldTabLabel.js";

export const changeFieldTab = (mode) => {
  const fieldTab = document.querySelector(".field-tab");

  fieldTab.innerHTML = "";

  if (mode === 0)
    allFieldTabLabel.forEach((label) => {
      const fieldTabBtn = `<button class="field-tab-btn text-weak available-medium14 pointer">
    ${label}
  </button>`;
      fieldTab.innerHTML += fieldTabBtn;
    });
  else if (mode === 1)
    myFieldTabLabel.forEach((label) => {
      const fieldTabBtn = `<button class="field-tab-btn text-weak available-medium14 pointer">
      ${label}
    </button>`;
      fieldTab.innerHTML += fieldTabBtn;
    });
};
