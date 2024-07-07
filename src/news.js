import { updateDOMstyle } from "./util.js";

const $subscribeToggleDOM = document.querySelectorAll(".subscribeToggle span");
const $newsgroupDOM = document.querySelector(".newsgroup");
const $leftScrollDOM = document.querySelector(".paper .leftscroll");
const $rightScrollDOM = document.querySelector(".paper .rightscroll");
const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
const ctgScrollNum = 6;

let state = {
  subscribeToggle: "whole",
  ctg: 0,
  comId: 1,
};

categories.forEach((ctg) => {
  const newDOM = document.createElement("div");
  const newnewDOM = document.createElement("span");
  newnewDOM.innerText = ctg;
  newDOM.appendChild(newnewDOM);
  $newsgroupDOM.appendChild(newDOM);
});

const $ctgDOM = document.querySelectorAll(".newsgroup div");

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
    duration: 5000,
  };

  updateDOMstyle(DOM, {
    background: `linear-gradient(to right, #4362D0 50%, #7890E7 50%)`,
    backgroundSize: "200%",
    color: "white",
    fontWeight: "bold",
  });

  DOM.animate(keyframes, options).onfinish = () => {
    ctgLose();
    state.comId++;
    if (state.comId > ctgScrollNum) {
      state.comId = 1;
      state.ctg++;
      if (state.ctg === categories.length) state.ctg = 0;
    }
    ctgFill();
    bottomFill();
  }

  if (DOM.childElementCount === 2) {
    DOM.removeChild(DOM.lastElementChild);
  }
  const newDOM = document.createElement("span");
  newDOM.innerText = `${state.comId}/${ctgScrollNum}`;
  DOM.appendChild(newDOM);
};

const ctgLose = () => {
  const DOM = $ctgDOM[state.ctg];
  const animations = DOM.getAnimations();
  animations.forEach(ani => ani.cancel());

  updateDOMstyle(DOM, {
    background: "inherit",
    color: "inherit",
    fontWeight: "normal"
  });

  if (DOM.childElementCount >= 2) {
    DOM.removeChild(DOM.lastElementChild);
  }
};

const bottomFill = () => {
  const $comImgDOM = document.querySelector(".paper .subscribe-bar img");
  const $headlineImgDOM = document.querySelector(".paper .headline img");
  $comImgDOM.setAttribute("src", `../img/${state.comId}.png`);
  $headlineImgDOM.setAttribute("src", `../img/sample${state.comId}.jpg`);
}

export default function CategoriesAndNewsSection(_news, _newsCom) {
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
    ctgLose();
    state.comId--;
    if (state.comId === 0) {
      state.comId = ctgScrollNum;
      state.ctg--;
      if (state.ctg < 0) state.ctg = categories.length - 1;
    }
    ctgFill();
    bottomFill();
  })

  $rightScrollDOM.addEventListener("click", () => {
    ctgLose();
    state.comId++;
    if (state.comId > ctgScrollNum) {
      state.comId = 1;
      state.ctg++;
      if (state.ctg === categories.length) state.ctg = 0;
    }
    ctgFill();
    bottomFill();
  })

  ctgFill();
  bottomFill();

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
}