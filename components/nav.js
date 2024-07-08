import { generateNode } from "../utils/utils.js";

/**
 * Nav목록으로 네비게이션 바를 container의 child로 생성
 * @param {Node} container Nav가 붙을 돔 객체
 * @param {Array} categoryList Nav 목록
 */
export function generateNav(container, categoryList) {
  const nav = generateNode("nav", "content_navigator");
  const ul = generateNode("ul", "contentList");

  categoryList.forEach((category) => {
    const li = generateNode("li");
    ul.appendChild(li);

    createNavElement(li, category);
  });

  nav.appendChild(ul);
  container.appendChild(nav);
}

/**
 * container에 category와 progress node를 추가함
 * @param {Node} container
 * @param {String} category
 */
function createNavElement(container, category) {
  const textContent = generateNode("span");
  textContent.textContent = category;
  container.appendChild(textContent);

  const progress = generateNode("span", "progress");
  container.appendChild(progress);
}
