const $newsPreviewDOMList = document.querySelectorAll(".invisible-box span"); // 좌측 언론사, 좌측 기사제목, 우측 언론사, 우측 기사제목, 총 4개 DOM
let mouseHover = [];
let newsLength;
let news = [];

const switchNewsWithAni = (newsIndex, DOMIndex, isFirst) => {
  const keyframes = [
    { transform: "translateY(0%)" },
    { transform: "translateY(-100%)" },
  ];
  const options = {
    duration: 500,
  };

  $newsPreviewDOMList[DOMIndex].animate(isFirst ? [] : keyframes, isFirst ? {} : options).onfinish = () => {
    $newsPreviewDOMList[DOMIndex].innerText = news[newsIndex].com + '\n' + news[(newsIndex + 1) % newsLength].com;
  };
  $newsPreviewDOMList[DOMIndex + 1].animate(isFirst ? [] : keyframes, isFirst ? {} : options).onfinish = () => {
    $newsPreviewDOMList[DOMIndex + 1].innerText = news[newsIndex].title + '\n' + news[(newsIndex + 1) % newsLength].title;
  }
  $newsPreviewDOMList[DOMIndex + 1].title = news[newsIndex].title;
};

const loadNews = (_news) => {
  Object.keys(_news).forEach((key) => {
    news = [...news, ..._news[key]];
  });
  let leftNewsIndex = 0;
  let rightNewsIndex = Math.floor(Math.random() * 1000); // 0 ~ 999의 난수
  newsLength = news.length;

  switchNewsWithAni(leftNewsIndex, 0, true);
  switchNewsWithAni(rightNewsIndex % newsLength, 2, true);
  leftNewsIndex++;
  rightNewsIndex++;

  let lastTime = 0;
  let isRightNewsSwitched = false;
  const bigInterval = 5000; // 5초
  const smallInterval = 1000; // 1초

  const execPerFrame = (currentTime) => {
    if (currentTime - lastTime >= bigInterval) {
      isRightNewsSwitched = false;
      lastTime = currentTime;
      if (!mouseHover[0] && !mouseHover[1]) {
        switchNewsWithAni(leftNewsIndex % newsLength, 0, false);
        leftNewsIndex++;
      }
    }
    if (currentTime - lastTime >= smallInterval && !isRightNewsSwitched) {
      isRightNewsSwitched = true;
      if (!mouseHover[2] && !mouseHover[3]) {
        switchNewsWithAni(rightNewsIndex % newsLength, 2, false);
        rightNewsIndex++;
      }
    }
    requestAnimationFrame(execPerFrame);
  }
  requestAnimationFrame(execPerFrame);
};

export default function rollingNewsSection(_news) {
  for (let i = 0; i < $newsPreviewDOMList.length; i++) {
    $newsPreviewDOMList[i].addEventListener("mouseenter", () => {
      mouseHover[i] = 1;
    });
    $newsPreviewDOMList[i].addEventListener("mouseleave", () => {
      mouseHover[i] = 0;
    });
  }

  loadNews(_news);
};