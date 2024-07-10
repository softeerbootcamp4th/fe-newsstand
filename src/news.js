import { updateDOMstyle } from "./util.js";

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
  updateDOMstyle($subscribeToggleDOM[0], {
    fontWeight: `${state.subscribeToggle === "whole" ? "bold" : "normal"}`,
    color: `${state.subscribeToggle === "whole" ? "black" : "#879298"}`
  });
  updateDOMstyle($subscribeToggleDOM[1], {
    fontWeight: `${state.subscribeToggle === "my" ? "bold" : "normal"}`,
    color: `${state.subscribeToggle === "my" ? "black" : "#879298"}`
  });

  if ($ctgDOM.length > 0) loseCtg();
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
  const scrollNum = companyList[state.bigCtg].length;
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
  DOM.setAttribute("class", "unselected");
  DOM.getAnimations().forEach(ani => ani.cancel());

  while (DOM.childElementCount > 1) {
    DOM.removeChild(DOM.lastElementChild);
  }
};

const fillBottom = () => {
  const frontNewsList = state.subscribeToggle === "whole" ? newsListObject[categories[state.bigCtg]].filter((news) => news.com === currentCompanyName()) : Object.values(newsListObject).flat().filter(news => news.com === currentCompanyName());
  const newsPerPage = 8;

  if (frontNewsList.length === 0) {
    updateDOMstyle(document.querySelector(".paper .news-visible"), { display: "none" });
    updateDOMstyle(document.querySelector(".paper .no-news"), { display: "block" });
  }
  else {
    updateDOMstyle(document.querySelector(".paper .news-visible"), { display: "block" });
    updateDOMstyle(document.querySelector(".paper .no-news"), { display: "none" });
  }

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

const getSubscribeList = () => {
  let JSONData = localStorage.getItem("subscribe-list");
  return JSONData ? JSON.parse(JSONData) : [];
};

const pushCurrentSubscribe = () => {
  let subscribeList = getSubscribeList();
  if (!subscribeList.includes(currentCompanyId())) {
    subscribeList = [...subscribeList, currentCompanyId()];
    localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
  }
};

const removeCurrentSubscribe = () => {
  let subscribeList = getSubscribeList();
  subscribeList = subscribeList.filter(com => com !== currentCompanyId());
  localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
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
    const targetClassName = e.target.className;
    if (targetClassName !== "whole" && targetClassName !== "my") return;
    if (state.subscribeToggle !== targetClassName) {
      state.subscribeToggle = targetClassName;
      state.bigCtg = 0;
      state.smallCtg = 0;
      refillGroup();
      fillBottom();
    }
  });

  document.querySelector(".paper").addEventListener("click", (e) => {
    const { className: targetClassName } = e.target;

    if (targetClassName === "leftscroll") {
      loseCtg();
      switchPrevCtg();
      fillCtg();
      fillBottom();
    }
    else if (targetClassName === "rightscroll") {
      loseCtg();
      switchNextCtg();
      fillCtg();
      fillBottom();
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
          state.subscribeToggle = "my";
          state.bigCtg = 0;
          state.smallCtg = 0;
          refillGroup();
          fillBottom();
        };
        pushCurrentSubscribe();
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
      removeCurrentSubscribe();
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