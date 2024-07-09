import { deleteNodeById, generateNode } from "../utils/utils.js";
import { getMyDataLength, updateMyNewsList } from "./myNewsList.js";
import { getMaxMediaIndex, updateNewsList } from "./newsList.js";

const categoryList = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const myList = ["언론사1", "언론사2", "언론사9", "언론사11", "언론사12"];

var newsInterval; //왜 전역변수로 설정해야 작동하는가??
var myInterval;
let currentCategoryIndex = 0;
let currentMediaIndex = 0;

/**
 * Nav목록으로 네비게이션 바를 container의 child로 생성 후 초기화
 * @param {Node} container Nav가 붙을 돔 객체
 * @param {Array} currentHeaderCategoryIndex Nav에 보여질 현재 선택된 리스트
 */
export function generateNav(container, currentHeaderCategoryIndex) {
  let selectedList;
  if (currentHeaderCategoryIndex === 0) selectedList = categoryList;
  else if (currentHeaderCategoryIndex === 1) selectedList = myList;

  navInit(selectedList);

  if (currentHeaderCategoryIndex === 0) generateNavForNewsList();
  else if (currentHeaderCategoryIndex === 1) generateNavForMyList();

  function navInit(selectedList) {
    currentCategoryIndex = 0;
    currentMediaIndex = 0;
    resetInterval();

    const nav = generateNode("nav", "content_navigator");
    const ul = generateNode("ul", "contentList");

    selectedList.forEach((category, index) => {
      const li = generateNode("li");
      ul.appendChild(li);

      createNavElement(li, category);
      if (index === currentCategoryIndex) li.classList.add("selected");
    });

    nav.appendChild(ul);
    container.appendChild(nav);
  }
}

/**
 * newsList를 생성하는 함수
 */
function generateNavForNewsList() {
  updateNewsList(
    categoryList[currentCategoryIndex],
    currentCategoryIndex,
    currentMediaIndex
  );

  const navElementNodes = document.querySelectorAll(".contentList li");

  navElementNodes.forEach((element, index) => {
    element.addEventListener("click", function () {
      navElementNodes[currentCategoryIndex].classList.remove("selected");
      element.classList.add("selected");
      currentCategoryIndex = index;

      resetInterval();
      startNewsInterval();

      updateCategory(categoryList[index], currentCategoryIndex);
    });
  });
  startNewsInterval();
}

/**
 * 구독 newsList를 생성하는 함수
 */
function generateNavForMyList() {
  updateMyNewsList(currentCategoryIndex);

  const navElementNodes = document.querySelectorAll(".contentList li");

  navElementNodes.forEach((element, index) => {
    element.addEventListener("click", function () {
      navElementNodes[currentCategoryIndex].classList.remove("selected");
      element.classList.add("selected");
      currentCategoryIndex = index;

      resetInterval();
      startMyNewsInterval();

      updateMyMedia(currentCategoryIndex);
    });
  });
  startMyNewsInterval();
}

/**
 * Nav 비우는 함수
 */
export function deleteNav() {
  deleteNodeById("nav_container");
}

/**
 * container에 cover, category, progress node를 추가함
 * @param {Node} container
 * @param {String} category
 */
export function createNavElement(container, category) {
  const progressBar = generateNode("div", "cover");
  container.appendChild(progressBar);

  const textContent = generateNode("span");
  textContent.textContent = category;
  container.appendChild(textContent);

  const progress = generateNode("span", "progress");
  container.appendChild(progress);
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

export function setRightArrow(currentCategoryIndex) {
  const progresses = document.querySelectorAll(".progress");
  progresses[currentCategoryIndex].innerHTML = ">";
}

/**
 * 새로 변경될 카테고리를 설정하고 언론사를 처음부터 시작
 * @param {String} newCategory
 * @param {int} currentCategoryIndex
 */
export function updateCategory(newCategory, currentCategoryIndex) {
  currentMediaIndex = 0;
  updateNewsList(newCategory, currentCategoryIndex, currentMediaIndex);
}

function updateMyMedia(newCategoryIndex) {
  currentCategoryIndex = newCategoryIndex;
  updateMyNewsList(currentCategoryIndex);
}

/**
 * li 배열에 선택된 node에 selected class추가
 * @param {node Array} navElementNodes
 */
function updateNavElements(navElementNodes) {
  navElementNodes.forEach((element, index) => {
    if (index === currentCategoryIndex) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
}

/**
 * news List 자동 전환
 * @param {node Array} navElementNodes
 */
function handleNewsInterval(navElementNodes) {
  currentMediaIndex++;
  if (
    currentMediaIndex >= getMaxMediaIndex(categoryList[currentCategoryIndex])
  ) {
    currentCategoryIndex = (currentCategoryIndex + 1) % categoryList.length;
    currentMediaIndex = 0;
  }

  updateNavElements(navElementNodes);
  updateNewsList(
    categoryList[currentCategoryIndex],
    currentCategoryIndex,
    currentMediaIndex
  );
}

/**
 * my news List 자동 전환
 * @param {node Array} navElementNodes
 */
function handleMyInterval(navElementNodes) {
  currentCategoryIndex++;
  if (currentCategoryIndex >= getMyDataLength()) {
    currentCategoryIndex = 0;
  }

  updateNavElements(navElementNodes);
  updateMyNewsList(currentCategoryIndex);
}

/**
 * news면 newsList, my면 myList 자동 전환
 * @param {String} intervalType
 */
function startInterval(intervalType) {
  const navElementNodes = document.querySelectorAll(".contentList li");
  const isNewsInterval = intervalType === "news";
  const isMyInterval = intervalType === "my";

  if (isNewsInterval) {
    newsInterval = setInterval(
      () => handleNewsInterval(navElementNodes),
      20000
    );
  } else if (isMyInterval) {
    myInterval = setInterval(() => handleMyInterval(navElementNodes), 20000);
  }
}

/**
 * news list Interval 시작
 */
function startNewsInterval() {
  startInterval("news");
}

/**
 * my list Interval 시작
 */
function startMyNewsInterval() {
  startInterval("my");
}

/**
 * news list, my list Interval 삭제
 */
function resetInterval() {
  clearInterval(newsInterval);
  clearInterval(myInterval);
}
