import { deleteNodeById, generateNode } from "../utils/utils.js";
import { generateNewsList, updateNewsList } from "./newsList.js";

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

var intervalId; //왜 전역변수로 설정해야 작동하는가??
let currentCategoryIndex = 0;
let currentMediaIndex = 0;

/**
 * Nav목록으로 네비게이션 바를 container의 child로 생성 후 초기화
 * @param {Node} container Nav가 붙을 돔 객체
 * @param {Array} categoryList Nav 목록
 */
export function generateNav(container, currentHeaderCategoryIndex) {
  let category;
  if (currentHeaderCategoryIndex === 0) category = categoryList;
  else if (currentHeaderCategoryIndex === 1) category = myList;

  const nav = generateNode("nav", "content_navigator");
  const ul = generateNode("ul", "contentList");

  categoryList.forEach((category, index) => {
    const li = generateNode("li");
    ul.appendChild(li);

    createNavElement(li, category);
    if (index === 0) li.classList.add("selected");
  });

  nav.appendChild(ul);
  container.appendChild(nav);

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
      updateCategory(categoryList[index]);

      clearInterval(intervalId);
      startInterval();
    });
  });
  startInterval();
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
 * @param {int} mediaIndex
 * @param {int} maxMediaIndex
 */
export function setProgress(categoryIndex, mediaIndex, maxMediaIndex) {
  const progresses = document.querySelectorAll(".progress");
  progresses[categoryIndex].innerHTML = `${mediaIndex + 1}/${maxMediaIndex}`;
}

/**
 * 새로 변경될 카테고리를 설정하고 언론사를 처음부터 시작
 * @param {String} newCategory
 */
export function updateCategory(newCategory) {
  const newMediaIndex = 0;
  updateNewsList(newCategory, currentCategoryIndex, newMediaIndex);
}

/**
 * 20초 마다 언론사 넘김
 */
function startInterval() {
  intervalId = setInterval(() => {
    const categoryElements = document.querySelectorAll(".contentList li");
    currentMediaIndex++;
    if (currentMediaIndex >= 2) {
      currentCategoryIndex = (currentCategoryIndex + 1) % categoryList.length;
      categoryElements.forEach((element, index) => {
        if (index === currentCategoryIndex) {
          element.classList.add("selected");
        } else {
          element.classList.remove("selected");
        }
      });

      updateCategory(categoryList[currentCategoryIndex]);
    } else {
      updateNewsList(
        categoryList[currentCategoryIndex],
        currentCategoryIndex,
        currentMediaIndex
      );
    }
  }, 20000);
}
