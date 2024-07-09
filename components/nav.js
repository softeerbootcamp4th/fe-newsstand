import { deleteNodeById, generateNode } from "../utils/utils.js";
import { getMyDataLength, updateMyNewsList } from "./myNewsList.js";
import { getMaxMediaLength, updateNewsList } from "./newsList.js";

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
let headerCategory = 0;

/**
 * Nav목록으로 네비게이션 바를 container의 child로 생성 후 초기화
 * @param {Node} container Nav가 붙을 돔 객체
 * @param {Array} currentHeaderCategoryIndex Nav에 보여질 현재 선택된 리스트
 */
export function generateNav(container, currentHeaderCategoryIndex) {
  let selectedList;
  if (currentHeaderCategoryIndex === 0) {
    selectedList = categoryList;
    headerCategory = 0;
  } else if (currentHeaderCategoryIndex === 1) {
    selectedList = myList;
    headerCategory = 1;
  }

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
function generateNavForNewsList() {
  updateNewsList(
    categoryList[currentCategoryIndex],
    currentCategoryIndex,
    currentMediaIndex
  );

  const navElementNodes = document.querySelectorAll(".contentList li");

  setupNavElements(navElementNodes, startNewsInterval, updateCategoryByIndex);

  startNewsInterval();
}

/**
 * 구독 newsList를 생성하는 함수
 */
function generateNavForMyList() {
  updateMyNewsList(currentCategoryIndex);

  const navElementNodes = document.querySelectorAll(".contentList li");

  setupNavElements(navElementNodes, startMyNewsInterval, updateMyMedia);

  startMyNewsInterval();
}

/**
 * navElementNodes에 이벤트 리스너를 추가하고 Interval 을 시작하는 함수
 */
function setupNavElements(
  navElementNodes,
  intervalStartFunction,
  updateFunction
) {
  navElementNodes.forEach((element, index) => {
    element.addEventListener("click", function () {
      navElementNodes[currentCategoryIndex].classList.remove("selected");
      element.classList.add("selected");
      currentCategoryIndex = index;

      resetInterval();
      intervalStartFunction();

      updateFunction(currentCategoryIndex);
    });
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

export function setRightArrow(currentCategoryIndex) {
  const progresses = document.querySelectorAll(".progress");
  progresses[currentCategoryIndex].innerHTML = ">";
}

/**
 * 새로 선택될 카테고리를 설정하고 언론사를 처음부터 시작
 * @param {String} newCategory
 * @param {int} currentCategoryIndex
 */
function updateCategory(newCategory, index) {
  updateNewsList(newCategory, index, currentMediaIndex);
}

/**
 * index만으로 새로 선택될 카테고리를 설정
 * @param {int} index
 */
function updateCategoryByIndex(index) {
  const newCategory = categoryList[index];
  updateCategory(newCategory, index);
}

/**
 * nav에서 선택될 구독된 언론사 설정
 * @param {int} newCategoryIndex
 */
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
    currentMediaIndex >= getMaxMediaLength(categoryList[currentCategoryIndex])
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

const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");

leftButton.addEventListener("click", movePrevNewsMedia);
rightButton.addEventListener("click", moveNextNewsMedia);

/**
 * 왼쪽 화살표 이동 함수
 */
function movePrevNewsMedia() {
  const navElementNodes = document.querySelectorAll(".contentList li");
  resetCover();

  if (headerCategory === 0) handleNewsMovePrev(navElementNodes);
  else if (headerCategory === 1) handleMyMovePrev(navElementNodes);
}

/**
 * newsList 일 때 왼쪽 이동
 * @param {node Array} navElementNodes
 */
function handleNewsMovePrev(navElementNodes) {
  currentMediaIndex--;

  if (currentMediaIndex < 0) {
    currentCategoryIndex--;

    if (currentCategoryIndex < 0)
      currentCategoryIndex = categoryList.length - 1;

    currentMediaIndex =
      getMaxMediaLength(categoryList[currentCategoryIndex]) - 1;
  }

  updateNavElements(navElementNodes);
  updateCategoryByIndex(currentCategoryIndex);
}

/**
 * myList 일 때 왼쪽 이동
 * @param {node Array} navElementNodes
 */
function handleMyMovePrev(navElementNodes) {
  currentCategoryIndex--;
  if (currentCategoryIndex < 0) currentCategoryIndex = myList.length - 1;

  updateNavElements(navElementNodes);
  updateMyMedia(currentCategoryIndex);
}

/**
 * 오른쪽 화살표 이동 함수
 */
function moveNextNewsMedia() {
  const navElementNodes = document.querySelectorAll(".contentList li");
  resetCover();

  if (headerCategory === 0) handleNewsMoveNext(navElementNodes);
  else if (headerCategory === 1) handleMyMoveNext(navElementNodes);
}

/**
 * newsList 일 때 오른쪽 이동
 * @param {node Array} navElementNodes
 */
function handleNewsMoveNext(navElementNodes) {
  currentMediaIndex++;

  if (
    currentMediaIndex >
    getMaxMediaLength(categoryList[currentCategoryIndex]) - 1
  ) {
    currentCategoryIndex++;

    if (currentCategoryIndex > categoryList.length - 1)
      currentCategoryIndex = 0;

    currentMediaIndex = 0;
  }

  updateNavElements(navElementNodes);
  updateCategoryByIndex(currentCategoryIndex);
}

/**
 * myList 일 때 오른쪽 이동
 * @param {node Array} navElementNodes
 */
function handleMyMoveNext(navElementNodes) {
  currentCategoryIndex++;

  if (currentCategoryIndex > myList.length - 1) currentCategoryIndex = 0;

  updateNavElements(navElementNodes);
  updateMyMedia(currentCategoryIndex);
}

/**
 * 페이지가 넘어갈 때 progress animation을 재시작
 */
function resetCover() {
  const cover = document.querySelector(".contentList li.selected .cover");
  cover.classList.remove("cover");
  void cover.offsetWidth;
  cover.classList.add("cover");
}
