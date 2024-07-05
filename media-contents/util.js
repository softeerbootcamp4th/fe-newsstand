import { convertToMarkdown } from "../utils/convertToMarkdown.js";

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

    const subscribeList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
    const isSubscribed = subscribeList.includes(id);

    return `
    <section class="flexbox__flex-start--center gap16">
        <img alt="언론사 아이콘" src="${iconUrl}"/>
        <p class="text__medium12">${editDate}</p>
        ${isSubscribed ? `
            <section class="button__container subscribe-button--unsubscribe" data-media-id="${id}">
                <img class="subscribe-button__icon--unsubscribe" alt="구독 취소 아이콘" src="./static/icons/close-default.svg" />
            </section>` : `
            <section class="button__container subscribe-button--subscribe" data-media-id="${id}">
                <img class="subscribe-button__icon" alt="구독 클릭 아이콘" src="./static/icons/plus-default.svg" />
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
    const subscribeButtonDOM = document.querySelector('.subscribe-button--subscribe');
    if (subscribeButtonDOM) {
        const subscribeMediaId = parseInt(subscribeButtonDOM.dataset.mediaId);
        subscribeButtonDOM.addEventListener("click", () => clickSubscribeButton(subscribeMediaId, triggerRender));

        const subscribeButtonIconDOM = subscribeButtonDOM.querySelector(".subscribe-button__icon");
        subscribeButtonDOM.addEventListener("mouseover", () => subscribeButtonIconDOM.src = "./static/icons/plus-hover.svg");
        subscribeButtonDOM.addEventListener("mouseout", () => subscribeButtonIconDOM.src = "./static/icons/plus-default.svg");
    }

    const unsubscribeButtonDOM = document.querySelector('.subscribe-button--unsubscribe');
    if (unsubscribeButtonDOM) {
        const unsubscribeMediaId = parseInt(unsubscribeButtonDOM.dataset.mediaId);
        unsubscribeButtonDOM.addEventListener("click", () => clickUnsubscribeButton(media, unsubscribeMediaId, triggerRender));
        
        const unsubscribeButtonIconDOM = unsubscribeButtonDOM.querySelector(".subscribe-button__icon--unsubscribe");
        unsubscribeButtonDOM.addEventListener("mouseover", () => unsubscribeButtonIconDOM.src = "./static/icons/close-hover.svg");
        unsubscribeButtonDOM.addEventListener("mouseout", () => unsubscribeButtonIconDOM.src = "./static/icons/close-default.svg");
    }
}

/**
 * @description 언론사 구독 이벤트 등록하는 함수
 */
function clickSubscribeButton(subscribeMediaId, triggerRender) {
    const subscribeList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
    const newSubscribeList = JSON.stringify([...subscribeList, subscribeMediaId]);
    localStorage.setItem("newsstand-subscribe", newSubscribeList);

    renderSnackbar("내가 구독한 언론사에 추가되었습니다.", 'subscribe');
    triggerRender();
}
/**
 * @description 언론사 구독 취소 이벤트 등록하는 함수
 */
function clickUnsubscribeButton(media, subscribeMediaId, triggerRender) {
    const mediaName = media.name;
    const id = media.id;

    function clickCancel() {
        const bodyDOM = document.querySelector("body");
        const alertDOM = bodyDOM.querySelector(`#alert-${id}`);
        bodyDOM.removeChild(alertDOM);
    }
    function clickUnsubscribe() {
        const subscribeList = JSON.parse(localStorage.getItem("newsstand-subscribe") ?? "[]");
        const newSubscribeList = JSON.stringify(subscribeList.filter((subscribedId) => subscribedId !== subscribeMediaId));
        localStorage.setItem("newsstand-subscribe", newSubscribeList);

        clickCancel();
        triggerRender();
    }

    renderAlert(`{${mediaName}}을(를)\n구독해지하시겠습니까?`, id, "예, 해지합니다", "아니오", clickUnsubscribe, clickCancel, clickCancel)
}

/**
 * @description alert를 렌더하는 함수
 */
export function renderAlert(text, id, leftButtonText, rightButtonText, leftButtonEventHandler, rightButtonEventHandler) {
    const markdownText = convertToMarkdown(text, 16);

    const bodyDOM = document.querySelector("body");
    const alertDOMString = `
    <section id="alert-${id}" class="alert__wrapper">
        <section class="alert__container">
            <section class="alert__contents">${markdownText}</section>
        
            <section class="alert__buttons">
                <p class="alert__button alert__button--left text__medium16">${leftButtonText}</p>
                <p class="alert__button alert__button--right text__medium16 text--strong">${rightButtonText}</p>
            </section>
        </section>
    </section>`;

    bodyDOM.insertAdjacentHTML("beforeend", alertDOMString);

    /**
     * alert 이벤트 리스너 부착
     */
    const leftButtonDOM = document.querySelector(".alert__button--left");
    const rightButtonDOM = document.querySelector(".alert__button--right");
    leftButtonDOM.addEventListener("click", leftButtonEventHandler);
    rightButtonDOM.addEventListener("click", rightButtonEventHandler);

    /**
     * alert 외부 영역 클릭 시 alert 삭제 로직
     */
    const alertWrapperDOM = document.querySelector(`#alert-${id}`);
    alertWrapperDOM.addEventListener("click", clickAlertOutside);
    function clickAlertOutside(e) {
        if (e.target !== alertWrapperDOM) {
            return;
        }

        const bodyDOM = document.querySelector("body");
        bodyDOM.removeChild(alertWrapperDOM);
    }
}

/**
 * @description snackbar를 렌더하는 함수
 */
function renderSnackbar(text, id) {
    const bodyDOM = document.querySelector("body");
    const snackbarDOMString = `
    <section id="snackbar-${id}" class="snackbar__wrapper">
        <section class="snackbar__container">
            <p class="text__medium16 text__white--default">${text}</p>
        </section>
    </section>`;
    
    bodyDOM.insertAdjacentHTML("beforeend", snackbarDOMString);

    /**
     * 5초 후 snackbar 삭제 로직
     */
    let snackbarId = null;
    const snackbarWrapperDOM = document.querySelector(`#snackbar-${id}`);
    snackbarId = setTimeout(() => {
        bodyDOM.removeChild(snackbarWrapperDOM);
        snackbarId = null;
    }, 5000);

    /**
     * snackbar 외부 영역 클릭 시 snackbar 삭제 로직
     */
    snackbarWrapperDOM.addEventListener("click", clickSnackbarOutside);
    function clickSnackbarOutside(e) {
        if (e.target !== snackbarWrapperDOM) {
            return;
        }

        if (snackbarId !== null) {
            clearTimeout(snackbarId);
            snackbarId = null;
        }

        const bodyDOM = document.querySelector("body");
        bodyDOM.removeChild(snackbarWrapperDOM);
    }
}
