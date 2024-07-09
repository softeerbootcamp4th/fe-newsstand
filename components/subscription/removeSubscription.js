import { brandData } from "../../data/brandData.js";
import { getSubscribeList } from "../../util/getSubscribeList.js";
import { fieldTab } from "../fieldTab/fieldTab.js";
import { allNews } from "../news/allNews/allNews.js";
import { renderToast } from "../toast/renderToast.js";
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
export const removeSubscribe = () => {
  const removeSubscribeBtn = document.querySelector(".remove-subscribe-btn");
  removeSubscribeBtn.addEventListener("click", renderRemoveModal);
};

/**
 * 구독해지 모달 UI를 렌더링
 *
 */
const renderRemoveModal = () => {
  let { brandId, cateIdx, brandIdx } =
    document.querySelector(".press-news").dataset;
  [brandId, cateIdx, brandIdx] = [brandId, cateIdx, brandIdx].map(Number);
  const modalOverlay = document.querySelector(".remove-subscribe-overlay");
  const modal = document.querySelector(".remove-subscribe-modal");
  modal.innerHTML = `
                <div
                  class="remove-text-wrap surface-default display-medium16 border-default-left border-default-top"
                >
                  <span><strong>${brandData[brandId].brandName}</strong> 을(를)</span> 
                  <span>구독해지하시겠습니까?</span>
                </div>
                <div class="flex-center">
                  <button class="yes-remove-btn border-default-left border-default-top pointer surface-alt available-medium16 text-default">
                    예, 해지합니다</button
                  ><button class="no-remove-btn border-default-left border-default-top pointer surface-alt available-medium16 text-default">
                    아니오
                  </button>
                </div>
  `;

  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");

  const yesSubscribeBtn = modal.querySelector(".yes-remove-btn");
  const noSubscribeBtn = modal.querySelector(".no-remove-btn");
  yesSubscribeBtn.addEventListener("click", () =>
    handleClickYesRemove(brandId, cateIdx, brandIdx, modal, modalOverlay)
  );
  noSubscribeBtn.addEventListener("click", () =>
    handleClickNoRemove(modal, modalOverlay)
  );

  modalOverlay.addEventListener("click", () =>
    handleClickNoRemove(modal, modalOverlay)
  );
};

/**
 *
 * 로컬스토리지에서 구독 해지된 언론사의 brandId 삭제
 *
 * @param {number} brandId
 */
const handleClickYesRemove = (
  brandId,
  cateIdx,
  brandIdx,
  modal,
  modalOverlay
) => {
  let subscribeList = getSubscribeList();

  // 구독 해지한 언론사가 삭제된 배열
  let removedList = subscribeList.filter(
    (it) => Number(it) !== Number(brandId)
  );
  localStorage.setItem("subscribeList", JSON.stringify(removedList));
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
  renderToast(`${brandData[brandId].brandName}을(를) 구독해지하였습니다`);

  // 구독 해지를 적용한 화면을 바로 렌더링 해주어야 함
  if (cateIdx === -1) fieldTab("subscribeTabPress");
  else allNews(cateIdx, brandIdx);
};

/**
 * 구독 해지 모달에서 아니오를 클릭 시
 * 모달을 hidden으로 바꾸는 함수
 */
const handleClickNoRemove = (modal, modalOverlay) => {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};
