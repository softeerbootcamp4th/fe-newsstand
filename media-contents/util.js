import { getItem, setItem } from "../utils/local-storage.js";
import { renderAlert } from "../utils/render-alert.js";
import { renderSnackbar } from "../utils/render-snackbar.js";

/**
 * @description 선택된 카테고리 아이템 DOM string을 반환해주는 함수
 * 
 * @returns "<li>...</li>"
 */
export function getSelectedCategoryItemDOMString(categoryName, selectedCategoryIdx, selectedMediaIdx, categoryLength) {
    /**
     * category length가 존재하는 경우 : 전체 언론사
     * category length가 존재하지 않는 경우 : 내가 구독한 언론사
     */
    return `<li class="media-contents__category-item media-contents__category-item--selected" data-selected-category-idx="${selectedCategoryIdx}" data-selected-media-idx="${selectedMediaIdx}">
                <section class="media-contents__category-item-background"></section>
                <section class="media-contents__category-item-contents">
                    <p class="text__bold14 text__white--default media-contents__category-item-text--selected">${categoryName}</p>
                    <section>
                        ${categoryLength ? `
                            <p class="text__bold14 text__white--default">${selectedMediaIdx + 1}</p> <p class="text__bold14 text__white--weak">/ ${categoryLength}</p>
                            ` : `
                            <img alt="화살표" src="./static/icons/arrow-right.svg" />
                        `}
                    </section>
                </section>
            </li>`
}
/**
 * @description 선택되지 않은 카테고리 아이템 DOM string을 반환해주는 함수 
 * 
 * @returns "<li>...</li>"
 */
export function getUnselectedCategoryItemDOMString(categoryName, categoryIdx) {
    return `<li class="media-contents__category-item">
                <p class="media-contents__category-item-text text--weak" data-category-idx="${categoryIdx}">${categoryName}</p>
            </li>`
}

/**
 * @description 선택된 카테고리의 콘텐츠 DOM string을 반환해주는 함수
 * 
 * @returns "<section>...</section>"
 */
export function getSelectedCategoryContentsDOMString(media) {
    const { id, iconUrl, editDate, imageContent, contents } = media;

    const subscribeList = getItem("newsstand-subscribe") ?? [];
    const isSubscribed = subscribeList.includes(id);

    return `
    <section class="flexbox__flex-start--center gap16">
        <img alt="언론사 아이콘" src="${iconUrl}"/>
        <p class="text__medium12">${editDate}</p>
        ${isSubscribed ? `
            <section class="button__container subscribe-button__${id}--unsubscribe" data-media-id="${id}">
                <img class="subscribe-button__icon--unsubscribe subscribe-button--default" alt="구독 취소 아이콘" src="./static/icons/close-default.svg" />
                <img class="subscribe-button__icon--unsubscribe subscribe-button--active" alt="구독 취소 아이콘" src="./static/icons/close-hover.svg" />
            </section>` : `
            <section class="button__container subscribe-button__${id}--subscribe" data-media-id="${id}">
                <img class="subscribe-button__icon subscribe-button--default" alt="구독 클릭 아이콘" src="./static/icons/plus-default.svg" />
                <img class="subscribe-button__icon subscribe-button--active" alt="구독 클릭 아이콘" src="./static/icons/plus-hover.svg" />
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
 * @description 구독/구독취소 이벤트 등록하는 함수
 */
export function setSubscribeButtonEvent(media, triggerRender) {  
    const subscribeButtonDOM = document.querySelector(`.subscribe-button__${media.id}--subscribe`);
    if (subscribeButtonDOM) {
        const subscribeMediaId = parseInt(subscribeButtonDOM.dataset.mediaId);
        subscribeButtonDOM.addEventListener("click", () => clickSubscribeButton(subscribeMediaId, triggerRender));
    }

    const unsubscribeButtonDOM = document.querySelector(`.subscribe-button__${media.id}--unsubscribe`);
    if (unsubscribeButtonDOM) {
        unsubscribeButtonDOM.addEventListener("click", () => clickUnsubscribeButton(media, triggerRender));
    }
}

/**
 * @description 언론사 구독 이벤트 등록하는 함수
 */
function clickSubscribeButton(subscribeMediaId, triggerRender) {
    const subscribeList = getItem("newsstand-subscribe") ?? [];
    setItem("newsstand-subscribe", [...subscribeList, subscribeMediaId]);

    renderSnackbar("내가 구독한 언론사에 추가되었습니다.", 'subscribe');
    triggerRender();
}
/**
 * @description 언론사 구독 취소 이벤트 등록하는 함수
 */
function clickUnsubscribeButton(media, triggerRender) {
    const mediaName = media.name;
    const id = media.id;

    function clickCancel() {
        const bodyDOM = document.querySelector("body");
        const alertDOM = bodyDOM.querySelector(`#alert-${id}`);
        bodyDOM.removeChild(alertDOM);
    }
    function clickUnsubscribe() {
        const subscribeList = getItem("newsstand-subscribe") ?? [];
        const newSubscribeList = subscribeList.filter((subscribedId) => subscribedId !== id);
        setItem("newsstand-subscribe", newSubscribeList);

        clickCancel();
        triggerRender();
    }

    renderAlert(`{${mediaName}}을(를)\n구독해지하시겠습니까?`, id, "예, 해지합니다", "아니오", clickUnsubscribe, clickCancel, clickCancel)
}

/**
 * @description 현재 display mode를 반환해주는 함수
 */
export function getDisplayMode() {
    const mediaDisplayDOM = document.querySelector("#display-style");
    return mediaDisplayDOM.dataset.selectedDisplay;
}

/**
 * @description 그리드 언론사 아이템 DOM string을 반환해주는 함수
 */
export function getGridMediaItem(media) {
    const subscribeList = getItem("newsstand-subscribe") ?? [];
    const isSubscribed = subscribeList.includes(media.id);

    return `<li class="media-contents__grid-item">
                <img class="media-contents__grid-item-icon" alt="${media.name} 언론사 아이콘" src="${media.icon}"/>
                ${isSubscribed ? `
                <section class="button__container subscribe-button__${media.id}--unsubscribe" data-media-id="${media.id}">
                    <img class="subscribe-button__icon--unsubscribe subscribe-button--default" alt="구독 취소 아이콘" src="./static/icons/close-default.svg" />
                    <img class="subscribe-button__icon--unsubscribe subscribe-button--active" alt="구독 취소 아이콘" src="./static/icons/close-hover.svg" />
                    <p class="button__text subscribe-button__text text__medium12 text--weak">해지하기</p>
                </section>` : `
                <section class="button__container subscribe-button__${media.id}--subscribe" data-media-id="${media.id}">
                    <img class="subscribe-button__icon subscribe-button--default" alt="구독 클릭 아이콘" src="./static/icons/plus-default.svg" />
                    <img class="subscribe-button__icon subscribe-button--active" alt="구독 클릭 아이콘" src="./static/icons/plus-hover.svg" />
                    <p class="button__text subscribe-button__text text__medium12 text--weak">구독하기</p>
                </section>`}
            </li>`
}

/**
 * @description 그리드 보기에서 구독/구독취소 이벤트 등록하는 함수
 */
export function clickGridItem(e, media, renderTrigger) {
    const mediaId = getMediaId(e.target);

    if (mediaId === -1) {
        return;
    }

    const subscribeList = getItem("newsstand-subscribe") ?? [];
    const isSubscribed = subscribeList.includes(mediaId);

    if (isSubscribed) {
        const subscribedMedia = media.find((_media) => _media.id === mediaId);
        clickUnsubscribeButton(subscribedMedia, renderTrigger);
    } else {
        clickSubscribeButton(mediaId, renderTrigger);
    }
}

/**
 * @description 타겟의 media id를 반환하는 함수
 */
function getMediaId(target) {
    if (target.dataset.mediaId) {
        return parseInt(target.dataset.mediaId);
    }

    const parentElement = target.parentElement;

    if (parentElement.dataset.mediaId) {
        return parseInt(parentElement.dataset.mediaId);
    }

    return -1;
}
