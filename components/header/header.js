import { getTodayString, refreshPage } from "../../utils/utils.js";

export function setupHeader() {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", refreshPage);
  const today = document.querySelector(".today");
  today.innerHTML = getTodayString();
}
