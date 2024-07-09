import { getSubscribeList } from "../../util/getSubscribeList.js";
import { allNews } from "../news/allNews/allNews.js";
import { isSubscribe } from "./isSubscribe.js";

/**
 * 구독하기 버튼을 누르면 해당 언론사를 구독하는 함수
 */
export const removeSubscribe = () => {
  const subscribeBtn = document.querySelector(".subscribe-btn");
  subscribeBtn.addEventListener("click", handleClickSubscribeBtn);
};

const handleClickSubscribeBtn = () => {
  let { brandId, cateIdx, brandIdx } =
    document.querySelector(".press-news").dataset;

  [brandId, cateIdx, brandIdx] = [brandId, cateIdx, brandIdx].map(Number);

  // 중복 구독 시 차단
  if (isSubscribe(brandId)) {
    alert("이미 구독한 언론사입니다.");
    return;
  }

  // 로컬스토리지에 brandId 저장
  addBrandToLocalStorage(brandId);

  // 화면에 구독여부를 즉시 반영하기 위해 뉴스데이터 리렌더링
  allNews(cateIdx, brandIdx);
};

/**
 * 구독버튼을 누르면 brandId를 인자로 받아서 해당 언론사를 localStorage에 저장하는 함수
 * @param {number} brandId
 */
const addBrandToLocalStorage = (brandId) => {
  // 로컬스토리지의 subscribeList 배열을 가져옴
  let subscribeList = getSubscribeList() || [];

  // 구독한 언론사의 brandId를 subscribeList에 추가하고 로컬스토리지에 저장
  subscribeList.push(Number(brandId));
  localStorage.setItem("subscribeList", JSON.stringify(subscribeList));
};
