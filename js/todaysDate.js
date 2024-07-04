import { getToday } from "../utils/getToday.js";

(() => {
  const date = document.querySelector(".header-today-date");

  date.innerHTML = getToday();
})();
