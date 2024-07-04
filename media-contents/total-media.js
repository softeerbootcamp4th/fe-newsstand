import { TOTAL_MEDIA_CATEGORY } from "../static/data/total-media-category.js";

/**
 * @description 전체 언론사를 렌더링하는 함수
 */
export function renderTotalMedia() {
    /**
     * @NOTE 기본으로 0번째 index의 카테고리, 미디어가 선택된 상태
     */
    renderMedia(0, 0);

    /**
     * prev, next 버튼 클릭 시 언론사 이동 이벤트
     */
    const prevMediaButton = document.querySelector(".media-contents__left-button");
    const nextMediaButton = document.querySelector(".media-contents__right-button");
    prevMediaButton.addEventListener("click", () => clickNavigationButton(-1));
    nextMediaButton.addEventListener("click", () => clickNavigationButton(1));
}

/**
 * @description 미디어 카테고리, 콘텐츠를 렌더링하는 함수
 */
function renderMedia(categoryIdx, mediaIdx) {
    const category = TOTAL_MEDIA_CATEGORY.data;
    const categoryListDOM = document.querySelector(".media-contents__category-list");

    /**
     * 미디어 카테고리 렌더링
     */
    categoryListDOM.innerHTML = '';
    category.forEach((_category, _categoryIdx) => {
        if (_categoryIdx === categoryIdx) {
            /**
             * 선택된 카테고리인 경우
             */
            categoryListDOM.innerHTML += getSelectedCategoryItemDOMString(category[categoryIdx], categoryIdx, mediaIdx);
        } else {
            /**
             * 선택되지 않은 카테고리인 경우
             */
            categoryListDOM.innerHTML += getUnselectedCategoryItemDOMString(_category.categoryName, _categoryIdx);
        }
    })

    categoryListDOM.addEventListener('click', clickCategoryList);

    /**
     * 선택된 카테고리의 콘텐츠 렌더링
     */
    const contentsBoxDOM = document.querySelector(".media-contents__contents-box");
    const contentsString = getSelectedCategoryContentsDOMString(category[categoryIdx].media[mediaIdx]);
    contentsBoxDOM.innerHTML = contentsString;

    /**
     * 구독/구독취소 이벤트 등록
     */
    const subscribeButtonDOM = document.querySelector('.subscribe-button--subscribe');
    if (subscribeButtonDOM) {
        const subscribeMediaId = parseInt(subscribeButtonDOM.dataset.mediaId);
        subscribeButtonDOM.addEventListener("click", () => clickSubscribeButton(categoryIdx, mediaIdx, subscribeMediaId));
    }

    const unsubscribeButtonDOM = document.querySelector('.subscribe-button--unsubscribe');
    if (unsubscribeButtonDOM) {
        const unsubscribeMediaId = parseInt(unsubscribeButtonDOM.dataset.mediaId);
        unsubscribeButtonDOM.addEventListener("click", () => clickUnsubscribeButton(categoryIdx, mediaIdx, unsubscribeMediaId));
    }
}

/**
 * @description 선택된 카테고리 아이템 DOM string을 반환해주는 함수
 * 
 * @returns "<li>...</li>"
 */
function getSelectedCategoryItemDOMString(category, selectedCategoryIdx, selectedMediaIdx) {
    return `<li class="media-contents__category-item media-contents__category-item--selected" data-selected-category-idx="${selectedCategoryIdx}" data-selected-media-idx="${selectedMediaIdx}">
                <p class="text__bold14 text__white--default">${category.categoryName}</p>
                <section>
                    <p class="text__bold14 text__white--default">${selectedMediaIdx + 1}</p> <p class="text__bold14 text__white--weak">/ ${category.length}</p>
                </section>
            </li>`
}
/**
 * @description 선택되지 않은 카테고리 아이템 DOM string을 반환해주는 함수 
 * 
 * @returns "<li>...</li>"
 */
function getUnselectedCategoryItemDOMString(categoryName, categoryIdx) {
    return `<li class="media-contents__category-item">
                <p class="media-contents__category-item-text text--weak" data-category-idx="${categoryIdx}">${categoryName}</p>
            </li>`
}

/**
 * @description 선택된 카테고리의 콘텐츠 DOM string을 반환해주는 함수
 * 
 * @returns "<section>...</section>"
 */
function getSelectedCategoryContentsDOMString(media) {
    const { id, iconUrl, editDate, imageContent, contents } = media;

    const subscribeList = localStorage.getItem("newsstand-subscribe") ?? [];
    const isSubscribed = subscribeList.includes(id);

    return `
    <section class="flexbox__flex-start--center gap16">
        <img alt="언론사 아이콘" src="${iconUrl}"/>
        <p class="text__medium12">${editDate}</p>
        ${isSubscribed ? `
            <section class="button__container subscribe-button--unsubscribe" data-media-id="${id}">
                <img alt="구독 취소 아이콘" src="./static/icons/close-default.svg" />
            </section>` : `
            <section class="button__container subscribe-button--subscribe" data-media-id="${id}">
                <img alt="구독 클릭 아이콘" src="./static/icons/plus-default.svg" />
                <p class="button__text subscribe-button__text text__medium12 text--weak">구독하기</p>
            </section>`}
    </section>

    <section class="flexbox__flex-start--start gap32">
        <a class="media-contents__image-content flexbox__column-direction gap16" href="${imageContent.url}" target="_blank">
            <img alt="뉴스 이미지" src="${imageContent.imageUrl}" />
            <p class="media-contents__image-headline text__medium16 text--strong">${imageContent.headline}</p>
        </a>
        <section class="flexbox__column-direction gap16">
            <ul class="flexbox__column-direction gap16">
                ${contents.map((content) => `
                    <li class="media-contents__list-item">
                        <a href="${content.url}">
                            <p class="media-contents__list-item-text text__medium16 text--bold">${content.headline}</p>
                        </a>
                    </li>
                    `)}
            </ul>
            <p class="media-contents__tip text__medium14 text--weak">SBS Biz 언론사에서 직접 편집한 뉴스입니다.</p>
        </section>
    </section>
    `;
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
 * @description prev, next 버튼 클릭 동작을 수행하는 함수
 */
function clickNavigationButton(step) {
    const selectedCategory = document.querySelector(".media-contents__category-item--selected");

    const selectedCategoryIdx = parseInt(selectedCategory.dataset.selectedCategoryIdx);
    const selectedMediaIdx = parseInt(selectedCategory.dataset.selectedMediaIdx);

    const category = TOTAL_MEDIA_CATEGORY.data;
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
            return;
        }

        selectedCategory.dataset.selectedCategoryIdx = prevCategoryIdx;
        selectedCategory.dataset.selectedMediaIdx = category[prevCategoryIdx].length - 1;
    } else if (nextMediaIdx === currentCategory.length) {
        const nextCategoryIdx = selectedCategoryIdx + 1;
        if (nextCategoryIdx === TOTAL_MEDIA_CATEGORY.length) {
            return;
        }
        
        selectedCategory.dataset.selectedCategoryIdx = nextCategoryIdx;
        selectedCategory.dataset.selectedMediaIdx = 0;
    }

    const categoryIdxNumber = parseInt(selectedCategory.dataset.selectedCategoryIdx);
    const mediaIdxNumber = parseInt(selectedCategory.dataset.selectedMediaIdx);
    renderMedia(categoryIdxNumber, mediaIdxNumber);
}

/**
 * @description 언론사 구독 이벤트 등록하는 함수
 */
function clickSubscribeButton(categoryIdx, mediaIdx, subscribeMediaId) {
    const subscribeList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
    const newSubscribeList = JSON.stringify([...subscribeList, subscribeMediaId]);
    localStorage.setItem("newsstand-subscribe", newSubscribeList);

    renderSnackbar("내가 구독한 언론사에 추가되었습니다.", 'subscribe');
    renderMedia(categoryIdx, mediaIdx);
}
/**
 * @description 언론사 구독 취소 이벤트 등록하는 함수
 */
function clickUnsubscribeButton(categoryIdx, mediaIdx, subscribeMediaId) {
    const subscribeList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
    const newSubscribeList = JSON.stringify(subscribeList.filter((subscribedId) => subscribedId !== subscribeMediaId));
    localStorage.setItem("newsstand-subscribe", newSubscribeList);

    renderMedia(categoryIdx, mediaIdx);
}
/**
 * @description snackbar를 렌더하는 함수
 */
function renderSnackbar(text, id) {
    const bodyDOM = document.querySelector("body");
    const snackbarDOMString = `
    <section id="snackbar-${id}" class="snackbar__container">
        <p class="text__medium16 text__white--default">${text}</p>
    </section>`;
    
    bodyDOM.insertAdjacentHTML("beforeend", snackbarDOMString);

    setTimeout(() => {
        const snackbarDOM = bodyDOM.querySelector(`#snackbar-${id}`);
        bodyDOM.removeChild(snackbarDOM);
    }, 5000);
}
/**
 * @description alert를 렌더하는 함수
 */
function renderAlert() {

}
