import { getMediaLength, getMyListLength } from "../resources/data.js";

let newsInterval;
let myInterval;
let bannerInterval;

/**
 * media 값이 하나 증가시키고 state, nav, newslist영역을 업데이트
 * @param {node array} navElementNodes
 * @param {object} state
 * @param {array} categoryList
 * @param {function} updateNav
 * @param {function} updateContent
 */
function handleNewsInterval(
  navElementNodes,
  state,
  categoryList,
  updateNav,
  updateContent
) {
  state.currentMediaIndex++;
  if (
    state.currentMediaIndex >=
    getMediaLength(categoryList[state.currentCategoryIndex])
  ) {
    state.currentCategoryIndex =
      (state.currentCategoryIndex + 1) % categoryList.length;
    state.currentMediaIndex = 0;
  }

  updateNav(navElementNodes);
  updateContent(
    categoryList[state.currentCategoryIndex],
    state.currentCategoryIndex,
    state.currentMediaIndex
  );
}

/**
 * media 값이 하나 증가시키고 state, nav, mylist영역을 업데이트
 * @param {node array} navElementNodes
 * @param {object} state
 * @param {function} updateNav
 * @param {function} updateContent
 */
function handleMyInterval(navElementNodes, state, updateNav, updateContent) {
  state.currentCategoryIndex =
    (state.currentCategoryIndex + 1) % getMyListLength();

  updateNav(navElementNodes);
  updateContent(state.currentCategoryIndex);
}

/**
 * intervalType에 따라 handleinterval 을 콜백함수로 interval시작
 * @param {String} intervalType
 * @param {node array} navElementNodes
 * @param {object} state
 * @param {array} categoryList
 * @param {function} updateNav
 * @param {function} updateContent
 */
function startInterval(
  intervalType,
  navElementNodes,
  state,
  categoryList,
  updateNav,
  updateContent
) {
  if (intervalType === "news") {
    newsInterval = setInterval(
      () =>
        handleNewsInterval(
          navElementNodes,
          state,
          categoryList,
          updateNav,
          updateContent
        ),
      20000
    );
  } else if (intervalType === "my") {
    myInterval = setInterval(
      () => handleMyInterval(navElementNodes, state, updateNav, updateContent),
      20000
    );
  }
}

/**
 * intervalType에 맞는 interval 중단
 * @param {String} intervalType
 */
function stopInterval(intervalType) {
  if (intervalType === "news") {
    clearInterval(newsInterval);
  } else if (intervalType === "my") {
    clearInterval(myInterval);
  }
}

/**
 * banner 에니매이션 실행하는 함수
 * banner끼리 time의 간격을 두고 롤링
 * @param {int} time
 */
function rollingCallback(time) {
  const prevElements = document.querySelectorAll(".prev");
  prevElements.forEach((prev, index) => {
    setTimeout(() => {
      prev.classList.remove("prev");
    }, index * time);
  });

  const currentElements = document.querySelectorAll(".current");
  currentElements.forEach((current, index) => {
    setTimeout(() => {
      current.classList.remove("current");
      current.classList.add("prev");
    }, index * time);
  });

  const nextElements = document.querySelectorAll(".next");
  nextElements.forEach((next, index) => {
    setTimeout(() => {
      next.classList.remove("next");
      next.classList.add("current");

      let nextNext = next.nextElementSibling;
      if (!nextNext) {
        nextNext = next.parentElement.firstElementChild;
      }
      nextNext.classList.add("next");
    }, index * time);
  });
}

/**
 * 배너 롤링 interval 시작
 */
function startBannerInterval() {
  bannerInterval = setInterval(() => rollingCallback(1000), 5000);
}

/**
 * 배너 롤링 interval 중단
 */
function stopBannerInterval() {
  clearInterval(bannerInterval);
}

export { startInterval, stopInterval, startBannerInterval, stopBannerInterval };
