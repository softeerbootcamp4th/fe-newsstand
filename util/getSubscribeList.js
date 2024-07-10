/**
 * 로컬스토리지에서 구독 리스트 받아오는 함수
 *
 * @returns {Number[]} 구독된 언론사들의 brandId가 담긴 배열
 */
export const getSubscribeList = () =>
  JSON.parse(localStorage.getItem("subscribeList")) || [];
