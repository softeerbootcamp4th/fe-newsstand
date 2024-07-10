import store from "../utils/stoageManager.js";
import state from "../list/state.js";
import {
  addMyData,
  categoryData,
  categoryList,
  mediaData,
  myList,
  removeMyDataById,
} from "../resources/data.js";

let needRemove = [];

/**
 * 구독 버튼에 이벤트 추가
 */
export function generateSubscribe() {
  const contentTitle = document.querySelector(".content_title");
  contentTitle.lastChild.remove();
  const sub = document.createElement("button");
  sub.classList.add("subscribe");
  contentTitle.appendChild(sub);

  needRemove.forEach((element) => removeMediaFromMyList(element));
  needRemove = [];

  sub.innerHTML = "+ 구독하기";
  sub.addEventListener("click", addMediaToMyList);
}

/**
 * 구독 버튼 로직
 */
function addMediaToMyList() {
  store.addItemToSet(
    "myList",
    categoryData[categoryList[state.currentCategoryIndex]][
      state.currentMediaIndex
    ]
  );
  addMyData(
    mediaData[
      categoryData[categoryList[state.currentCategoryIndex]][
        state.currentMediaIndex
      ]
    ]
  );
}

/**
 * 구독해지 버튼에 이벤트 추가
 */
export function generateUnsubscribe() {
  const contentTitle = document.querySelector(".content_title");
  contentTitle.lastChild.remove();
  const sub = document.createElement("button");
  sub.classList.add("subscribe");
  contentTitle.appendChild(sub);

  sub.innerHTML = "구독 해지";
  sub.addEventListener("click", () =>
    saveRemoveList(myList[state.currentCategoryIndex])
  );
}

/**
 * 구독해지 버튼 로직
 */
function removeMediaFromMyList(id) {
  store.removeItemFromSet("myList", id);
  removeMyDataById(mediaData[id].media);
}

function saveRemoveList(id) {
  needRemove.push(id);
}
