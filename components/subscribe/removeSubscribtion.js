import { subscribeData } from "../../data/subscribeData.js";
import { getSubscribeList } from "../../util/getSubscribeList.js";
import { allNews } from "../news/allNews/allNews.js";
import { isSubscribe } from "./isSubscribe.js";

/**
 * 구독해지 모달을 렌더링하고 해지 버튼을 누르면 구독을 해지하는 함수
 */

// 1. 구독해지 모달 UI 렌더링
//  1-1. 해지하기나 취소 버튼 클릭 시 모달 닫히도록 hidden 조작
// 2. 해지하기 버튼에 이벤트리스너 부착
// 3. 이벤트 발생 시 로컬스토리지에서 해당 brandId를 삭제
// 4. 토스트 UI 렌더링
// 5. 화면에 구독 해지를 즉시 반영 해야함
//  5-1. [전체 / 구독] 탭을 구분해야함 -> cateId === -1 이라면 전체탭
//  5-1. 만약 전체언론사 탭이라면 allNews 호출
//  5-2. 만약 구독 탭이라면 FieldTab 호출
export const removeSubscribtion = () => {
  const removeSubscribeBtn = document.querySelector(".remove-subscribe-btn");
  removeSubscribeBtn.addEventListener("click", renderModal);
};

/**
 * 구독해지 모달 UI를 렌더링
 *
 */
const renderModal = () => {
  const brandId = Number(document.querySelector(".press-news").dataset.brandId);

  // 임시방편으로 confirm 사용
  let brandName = subscribeData[brandId].brandName;
  confirm(`${brandName}을 구독 해지하시겠습니까?`) &&
    handleClickRemove(brandId);
};

/**
 *
 * 로컬스토리지에서 구독 해지된 언론사의 brandId 삭제
 *
 * @param {number} brandId
 */
const handleClickRemove = (brandId) => {
  let subscribeList = getSubscribeList();

  // 구독 해지한 언론사가 삭제된 배열
  let removedList = subscribeList.filter(
    (it) => Number(it) !== Number(brandId)
  );
  localStorage.setItem("subscribeList", JSON.stringify(removedList));
};
