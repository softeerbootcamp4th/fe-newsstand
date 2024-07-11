import { removeBannerInterval, startBannerInterval } from "../list/list.js";
import { generateNode } from "../utils/utils.js";
/**
 * content를 롤링하는 배너를 container의 child로 생성
 * @param {Node} container
 * @param {Object} content {media: String, news: Array}
 */
export function generateBanner(container, content) {
  const listContainer = generateNode("div", "listContainer");
  container.appendChild(listContainer);

  const bannerList = generateNode("ul", "bannerList");
  listContainer.appendChild(bannerList);
  bannerList.addEventListener("mouseover", removeBannerInterval);
  bannerList.addEventListener("mouseleave", startBannerInterval);

  content.news.forEach((element) => {
    const elementContainer = generateNode("li");
    createBannerElement(elementContainer, content, element);

    bannerList.appendChild(elementContainer);
  });

  animationInit(bannerList);
}

/**
 * 애니메이션 초기값 설정
 * 하위 li에 prev, current, next class 추가
 * @param {Node} list list node
 */
function animationInit(list) {
  const classes = ["prev", "current", "next"];
  for (let i = 0; i < list.children.length && i < classes.length; i++) {
    list.children[i].classList.add(classes[i]);
  }
}

/**
 * container에 media와 news span을 만들어 채움
 * @param {Node} container 부착될 node
 * @param {Object} content {media: String, news: Array}
 * @param {String} element 선택된 뉴스
 */
function createBannerElement(container, content, element) {
  const media = generateNode("p", "banner_media");
  const news = generateNode("p", "banner_news");

  media.textContent = content.media;
  news.textContent = element;

  container.appendChild(media);
  container.appendChild(news);
}
