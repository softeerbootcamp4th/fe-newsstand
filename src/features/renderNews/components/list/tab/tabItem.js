import { updateNext } from "../../../utils/updateStates.js";

const PROGRESS_DURATION_SEC = 20;

const classes = {
  base: "list-tab-item",
  unselected: "available-medium14",
  selected: "selected-bold14 selected-tab",
};

const classMapping = {
  true: `${classes.base} ${classes.selected}`,
  false: `${classes.base} ${classes.unselected}`,
};

/**
 * @param {Object} props
 * @param {string} props.innerText
 * @param {string} props.children
 * @param {boolean} props.isSelect
 * @returns {HTMLButtonElement}
 */
export function createTabItem({ innerText, children, isSelected }) {
  const button = document.createElement("button");
  button.className = classMapping[isSelected];
  button.innerHTML = `<p>${innerText}</p>`;

  if (isSelected) {
    button.insertAdjacentHTML("beforeend", `<p>${children}</p>`);
    startProgressBar(button);
  }

  return button;
}

function startProgressBar(selectedButton) {
  const progressBar = document.createElement("div");
  progressBar.className = "tab-progress";
  progressBar.style.animationDuration = `${PROGRESS_DURATION_SEC}s`;
  selectedButton.appendChild(progressBar);

  progressBar.addEventListener("animationend", updateNext, { once: true });
}
