let viewDateDOM = document.querySelector(".date");
let newsPreviewDOMList = document.querySelectorAll(".newsPreview");
let mouseHover = [];

const getDate = () => {
  const time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let day = time.getDay();

  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  viewDateDOM.innerText = year + '. ' + month + '. ' + date + ' ' + week[day] + '요일';
};

const loadNews = async () => {
  let { news } = await (await fetch("/data/news.json")).json();
  let left = 0;
  let right = 123456789; // 랜덤수
  let newsLength = news.length;

  const insertNews = (newsIndex, DOMIndex) => {
    newsPreviewDOMList[DOMIndex].innerText = news[newsIndex].com;
    newsPreviewDOMList[DOMIndex + 1].innerText = news[newsIndex].title.substr(0, 30) + "...";
  }

  insertNews(left, 0);
  insertNews(right % newsLength, 2);
  setInterval(() => {
    if (!mouseHover[0] && !mouseHover[1]) {
      insertNews(left % newsLength, 0);
      left++;
    }
    setTimeout(() => {
      if (!mouseHover[2] && !mouseHover[3]) {
        insertNews(right % newsLength, 2);
        right++;
      }
    }, 500)
  }, 1000);
}

for (let i = 0; i < newsPreviewDOMList.length; i++) {
  newsPreviewDOMList[i].addEventListener("mouseenter", () => {
    mouseHover[i] = 1;
  });
  newsPreviewDOMList[i].addEventListener("mouseleave", () => {
    mouseHover[i] = 0;
  });
}

getDate();
loadNews();