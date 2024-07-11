import { deleteNodeById, generateNode } from "../../utils/utils.js";
import { setProgress } from "./nav.js";
import {
  categoryData,
  getMediaLength,
  mediaData,
} from "../../resources/data.js";
import "./carousel.js";

/**
 * 언론사 별 뉴스 목록을 container하위에 생성
 * @param {Node} container
 * @param {Object} content {media: String, news: Array}
 */
function generateNewsList(container, content) {
  const list = generateNode("ul", "newsList");

  mediaData[content].news.slice(0, 6).forEach((category) => {
    const li = generateNode("li");
    li.textContent = category;
    list.appendChild(li);
  });

  createFooterElement(list, mediaData[content].media);

  container.appendChild(list);
}

/**
 * media 에서 편집한 뉴스임을 알려주는 li 를 container하위에 생성
 * @param {Node} container
 * @param {String} media 언론사
 */
function createFooterElement(container, media) {
  const footer = generateNode("li", "newsList_footer");
  footer.textContent = `${media} 언론사에서 직접 편집한 뉴스입니다.`;
  container.appendChild(footer);
}

/**
 * 바뀐 카테고리에 맞게 newsList 업데이트
 * @param {String} category
 * @param {int} currentCategoryIndex
 * @param {int} currentMediaIndex
 */
export function updateNewsList(
  category,
  currentCategoryIndex,
  currentMediaIndex
) {
  const newsListContainer = deleteNodeById("newsList_container");
  const mediaList = categoryData[category].map(
    (element) => mediaData[element].media
  );
  const contentList = categoryData[category];

  setProgress(
    currentCategoryIndex,
    currentMediaIndex,
    getMediaLength(category)
  );

  setMedia(mediaList, currentMediaIndex);

  generateNewsList(newsListContainer, contentList[currentMediaIndex]);
}

/**
 * 언론사 목록과 현재 언론사 index를 받아 언론사 이름 출력
 * @param {Array} mediaList
 * @param {int} mediaIndex
 */
function setMedia(mediaList, mediaIndex) {
  const currentMedia = document.querySelector(".media");
  currentMedia.innerHTML = mediaList[mediaIndex];
}
