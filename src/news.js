import { updateDOMstyle } from "./util.js";

const $subscribeToggleDOM = document.querySelectorAll(".subscribe-toggle span");
const $newsgroupDOM = document.querySelector(".newsgroup");
const $headlineTitleDOM = document.querySelector(".paper .headline span");
const $newsListDOM = document.querySelector(".paper .list");
const $comImgDOM = document.querySelector(".paper .subscribe-bar img");
const $headlineImgDOM = document.querySelector(".paper .headline img");
const $subscribeButtonDOM = document.querySelector(".paper .subscribe-button");
let $ctgDOM;
const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
const scrollNum = 6;

let newsList;
let newsCom;

let state = {
  subscribeToggle: "whole",
  ctg: 0,
  comId: 1,
};

const insertDOM = (text) => {
  const newDOM = document.createElement("div");
  const newnewDOM = document.createElement("span");
  newnewDOM.innerText = text;
  newDOM.appendChild(newnewDOM);
  newDOM.setAttribute("class", "unselected");
  $newsgroupDOM.appendChild(newDOM);
};

const groupRefill = () => {
  if ($ctgDOM) ctgLose();
  while ($newsgroupDOM.firstChild) {
    $newsgroupDOM.removeChild($newsgroupDOM.firstChild);
  }
  state.ctg = 0;
  state.comId = 1;
  if (state.subscribeToggle === "whole") {
    categories.forEach((ctg) => {
      insertDOM(ctg);
    });
  }
  else if (state.subscribeToggle === "my") {
    const subscribeList = getSubscribeList();
    let subscribeNameList = [];
    subscribeList.forEach((comId) => {
      subscribeNameList = [...subscribeNameList, newsCom.find((com) => com.id === comId).name];
    });
    subscribeNameList.forEach((comName) => {
      insertDOM(comName);
    });
  }
  $ctgDOM = document.querySelectorAll(".newsgroup div");
  for (let i = 0; i < $ctgDOM.length; i++) {
    $ctgDOM[i].addEventListener("click", () => {
      if (state.ctg !== i) {
        ctgLose();
        state.ctg = i;
        state.comId = 1;
        ctgFill();
        bottomFill();
      }
    })
  }
  ctgFill();
};

const ctgFill = () => {
  const DOM = $ctgDOM[state.ctg];
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
    state.comId++;
    if (state.comId > scrollNum) {
      state.comId = 1;
      state.ctg++;
      if (state.ctg === categories.length) state.ctg = 0;
    }
    ctgFill();
    bottomFill();
  }

  const newDOM = document.createElement("span");
  if (state.subscribeToggle === "whole") {
    newDOM.innerText = `${state.comId}/${scrollNum}`;
  }
  else if (state.subscribeToggle === "my") {
    newDOM.innerHTML = "<img src='../img/chevron-right.png'>"
  }
  DOM.appendChild(newDOM);
};

const ctgLose = () => {
  const DOM = $ctgDOM[state.ctg];
  DOM.setAttribute("class", "unselected");
  const animations = DOM.getAnimations();
  animations.forEach(ani => ani.cancel());

  while (DOM.childElementCount > 1) {
    DOM.removeChild(DOM.lastElementChild);
  }
};

const bottomFill = () => {
  $comImgDOM.setAttribute("src", `../img/${state.comId}.png`);
  $headlineImgDOM.setAttribute("src", `../img/sample${state.comId}.jpg`);
  const currentComName = newsCom.find((com) => com.id === state.comId).name;
  const frontNewsList = newsList[categories[state.ctg]].filter((news) => news.com === currentComName);
  let isFirstNews = true;

  $headlineTitleDOM.innerText = frontNewsList[0] ? frontNewsList[0].title : "카테고리와 언론사에 해당되는 기사가 없습니다.";
  while ($newsListDOM.firstChild) {
    $newsListDOM.removeChild($newsListDOM.firstChild);
  }
  frontNewsList.forEach((news) => {
    if (isFirstNews) isFirstNews = false;
    else {
      const newDOM = document.createElement("span");
      newDOM.innerText = news.title;
      $newsListDOM.appendChild(newDOM);
    }
  });
  const newDOM = document.createElement("caption");
  newDOM.innerText = `${currentComName} 언론사에서 직접 편집한 뉴스입니다.`;
  $newsListDOM.appendChild(newDOM);

  const subscribeList = getSubscribeList();
  if (!subscribeList.includes(state.comId)) {
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
  if (!subscribeList.includes(state.comId)) {
    subscribeList = [...subscribeList, state.comId];
    localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
  }
};

const removeCurrentSubscribe = () => {
  let subscribeList = getSubscribeList();
  subscribeList = subscribeList.filter(com => com !== state.comId);
  localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
}

export default function CategoriesAndNewsSection(_news, _newsCom) {
  newsList = _news;
  newsCom = _newsCom;

  groupRefill();
  bottomFill();

  document.querySelector(".subscribe-toggle").addEventListener("click", (e) => {
    if (e.target.className !== "whole" && e.target.className !== "my") return;
    if (state.subscribeToggle !== e.target.className) {
      state.subscribeToggle = e.target.className;
      groupRefill();
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
        state.comId--;
        if (state.comId === 0) {
          state.comId = scrollNum;
          state.ctg--;
          if (state.ctg < 0) state.ctg = categories.length - 1;
        }
      }
      else if (state.subscribeToggle === "my") {
        state.ctg--;
        if (state.ctg < 0) state.ctg = getSubscribeList().length - 1;
      }
      ctgFill();
      bottomFill();
    }
    else if (targetClassName === "rightscroll") {
      ctgLose();
      if (state.subscribeToggle === "whole") {
        state.comId++;
        if (state.comId > scrollNum) {
          state.comId = 1;
          state.ctg++;
          if (state.ctg === categories.length) state.ctg = 0;
        }
      }
      else if (state.subscribeToggle === "my") {
        state.ctg++;
        if (state.ctg === getSubscribeList().length) state.ctg = 0;
      }
      ctgFill();
      bottomFill();
    }
    else if (targetClassName === "subscribe-button") {
      const subscribeList = getSubscribeList();
      if (!subscribeList.includes(state.comId)) {
        if (confirm("구독하시겠습니까?")) {
          pushCurrentSubscribe();
          $subscribeButtonDOM.innerText = "×";
          groupRefill();
        }
      }
      else {
        if (confirm("구독을 해지하시겠습니까?")) {
          removeCurrentSubscribe();
          $subscribeButtonDOM.innerText = "+ 구독하기";
          groupRefill();
        }
      }
    }
  });
}