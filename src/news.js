import { updateDOMstyle } from "./util.js";

const $subscribeToggleDOM = document.querySelectorAll(".subscribe-toggle span");
const $newsgroupDOM = document.querySelector(".newsgroup");
const $headlineTitleDOM = document.querySelector(".paper .headline span");
const $newsListDOM = document.querySelector(".paper .list");
const $comImgDOM = document.querySelector(".paper .subscribe-bar img");
const $headlineImgDOM = document.querySelector(".paper .headline img");
const $subscribeButtonDOM = document.querySelector(".paper .subscribe-button");
let $ctgDOM = [];
const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

let newsListObject = {};
let newsComList = [];
let comList = [];

let state = {
  subscribeToggle: "whole",
  bigCtg: 0,
  smallCtg: 0,
};
const currentComId = () => {
  if (state.subscribeToggle === "whole") return comList[state.bigCtg][state.smallCtg].id;
  else if (state.subscribeToggle === "my") return getSubscribeList()[state.bigCtg];
}

const currentComName = () => {
  if (state.subscribeToggle === "whole") return comList[state.bigCtg][state.smallCtg].name;
  else if (state.subscribeToggle === "my") return newsComList.find((news) => news.id === currentComId())?.name;
}

const insertDOM = (text) => {
  const newDOM = document.createElement("div");
  const newnewDOM = document.createElement("span");
  newnewDOM.innerText = text;
  newDOM.appendChild(newnewDOM);
  newDOM.setAttribute("class", "unselected");
  $newsgroupDOM.appendChild(newDOM);
};

const groupRefill = () => {
  if ($ctgDOM.length > 0) ctgLose();
  while ($newsgroupDOM.firstChild) {
    $newsgroupDOM.removeChild($newsgroupDOM.firstChild);
  }
  state.bigCtg = 0;
  state.smallCtg = 0;
  if (state.subscribeToggle === "whole") {
    categories.forEach((ctg) => {
      insertDOM(ctg);
    });
  }
  else if (state.subscribeToggle === "my") {
    const subscribeList = getSubscribeList();
    let subscribeNameList = [];
    subscribeList.forEach((comId) => {
      subscribeNameList = [...subscribeNameList, newsComList.find((com) => com.id === comId).name];
    });
    subscribeNameList.forEach((comName) => {
      insertDOM(comName);
    });
  }
  $ctgDOM = document.querySelectorAll(".newsgroup div");
  for (let i = 0; i < $ctgDOM.length; i++) {
    $ctgDOM[i].addEventListener("click", () => {
      if (state.bigCtg !== i) {
        ctgLose();
        state.bigCtg = i;
        state.smallCtg = 0;
        ctgFill();
        bottomFill();
      }
    })
  }
  if ($ctgDOM.length > 0) ctgFill();
};

const ctgFill = () => {
  const DOM = $ctgDOM[state.bigCtg];
  const scrollNum = comList[state.bigCtg].length;
  const keyframes = [
    {
      backgroundPosition: "100%",
    },
    {
      backgroundPosition: "0%",
    }
  ];
  const options = {
    duration: 20000,
  };

  DOM.setAttribute("class", "selected");
  DOM.animate(keyframes, options).onfinish = () => {
    ctgLose();
    if (state.subscribeToggle === "whole") {
      state.smallCtg++;
      if (state.smallCtg >= scrollNum) {
        state.smallCtg = 0;
        state.bigCtg++;
        if (state.bigCtg >= categories.length) state.bigCtg = 0;
      }
    }
    else if (state.subscribeToggle === "my") {
      state.bigCtg++;
      if (state.bigCtg >= getSubscribeList().length) {
        state.bigCtg = 0;
      }
    }
    ctgFill();
    bottomFill();
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

const ctgLose = () => {
  const DOM = $ctgDOM[state.bigCtg];
  DOM.setAttribute("class", "unselected");
  const animations = DOM.getAnimations();
  animations.forEach(ani => ani.cancel());

  while (DOM.childElementCount > 1) {
    DOM.removeChild(DOM.lastElementChild);
  }
};

const bottomFill = () => {
  const frontNewsList = state.subscribeToggle === "whole" ? newsListObject[categories[state.bigCtg]].filter((news) => news.com === currentComName()) : Object.values(newsListObject).flat().filter(news => news.com === currentComName());
  const newsPerPage = 8;

  if (frontNewsList.length === 0) {
    updateDOMstyle(document.querySelector(".paper"), { visibility: "hidden" });
  }
  else {
    updateDOMstyle(document.querySelector(".paper"), { visibility: "visible" });
  }

  $comImgDOM.setAttribute("src", `../img/${currentComId()}.png`);
  $headlineImgDOM.setAttribute("src", `../img/sample${1 + Math.floor(Math.random() * 6)}.jpg`);

  $headlineTitleDOM.innerText = frontNewsList[0] ? frontNewsList[0].title : "";
  while ($newsListDOM.firstChild) {
    $newsListDOM.removeChild($newsListDOM.firstChild);
  }
  for (let i = 1; i < Math.min(newsPerPage, frontNewsList.length); i++) {
    const newDOM = document.createElement("span");
    newDOM.innerText = frontNewsList[i].title;
    $newsListDOM.appendChild(newDOM);
  }

  const newDOM = document.createElement("caption");
  newDOM.innerText = `${currentComName()} 언론사에서 직접 편집한 뉴스입니다.`;
  $newsListDOM.appendChild(newDOM);

  const subscribeList = getSubscribeList();
  if (!subscribeList.includes(currentComId())) {
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
  if (!subscribeList.includes(currentComId())) {
    subscribeList = [...subscribeList, currentComId()];
    localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
  }
};

const removeCurrentSubscribe = () => {
  let subscribeList = getSubscribeList();
  subscribeList = subscribeList.filter(com => com !== currentComId());
  localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
};

export default function CategoriesAndNewsSection(_news, _newsCom) {
  newsListObject = _news;
  newsComList = _newsCom;
  categories.forEach((ctg) => {
    const comNameList = [...new Set(newsListObject[ctg].map(news => news.com))];
    comList = [...comList, comNameList.map(name => newsComList.find((com) => com.name === name))];
  })

  groupRefill();
  bottomFill();

  document.querySelector(".subscribe-toggle").addEventListener("click", (e) => {
    const targetClassName = e.target.className;
    if (targetClassName !== "whole" && targetClassName !== "my") return;
    if (state.subscribeToggle !== targetClassName) {
      state.subscribeToggle = targetClassName;
      groupRefill();
      bottomFill();
    }
    updateDOMstyle($subscribeToggleDOM[0], {
      fontWeight: `${state.subscribeToggle === "whole" ? "bold" : "normal"}`,
      color: `${state.subscribeToggle === "whole" ? "black" : "#879298"}`
    });
    updateDOMstyle($subscribeToggleDOM[1], {
      fontWeight: `${state.subscribeToggle === "my" ? "bold" : "normal"}`,
      color: `${state.subscribeToggle === "my" ? "black" : "#879298"}`
    });
  });

  document.querySelector(".paper").addEventListener("click", (e) => {
    const targetClassName = e.target.className;

    if (targetClassName === "leftscroll") {
      ctgLose();
      if (state.subscribeToggle === "whole") {
        state.smallCtg--;
        if (state.smallCtg < 0) {
          state.bigCtg--;
          if (state.bigCtg < 0) state.bigCtg = comList.length - 1;
          state.smallCtg = comList[state.bigCtg].length - 1;
        }
      }
      else if (state.subscribeToggle === "my") {
        state.bigCtg--;
        if (state.bigCtg < 0) state.bigCtg = getSubscribeList().length - 1;
      }
      ctgFill();
      bottomFill();
    }
    else if (targetClassName === "rightscroll") {
      ctgLose();
      if (state.subscribeToggle === "whole") {
        state.smallCtg++;
        if (state.smallCtg >= comList[state.bigCtg].length) {
          state.bigCtg++;
          if (state.bigCtg >= comList.length) state.bigCtg = 0;
          state.smallCtg = 0;
        }
      }
      else if (state.subscribeToggle === "my") {
        state.bigCtg++;
        if (state.bigCtg === getSubscribeList().length) state.bigCtg = 0;
      }
      ctgFill();
      bottomFill();
    }
    else if (targetClassName === "subscribe-button") {
      const subscribeList = getSubscribeList();
      if (!subscribeList.includes(currentComId())) {
        if (confirm("구독하시겠습니까?")) {
          pushCurrentSubscribe();
          $subscribeButtonDOM.innerText = "×";
          groupRefill();
          bottomFill();
        }
      }
      else {
        if (confirm("구독을 해지하시겠습니까?")) {
          removeCurrentSubscribe();
          $subscribeButtonDOM.innerText = "+ 구독하기";
          groupRefill();
          bottomFill();
        }
      }
    }
  });
}