import { CONTENTS_BY_CATEGORY } from "../static/data/media.js";
import {
    REMOVE_TOTAL_ARROW,
    REMOVE_TOTAL_CATEGORY,
    removeMediaCategoryEvent,
    removeMediaArrowEvent
} from "../utils/events.js";
import { 
    getSelectedCategoryItemDOMString, 
    getUnselectedCategoryItemDOMString,
    getSelectedCategoryContentsDOMString,
    setSubscribeButtonEvent,
} from "./util.js";

const DEFAULT_CATEGORY_INDEX = 0;
const DEFAULT_MEDIA_INDEX = 0;

/**
 * @description 전체 언론사를 렌더링하는 함수
 */
export function renderTotalMedia() {
    renderMedia(DEFAULT_CATEGORY_INDEX, DEFAULT_MEDIA_INDEX);
}

/**
 * @description 미디어 카테고리, 콘텐츠를 렌더링하는 함수
 */
function renderMedia(categoryIdx, mediaIdx) {
    const category = CONTENTS_BY_CATEGORY.data;
    const categoryListDOM = document.querySelector(".media-contents__category-list");

    /**
     * 미디어 카테고리 렌더링
     */
    let categoryListDOMString = ''
    category.forEach((_category, _categoryIdx) => {
        if (_categoryIdx === categoryIdx) {
            /**
             * 선택된 카테고리인 경우
             */
            categoryListDOMString += getSelectedCategoryItemDOMString(_category.categoryName, categoryIdx, mediaIdx, _category.length);
        } else {
            /**
             * 선택되지 않은 카테고리인 경우
             */
            categoryListDOMString += getUnselectedCategoryItemDOMString(_category.categoryName, _categoryIdx);
        }
    });
    categoryListDOM.innerHTML = categoryListDOMString;
    const progressAnimationDOM = document.querySelector(".media-contents__category-item-background");
    progressAnimationDOM.addEventListener("animationiteration", navigateNextMedia);

    /**
     * 카테고리 이벤트 초기화 후 이벤트 리스너 등록
     */
    document.addEventListener(REMOVE_TOTAL_CATEGORY, () => categoryListDOM.removeEventListener('click', clickCategoryList));
    document.dispatchEvent(removeMediaCategoryEvent);
    categoryListDOM.addEventListener('click', clickCategoryList);

    /**
     * 선택된 카테고리의 콘텐츠 렌더링
     */
    const contentsBoxDOM = document.querySelector(".media-contents__contents-box");
    const contentsString = getSelectedCategoryContentsDOMString(category[categoryIdx].media[mediaIdx]);
    contentsBoxDOM.innerHTML = contentsString;

    setSubscribeButtonEvent(CONTENTS_BY_CATEGORY.data[categoryIdx].media[mediaIdx], () => renderMedia(categoryIdx, mediaIdx));

    /**
     * prev, next 버튼 클릭 시 언론사 이동 이벤트
     */
    const prevMediaButton = document.querySelector(".media-contents__left-button");
    const nextMediaButton = document.querySelector(".media-contents__right-button");

    function resetNavigationButton() {
        prevMediaButton.removeEventListener("click", navigatePrevMedia);
        nextMediaButton.removeEventListener("click", navigateNextMedia);
    }
    document.addEventListener(REMOVE_TOTAL_ARROW, resetNavigationButton)
    document.dispatchEvent(removeMediaArrowEvent);

    prevMediaButton.addEventListener("click", navigatePrevMedia);
    nextMediaButton.addEventListener("click", navigateNextMedia);
}

/**
 * @description 카테고리를 클릭했을 때 해당 카테고리로 이동하는 함수
 */
function clickCategoryList(e) {
    /**
     * category list DOM을 클릭하면 리스트 아이템으로 이벤트 위임이 되고, 해당 리스트 아이템 카테고리로 이동
     */
    const categoryIdx = parseInt(e.target.dataset.categoryIdx);
    if (isNaN(categoryIdx)) {
        /**
         * 잘못된 영역을 클릭한 경우
         */
        return;
    }

    renderMedia(categoryIdx, 0);
}

/**
 * @description 다음 페이지로 이동하는 함수
 */
function navigateNextMedia() {
    clickNavigationButton(1);
}
/**
 * @description 이전 페이지로 이동하는 함수
 */
function navigatePrevMedia() {
    clickNavigationButton(-1);
}

/**
 * @description prev, next 버튼 클릭 동작을 수행하는 함수
 */
function clickNavigationButton(step) {
    const selectedCategory = document.querySelector(".media-contents__category-item--selected");

    const selectedCategoryIdx = parseInt(selectedCategory.dataset.selectedCategoryIdx);
    const selectedMediaIdx = parseInt(selectedCategory.dataset.selectedMediaIdx);

    const category = CONTENTS_BY_CATEGORY.data;
    const currentCategory = category[selectedCategoryIdx];

    /**
     * 이전/다음 언론사 콘텐츠로 이동
     */
    const nextMediaIdx = selectedMediaIdx + step;
    if (nextMediaIdx >= 0 && nextMediaIdx < currentCategory.length) {
        selectedCategory.dataset.selectedMediaIdx = nextMediaIdx;
    } else if (nextMediaIdx < 0) {
        const prevCategoryIdx = selectedCategoryIdx - 1;
        if (prevCategoryIdx < 0) {
            /**
             * 첫 카테고리에 다다른 경우 마지막 카테고리로 이동
             */
            const categoryIdx = CONTENTS_BY_CATEGORY.length - 1;
            selectedCategory.dataset.selectedCategoryIdx = categoryIdx;
            selectedCategory.dataset.selectedMediaIdx = category[categoryIdx].length - 1;
        } else {
            selectedCategory.dataset.selectedCategoryIdx = prevCategoryIdx;
            selectedCategory.dataset.selectedMediaIdx = category[prevCategoryIdx].length - 1;
        }
    } else if (nextMediaIdx === currentCategory.length) {
        const nextCategoryIdx = selectedCategoryIdx + 1;
        if (nextCategoryIdx === CONTENTS_BY_CATEGORY.length) {
            /**
             * 마지막 카테고리에 다다른 경우 첫 카테고리로 이동
             */
            selectedCategory.dataset.selectedCategoryIdx = 0;
            selectedCategory.dataset.selectedMediaIdx = 0;
        } else {
            selectedCategory.dataset.selectedCategoryIdx = nextCategoryIdx;
            selectedCategory.dataset.selectedMediaIdx = 0;
        }
    }

    const categoryIdxNumber = parseInt(selectedCategory.dataset.selectedCategoryIdx);
    const mediaIdxNumber = parseInt(selectedCategory.dataset.selectedMediaIdx);
    renderMedia(categoryIdxNumber, mediaIdxNumber);
}
