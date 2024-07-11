import { deleteNodeById, generateNode } from "../utils/utils.js";
import { updateMyNewsList } from "./myNewsList.js";
import { updateNewsList } from "./newsList.js";
import { categoryList, myList, mediaData } from "../resources/data.js";
import state from "../global/state.js";
import { generateSubscribe, generateUnsubscribe } from "./subscribe.js";
import { startInterval, stopInterval } from "../global/interval.js";

/**
 * Nav목록으로 네비게이션 바를 container의 child로 생성 후 초기화
 * @param {Node} container Nav가 붙을 돔 객체
 * @param {Array} currentHeaderCategoryIndex Nav에 보여질 현재 선택된 리스트
 */
export function generateNav(container, currentHeaderCategoryIndex) {
  let selectedList;
  if (currentHeaderCategoryIndex === 0) {
    selectedList = categoryList;
    state.headerCategory = 0;
  } else if (currentHeaderCategoryIndex === 1) {
    selectedList = myList.map((element) => mediaData[element].media);
    state.headerCategory = 1;
  }

  navInit(selectedList);

  if (currentHeaderCategoryIndex === 0) generateNavForNewsList(selectedList);
  else if (currentHeaderCategoryIndex === 1) generateNavForMyList(selectedList);

  function navInit(selectedList) {
    state.currentCategoryIndex = 0;
    state.currentMediaIndex = 0;
    resetInterval();

    const nav = generateNode("nav", "content_navigator");
    const ul = generateNode("ul", "contentList");

    selectedList.forEach((category, index) => {
      const li = generateNode("li");
      ul.appendChild(li);

      createNavElement(li, category);

      if (index === state.currentCategoryIndex) li.classList.add("selected");
    });

    nav.appendChild(ul);
    container.appendChild(nav);
  }
}

/**
 * container에 cover, category, progress node를 추가함
 * @param {Node} container
 * @param {String} category
 */
function createNavElement(container, category) {
  const progressBar = generateNode("div", "cover");
  container.appendChild(progressBar);

  const textContent = generateNode("span");
  textContent.textContent = category;
  container.appendChild(textContent);

  const progress = generateNode("span", "progress");
  container.appendChild(progress);
}

/**
 * newsList를 생성하는 함수
 */
function generateNavForNewsList(selectedList) {
  updateNewsList(
    categoryList[state.currentCategoryIndex],
    state.currentCategoryIndex,
    state.currentMediaIndex
  );

  generateSubscribe();

  const navNode = document.querySelector(".contentList");
  const navNodeElements = document.querySelectorAll(".contentList li");

  setupNavElements(
    navNode,
    navNodeElements,
    startNewsInterval,
    updateCategoryByIndex,
    selectedList
  );

  startNewsInterval();
}

/**
 * 구독 newsList를 생성하는 함수
 */
export function generateNavForMyList(selectedList) {
  updateMyNewsList(state.currentCategoryIndex);

  generateUnsubscribe();

  const navNode = document.querySelector(".contentList");
  const navNodeElements = document.querySelectorAll(".contentList li");

  setupNavElements(
    navNode,
    navNodeElements,
    startMyNewsInterval,
    updateMyMedia,
    selectedList
  );

  startMyNewsInterval();
}

/**
 * navNode 이벤트 리스너를 추가하고 Interval 을 시작하는 함수
 */
function setupNavElements(
  navNode,
  navNodeElements,
  intervalStartFunction,
  updateFunction,
  selectedList
) {
  navNode.addEventListener("click", function ({ target }) {
    navNodeElements[state.currentCategoryIndex].classList.remove("selected");
    if (target.tagName === "LI") {
      target = target.querySelector("span");
    }

    for (const [index, element] of selectedList.entries()) {
      if (element === target.innerHTML) {
        navNodeElements[index].classList.add("selected");
        state.currentCategoryIndex = index;
        break;
      }
    }

    resetInterval();
    intervalStartFunction();

    updateFunction(state.currentCategoryIndex);
  });
}

/**
 * Nav 비우는 함수
 */
export function deleteNav() {
  deleteNodeById("nav_container");
}

/**
 * progress class를 가진 html을 category의 몇 번째 언론사인지 몇/몇 으로 표시
 * @param {int} categoryIndex
 * @param {int} currentMediaIndex
 * @param {int} maxMediaIndex
 */
export function setProgress(categoryIndex, currentMediaIndex, maxMediaIndex) {
  const progresses = document.querySelectorAll(".progress");
  progresses[categoryIndex].innerHTML = `${
    currentMediaIndex + 1
  }/${maxMediaIndex}`;
}

export function setRightArrow(categoryIndex) {
  const progresses = document.querySelectorAll(".progress");
  if (progresses.length === 0) return;
  progresses[categoryIndex].innerHTML = ">";
}

/**
 * 새로 선택될 카테고리를 설정하고 언론사를 처음부터 시작
 * @param {String} newCategory
 * @param {int} index
 */
function updateCategory(newCategory, index) {
  updateNewsList(newCategory, index, state.currentMediaIndex);
}

/**
 * index만으로 새로 선택될 카테고리를 설정
 * @param {int} index
 */
export function updateCategoryByIndex(index) {
  const newCategory = categoryList[index];
  updateCategory(newCategory, index);
}

/**
 * nav에서 선택될 구독된 언론사 설정
 * @param {int} newCategoryIndex
 */
export function updateMyMedia(newCategoryIndex) {
  state.currentCategoryIndex = newCategoryIndex;
  updateMyNewsList(state.currentCategoryIndex);
}

/**
 * li 배열에 선택된 node에 selected class추가
 * @param {node Array} navElementNodes
 */
export function updateNavElements(navElementNodes) {
  navElementNodes.forEach((element, index) => {
    if (index === state.currentCategoryIndex) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
}

/**
 * newsList interval 시작 함수
 */
function startNewsInterval() {
  const navElementNodes = document.querySelectorAll(".contentList li");
  startInterval(
    "news",
    navElementNodes,
    state,
    categoryList,
    updateNavElements,
    updateNewsList
  );
}

/**
 * myList interval 시작 함수
 */
function startMyNewsInterval() {
  const navElementNodes = document.querySelectorAll(".contentList li");
  startInterval(
    "my",
    navElementNodes,
    state,
    updateNavElements,
    updateMyNewsList
  );
}

function resetInterval() {
  stopInterval("news");
  stopInterval("my");
}
