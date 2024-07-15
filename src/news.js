import { updateDOMstyle, getSubscribeList, pushSubscribe, removeSubscribe } from "./util.js";

const $subscribeToggleDOM = document.querySelectorAll(".subscribe-toggle span");
const $newsgroupDOM = document.querySelector(".newsgroup");
const $headlineTitleDOM = document.querySelector(".paper .headline span");
const $newsListDOM = document.querySelector(".paper .list");
const $companyImgDOM = document.querySelector(".paper .subscribe-bar img");
const $headlineImgDOM = document.querySelector(".paper .headline img");
const $subscribeButtonDOM = document.querySelector(".paper .subscribe-button");
const $snackbarDOM = document.querySelector(".paper .snackbar");
const $unsubscribeAlertDOM = document.querySelector(".paper .unsubscribe-alert")
let $ctgDOM = [];
const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

let newsListObject = {};
let newsCompanyList = [];
let companyList = [];

let state = {
  subscribeToggle: "whole",
  bigCtg: 0,
  smallCtg: 0,
};

const currentCompanyId = () => {
  if (state.subscribeToggle === "whole") return companyList[state.bigCtg][state.smallCtg].id;
  else if (state.subscribeToggle === "my") return getSubscribeList()[state.bigCtg];
};

const currentCompanyName = () => {
  if (state.subscribeToggle === "whole") return companyList[state.bigCtg][state.smallCtg].name;
  else if (state.subscribeToggle === "my") return newsCompanyList.find((news) => news.id === currentCompanyId())?.name;
};

const switchNextCtg = () => {
  if (state.subscribeToggle === "whole") {
    state.smallCtg++;
    if (state.smallCtg >= companyList[state.bigCtg].length) {
      state.bigCtg++;
      if (state.bigCtg >= companyList.length) state.bigCtg = 0;
      state.smallCtg = 0;
    }
  }
  else if (state.subscribeToggle === "my") {
    state.bigCtg++;
    if (state.bigCtg === getSubscribeList().length) state.bigCtg = 0;
  }
};

const switchPrevCtg = () => {
  if (state.subscribeToggle === "whole") {
    state.smallCtg--;
    if (state.smallCtg < 0) {
      state.bigCtg--;
      if (state.bigCtg < 0) state.bigCtg = companyList.length - 1;
      state.smallCtg = companyList[state.bigCtg].length - 1;
    }
  }
  else if (state.subscribeToggle === "my") {
    state.bigCtg--;
    if (state.bigCtg < 0) state.bigCtg = getSubscribeList().length - 1;
  }
};

const insertDOM = (text) => {
  const newDOM = document.createElement("div");
  const newnewDOM = document.createElement("span");
  newnewDOM.innerText = text;
  newDOM.appendChild(newnewDOM);
  newDOM.setAttribute("class", "unselected");
  $newsgroupDOM.appendChild(newDOM);
};

const refillGroup = () => {
  const isWholeCompany = state.subscribeToggle === "whole";
  updateDOMstyle($subscribeToggleDOM[0], {
    fontWeight: isWholeCompany ? "bold" : "normal",
    color: isWholeCompany ? "black" : "#879298"
  });
  updateDOMstyle($subscribeToggleDOM[1], {
    fontWeight: isWholeCompany ? "normal" : "bold",
    color: isWholeCompany ? "#879298" : "black"
  });

  $newsgroupDOM.innerHTML = "";

  if (state.subscribeToggle === "whole") {
    categories.forEach((ctg) => {
      insertDOM(ctg);
    });
  }
  else if (state.subscribeToggle === "my") {
    const subscribeList = getSubscribeList();
    let subscribeNameList = [];
    subscribeList.forEach((comId) => {
      subscribeNameList = [...subscribeNameList, newsCompanyList.find((com) => com.id === comId).name];
    });
    subscribeNameList.forEach((comName) => {
      insertDOM(comName);
    });
  }
  $ctgDOM = document.querySelectorAll(".newsgroup div");
  for (let i = 0; i < $ctgDOM.length; i++) {
    $ctgDOM[i].addEventListener("click", () => {
      if (state.bigCtg !== i) {
        loseCtg();
        state.bigCtg = i;
        state.smallCtg = 0;
        fillCtg();
        fillBottom();
      }
    })
  }
  if ($ctgDOM.length > 0) fillCtg();
};

const fillCtg = () => {
  const DOM = $ctgDOM[state.bigCtg];
  const scrollNum = `${state.subscribeToggle === "whole" ? companyList[state.bigCtg].length : 0}`;
  const keyframes = [
    { backgroundPosition: "100%" },
    { backgroundPosition: "0%" }
  ];
  const options = { duration: 20000 };

  DOM.setAttribute("class", "selected");
  DOM.animate(keyframes, options).onfinish = () => {
    loseCtg();
    switchNextCtg();
    fillCtg();
    fillBottom();
  }

  const newDOM = document.createElement("span");
  if (state.subscribeToggle === "whole") {
    newDOM.innerText = `${state.smallCtg + 1}/${scrollNum}`;
  }
  else if (state.subscribeToggle === "my") {
    newDOM.innerHTML = "<img src='../img/chevron-right.png'>"
  }
  DOM.appendChild(newDOM);
};

const loseCtg = () => {
  const DOM = $ctgDOM[state.bigCtg];
  if(!DOM) return; 
  DOM.setAttribute("class", "unselected");
  DOM.getAnimations().forEach(ani => ani.cancel());

  while (DOM.childElementCount > 1) {
    DOM.removeChild(DOM.lastElementChild);
  }
};

const fillBottom = () => {
  const frontNewsList = state.subscribeToggle === "whole" ? newsListObject[categories[state.bigCtg]].filter((news) => news.com === currentCompanyName()) : Object.values(newsListObject).flat().filter(news => news.com === currentCompanyName());
  const newsPerPage = 8;
  const newsVisibleDOM = document.querySelector(".paper .news-visible");
  const noNewsDOM = document.querySelector(".paper .no-news");

  if (frontNewsList.length === 0) {
    updateDOMstyle(newsVisibleDOM, { display: "none" });
    updateDOMstyle(noNewsDOM, { display: "flex" });
    return;
  }
  updateDOMstyle(newsVisibleDOM, { display: "block" });
  updateDOMstyle(noNewsDOM, { display: "none" });

  $companyImgDOM.setAttribute("src", `../img/${currentCompanyId()}.png`);
  $headlineImgDOM.setAttribute("src", `../img/sample${1 + Math.floor(Math.random() * 6)}.jpg`);

  $headlineTitleDOM.innerText = frontNewsList[0] ? frontNewsList[0].title : "";
  $newsListDOM.innerHTML = "";
  for (let i = 1; i < Math.min(newsPerPage, frontNewsList.length); i++) {
    const newDOM = document.createElement("span");
    newDOM.innerText = frontNewsList[i].title;
    $newsListDOM.appendChild(newDOM);
  }

  const newDOM = document.createElement("caption");
  newDOM.innerText = `${currentCompanyName()} 언론사에서 직접 편집한 뉴스입니다.`;
  $newsListDOM.appendChild(newDOM);

  const subscribeList = getSubscribeList();
  if (!subscribeList.includes(currentCompanyId())) {
    $subscribeButtonDOM.innerText = "+ 구독하기";
  }
  else {
    $subscribeButtonDOM.innerText = "×";
  }
};


export default function CategoriesAndNewsSection(_news, _newsCom) {
  newsListObject = _news;
  newsCompanyList = _newsCom;
  categories.forEach((ctg) => {
    const comNameList = [...new Set(newsListObject[ctg].map(news => news.com))];
    companyList = [...companyList, comNameList.map(name => newsCompanyList.find((com) => com.name === name))];
  })

  refillGroup();
  fillBottom();

  document.querySelector(".subscribe-toggle").addEventListener("click", (e) => {
    const { className: targetClassName } = e.target;
    if (targetClassName !== "whole" && targetClassName !== "my") return;
    if (state.subscribeToggle !== targetClassName) {
      state.subscribeToggle = targetClassName;
      loseCtg();
      state.bigCtg = 0;
      state.smallCtg = 0;
      refillGroup();
      fillBottom();
    }
  });

  let startX;
  let firstScrollLeft;
  let isDown = false;
  $newsgroupDOM.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - $newsgroupDOM.offsetLeft;
    firstScrollLeft = $newsgroupDOM.scrollLeft;
  });

  $newsgroupDOM.addEventListener("mouseup", () => { isDown = false; });

  $newsgroupDOM.addEventListener("mouseleave", () => { isDown = false; });

  $newsgroupDOM.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - $newsgroupDOM.offsetLeft - startX) * 2; // 스크롤 속도 조정
    $newsgroupDOM.scrollLeft = firstScrollLeft - walk;
  });

  document.querySelector(".paper").addEventListener("click", (e) => {
    const { className: targetClassName } = e.target;

    if (targetClassName === "leftscroll") {
      loseCtg();
      switchPrevCtg();
      fillCtg();
      fillBottom();
      if (state.subscribeToggle === "my" && state.bigCtg === getSubscribeList().length - 1) {
        $newsgroupDOM.scrollLeft = $newsgroupDOM.scrollWidth;
      }
    }
    else if (targetClassName === "rightscroll") {
      loseCtg();
      switchNextCtg();
      fillCtg();
      fillBottom();
      if (state.subscribeToggle === "my" && state.bigCtg === 0) {
        $newsgroupDOM.scrollLeft = 0;
      }
    }
    else if (targetClassName === "subscribe-button") {
      const subscribeList = getSubscribeList();
      if (!subscribeList.includes(currentCompanyId())) {
        $snackbarDOM.getAnimations().forEach(ani => ani.cancel());
        const keyframes = [
          { opacity: 0, display: "inline" },
          { opacity: 1, offset: 0.05 },
          { opacity: 1, offset: 0.95 },
          { opacity: 0, display: "hidden" }
        ];
        const options = { duration: 5000, };
        $snackbarDOM.animate(keyframes, options).onfinish = () => {
          if (state.subscribeToggle !== "my") {
            state.subscribeToggle = "my";
            state.bigCtg = 0;
            state.smallCtg = 0;
            refillGroup();
            fillBottom();
          }
        };
        pushSubscribe(currentCompanyId());
        fillBottom();
      }
      else {
        updateDOMstyle($unsubscribeAlertDOM, { display: "inline" });
        document.querySelector(".paper .company-name").innerText = currentCompanyName();
        $snackbarDOM.getAnimations().forEach(ani => ani.cancel());
      }
    }
    else if (targetClassName === "unsubscribe-yes") {
      updateDOMstyle($unsubscribeAlertDOM, { display: "none" });
      removeSubscribe(currentCompanyId());
      if (state.subscribeToggle === "whole") switchNextCtg();
      else if (state.subscribeToggle === "my") state.bigCtg = 0;
      refillGroup();
      fillBottom();
    }
    else if (targetClassName === "unsubscribe-no") {
      updateDOMstyle($unsubscribeAlertDOM, { display: "none" });
    }
  });
}