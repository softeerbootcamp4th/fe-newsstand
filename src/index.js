let viewDateElement = document.getElementById("date");
let newsLeftTitleElement = document.getElementById("newsLeftTitle");
let newsLeftComElement = document.getElementById("newsLeftCom");
const getDate = () => {
  const time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let day = time.getDay();

  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  viewDateElement.innerText = year + '. ' + month + '. ' + date + ' ' + week[day] + '요일';
};
getDate();

fetch("/data/news.json")
  .then((r) => r.json())
  .then((json) => {
    let newsLeftLength;
    let i = 0;
    newsLeftLength = json.news.length;
    newsLeftTitleElement.innerText = json.news[i].title;
    newsLeftComElement.innerText = json.news[i++].com;
    setInterval(() => {
      if (i >= newsLeftLength) i = 0;
      newsLeftTitleElement.innerText = json.news[i].title;
      newsLeftComElement.innerText = json.news[i++].com;
    }, 1000);
  });