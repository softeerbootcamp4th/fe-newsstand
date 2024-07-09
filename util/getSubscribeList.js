/**
 * 로컬스토리지에서 구독 리스트 받아오는 함수
 *
 * @returns {dsadf}
 */
export const getSubscribeList = () =>
  JSON.parse(localStorage.getItem("subscribeList"));
