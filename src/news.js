import { updateDOMstyle } from "./util.js";

const $subscribeToggleDOM = document.querySelectorAll(".subscribeToggle span");
const $newsgroupDOM = document.querySelector(".newsgroup");
const $leftScrollDOM = document.querySelector(".list .leftscroll");
const $rightScrollDOM = document.querySelector(".list .rightscroll");
const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
const ctgScrollNum = 3;

let state = {
  subscribeToggle: "whole",
  ctg: 0,
  ctgNews: 1,
};

categories.forEach((ctg) => {
  const newDOM = document.createElement("div");
  const newnewDOM = document.createElement("span");
  newnewDOM.innerText = ctg;
  newDOM.appendChild(newnewDOM);
  $newsgroupDOM.appendChild(newDOM);
});

const $ctgDOM = document.querySelectorAll(".newsgroup div");

const ctgDOMFill = (DOM) => {
  updateDOMstyle(DOM, {
    background: `linear-gradient(to right, #4362D0 ${state.ctgNews / ctgScrollNum * 100}%, #7890E7 ${state.ctgNews / ctgScrollNum * 100}%)`,
    color: "white",
    fontWeight: "bold",
  });

  if (DOM.childElementCount >= 2) {
    DOM.removeChild(DOM.lastElementChild);
  }
  const newDOM = document.createElement("span");
  newDOM.innerText = `${state.ctgNews}/${ctgScrollNum}`;
  DOM.appendChild(newDOM);
};

const ctgDOMLose = (DOM) => {
  updateDOMstyle(DOM, {
    background: "inherit",
    color: "inherit",
    fontWeight: "normal"
  });

  if (DOM.childElementCount >= 2) {
    DOM.removeChild(DOM.lastElementChild);
  }
};

$subscribeToggleDOM[0].addEventListener("click", () => {
  state.subscribeToggle = "whole";
  updateDOMstyle($subscribeToggleDOM[0], {
    fontWeight: "bold",
    color: "black",
  });
  updateDOMstyle($subscribeToggleDOM[1], {
    fontWeight: "normal",
    color: "#879298",
  })
})

$subscribeToggleDOM[1].addEventListener("click", () => {
  state.subscribeToggle = "my";
  updateDOMstyle($subscribeToggleDOM[0], {
    fontWeight: "normal",
    color: "#879298",
  });
  updateDOMstyle($subscribeToggleDOM[1], {
    fontWeight: "bold",
    color: "black",
  })
})

$leftScrollDOM.addEventListener("click", () => {
  state.ctgNews--;
  if (state.ctgNews === 0) {
    ctgDOMLose($ctgDOM[state.ctg]);
    state.ctgNews = ctgScrollNum;
    state.ctg--;
    if (state.ctg < 0) state.ctg = categories.length - 1;
  }
  ctgDOMFill($ctgDOM[state.ctg]);
})

$rightScrollDOM.addEventListener("click", () => {
  state.ctgNews++;
  if (state.ctgNews > ctgScrollNum) {
    ctgDOMLose($ctgDOM[state.ctg]);
    state.ctgNews = 1;
    state.ctg++;
    if (state.ctg === categories.length) state.ctg = 0;
  }
  ctgDOMFill($ctgDOM[state.ctg]);
})

ctgDOMFill($ctgDOM[state.ctg]);

for (let i = 0; i < $ctgDOM.length; i++) {
  $ctgDOM[i].addEventListener("click", () => {
    if (state.ctg !== i) {
      ctgDOMLose($ctgDOM[state.ctg]);
      state.ctg = i;
      state.ctgNews = 1;
    }
    ctgDOMFill($ctgDOM[i]);
  })
}