import { getSubscribeList } from "../../util/getSubscribeList.js";
import { isSubscribe } from "./isSubscribe.js";

/**
 * 이미 구독한 언론사라면 x버튼을, 그렇지 않다면 구독하기 버튼을 렌더링 하는 함수
 *
 * @param {number} brandId
 */

export const renderSubscribeBtn = (brandId) => {
  const pressInfo = document.querySelector(".press-info");
  const subscribeBtn = pressInfo.querySelector(".subscribe-btn");
  const removeSubscribeBtn = pressInfo.querySelector(".remove-subscribe-btn");

  // 이미 구독한 언론사라면
  if (isSubscribe(brandId)) {
    subscribeBtn.classList.add("hidden");
    removeSubscribeBtn.classList.remove("hidden");
  } else {
    removeSubscribeBtn.classList.add("hidden");
    subscribeBtn.classList.remove("hidden");
  }
};
