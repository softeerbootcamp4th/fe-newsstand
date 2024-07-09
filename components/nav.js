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

const myList = ["언론사1", "언론사5", "언론사9", "언론사11", "언론사12"];

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
    clearInterval(newsInterval);
    clearInterval(myInterval);

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

function generateNavForNewsList() {
  updateNewsList(
    categoryList[currentCategoryIndex],
    currentCategoryIndex,
    currentMediaIndex
  );

  const categoryElements = document.querySelectorAll(".contentList li");

  categoryElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      categoryElements[currentCategoryIndex].classList.remove("selected");
      element.classList.add("selected");
      currentCategoryIndex = index;

      clearInterval(newsInterval);
      clearInterval(myInterval);
      startNewsInterval();

      updateCategory(categoryList[index], currentCategoryIndex);
    });
  });
  startNewsInterval();
}
function generateNavForMyList() {
  updateMyNewsList(currentCategoryIndex);

  const categoryElements = document.querySelectorAll(".contentList li");

  categoryElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      categoryElements[currentCategoryIndex].classList.remove("selected");
      element.classList.add("selected");
      currentCategoryIndex = index;

      clearInterval(newsInterval);
      clearInterval(myInterval);
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
 * 20초 마다 categoryList의 다음 요소로 넘김
 */
function startNewsInterval() {
  newsInterval = setInterval(() => {
    const categoryElements = document.querySelectorAll(".contentList li");
    currentMediaIndex++;
    if (
      currentMediaIndex >= getMaxMediaIndex(categoryList[currentCategoryIndex])
    ) {
      currentCategoryIndex = (currentCategoryIndex + 1) % categoryList.length;
      categoryElements.forEach((element, index) => {
        if (index === currentCategoryIndex) {
          element.classList.add("selected");
        } else {
          element.classList.remove("selected");
        }
      });

      updateCategory(categoryList[currentCategoryIndex], currentCategoryIndex);
    } else {
      updateNewsList(
        categoryList[currentCategoryIndex],
        currentCategoryIndex,
        currentMediaIndex
      );
    }
  }, 20000);
}

function startMyNewsInterval() {
  myInterval = setInterval(() => {
    const categoryElements = document.querySelectorAll(".contentList li");
    currentCategoryIndex++;
    if (currentCategoryIndex >= getMyDataLength())
      currentCategoryIndex = currentCategoryIndex % getMyDataLength();
    categoryElements.forEach((element, index) => {
      if (index === currentCategoryIndex) {
        element.classList.add("selected");
      } else {
        element.classList.remove("selected");
      }
    });
    updateMyNewsList(currentCategoryIndex);
  }, 20000);
}
