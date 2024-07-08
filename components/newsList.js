import { generateNode } from "../utils/utils.js";

/**
 * 언론사 별 뉴스 목록을 container하위에 생성
 * @param {Node} container
 * @param {Object} content {media: String, news: Array}
 */
export function generateNewsList(container, content) {
  const list = generateNode("ul", "newsList");

  content.news.slice(0, 6).forEach((category) => {
    const li = generateNode("li");
    li.textContent = category;
    list.appendChild(li);
  });

  createFooterElement(list, content.media);

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
