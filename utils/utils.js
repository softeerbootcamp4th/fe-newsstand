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

export function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayName = days[today.getDay()];

  return `${year}.${month}.${date}.${dayName}`;
}
