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

/**
 * id를 가진 node 비우기
 * @param {String} id
 * @returns 빈 node
 */
export function deleteNodeById(id) {
  const node = document.getElementById(id);
  node.innerHTML = "";

  return node;
}

/**
 * 오늘 날짜를 리턴함
 * @returns "yyyy.mm.dd.요일"
 */
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
