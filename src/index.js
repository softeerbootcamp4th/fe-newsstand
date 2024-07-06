import rollingNewsSection from "./rolling.js";
import CategoriesAndNewsSection from "./news.js";

const $viewDateDOM = document.querySelector(".date");

const getDate = () => {
  const time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let day = time.getDay();

  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  $viewDateDOM.innerText = `${year}. ${month}. ${date} ${week[day]}요일`;
};

getDate();
rollingNewsSection();
CategoriesAndNewsSection();