/**
 * html tag에 className을 붙여 생성함
 * @param {String} tagName
 * @param {String} className null 이면 class 추가 안함
 * @returns 생성한 node
 */
export function generateNode(tagName, className) {
  const node = document.createElement(tagName);

  if (className) {
    node.classList.add(className);
  }

  return node;
}
