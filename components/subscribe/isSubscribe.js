import { getSubscribeList } from "../../util/getSubscribeList.js";

/**
 * 이미 구독한 언론사인지 확인하는 함수
 *
 * @param {number} brandId
 */

export const isSubscribe = (brandId) => {
  let subscribeList = getSubscribeList() || [];
  return subscribeList.includes(brandId);
};
