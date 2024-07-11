import store from "../global/stoageManager.js";
import state from "../global/state.js";
import {
  addMyData,
  categoryData,
  categoryList,
  mediaData,
  myList,
  removeMyDataById,
} from "../resources/data.js";
import { generateNode } from "../utils/utils.js";

//삭제할 언론사를 임시 저장할 배열
let needRemove = [];

/**
 * 구독 버튼에 이벤트 추가
 */
export function generateSubscribe() {
  const contentTitle = document.querySelector(".content_title");
  contentTitle.lastChild.remove();

  const sub = generateNode("button", "subscribe");
  contentTitle.appendChild(sub);

  needRemove = resetNeedRemove(needRemove);

  sub.innerHTML = "+ 구독하기";
  sub.addEventListener("click", addMediaToMyList);
}

/**
 * arr 배열에서 모든 id를 구독 해지하고 초기화
 * @param {Array} arr
 */
function resetNeedRemove(arr) {
  arr.forEach((element) => removeMediaFromMyList(element));
  arr = [];

  return arr;
}

/**
 * 구독 버튼 로직
 * 로컬 스토리지에 myList 배열에 구독한 언론사를 id로 저장
 * myData에 객체 자체를 저장
 */
function addMediaToMyList() {
  const medaiId =
    categoryData[categoryList[state.currentCategoryIndex]][
      state.currentMediaIndex
    ];

  store.addItemToSet("myList", medaiId);
  addMyData(mediaData[medaiId]);
}

/**
 * 구독해지 버튼에 이벤트 추가
 */
export function generateUnsubscribe() {
  const contentTitle = document.querySelector(".content_title");
  contentTitle.lastChild.remove();

  const sub = generateNode("button", "subscribe");
  contentTitle.appendChild(sub);

  sub.innerHTML = "구독 해지";
  sub.addEventListener("click", () =>
    saveRemoveList(myList[state.currentCategoryIndex])
  );
}

/**
 * 구독해지 버튼 로직
 * @param {String} mediaId
 */
function removeMediaFromMyList(mediaId) {
  store.removeItemFromSet("myList", mediaId);
  removeMyDataById(mediaData[mediaId].media);
}

/**
 * 삭제할 media id를 임시 저장
 * @param {String} mediaId
 */
function saveRemoveList(mediaId) {
  needRemove.push(mediaId);
}
