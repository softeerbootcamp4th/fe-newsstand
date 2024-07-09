import { getToday } from "../../util/getToday.js";

export const header = () => {
  const date = document.querySelector(".header-today-date");
  date.innerHTML = getToday();
};
