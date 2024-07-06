const $viewDateDOM = document.querySelector(".date");
const $newsPreviewDOMList = document.querySelectorAll(".newsPreview");
const keyframes = [
  { transform: "translateY(0%)" },
  { transform: "translateY(-110%)" },
];
const options = {
  duration: 500,
};
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
  $viewDateDOM.innerText = `${year}. ${month}. ${date} ${week[day]}요일`;
};

const loadNews = async () => {
  let news = [];
  let { ctg } = await (await fetch("/data/news.json")).json();
  Object.keys(ctg).forEach((key) => {
    news = [...news, ...ctg[key]];
  });
  console.log(Object.keys((ctg)));
  let leftNewsIndex = 0;
  let rightNewsIndex = 123456789; // 랜덤수
  let newsLength = news.length;

  const insertNews = (newsIndex, DOMIndex, first) => {
    if (!first) {
      $newsPreviewDOMList[DOMIndex].animate(keyframes, options);
      $newsPreviewDOMList[DOMIndex + 1].animate(keyframes, options);
    }
    setTimeout(() => {
      $newsPreviewDOMList[DOMIndex].innerText = news[newsIndex].com + '\n' + news[(newsIndex + 1) % newsLength].com;

      $newsPreviewDOMList[DOMIndex + 1].innerText = news[newsIndex].title + '\n' + news[(newsIndex + 1) % newsLength].title;
    }, 500);
  }

  insertNews(leftNewsIndex++, 0, 1);
  insertNews(rightNewsIndex++ % newsLength, 2, 1);
  setInterval(() => {
    if (!mouseHover[0] && !mouseHover[1]) {
      insertNews(leftNewsIndex % newsLength, 0, 0);
      leftNewsIndex++;
    }

    if (!mouseHover[2] && !mouseHover[3]) {
      setTimeout(() => {
        if (!mouseHover[2] && !mouseHover[3]) {
          insertNews(rightNewsIndex % newsLength, 2, 0);
          rightNewsIndex++;
        }
      }, 1000);
    }
  }, 5000);
}

for (let i = 0; i < $newsPreviewDOMList.length; i++) {
  $newsPreviewDOMList[i].addEventListener("mouseenter", () => {
    mouseHover[i] = 1;
  });
  $newsPreviewDOMList[i].addEventListener("mouseleave", () => {
    mouseHover[i] = 0;
  });
}

getDate();
loadNews();