import { TOTAL_MEDIA_CATEGORY } from "../static/data/total-media-category.js";

/**
 * @description 전체 언론사를 렌더링하는 함수
 */
export function renderTotalMedia() {
    const category = TOTAL_MEDIA_CATEGORY.data;
    const categoryListDOM = document.querySelector(".media-contents__category-list");

    /**
     * 미디어 카테고리 렌더링
     * 
     * @NOTE 기본으로 0번째 index의 카테고리가 선택된 상태
     */
    categoryListDOM.insertAdjacentHTML('beforeend', getSelectedCategoryItem(category[0]));
    category.slice(1).forEach((_category) => {
        categoryListDOM.insertAdjacentHTML('beforeend', getUnselectedCategoryItem(_category.categoryName));
    });
    categoryListDOM.addEventListener('click', (e) => {
        /**
         * TODO: category list DOM을 클릭하면 리스트 아이템으로 이벤트 위임이 되고, 해당 리스트 아이템 카테고리로 이동
         */
        console.log("click", e.target)
    });

    /**
     * 선택된 카테고리의 콘텐츠 렌더링
     */
    const contentsBoxDOM = document.querySelector(".media-contents__contents-box");
    const contentsString = getSelectedCategoryContents(category[0].media[0]);
    contentsBoxDOM.insertAdjacentHTML('beforeend', contentsString);
}

/**
 * @description 선택된 카테고리 아이템 DOM string을 반환해주는 함수 
 * @returns "<li>...</li>"
 */
function getSelectedCategoryItem(category) {
    return `<li class="media-contents__category-item media-contents__category-item--selected">
                <p class="text__bold14 text__white--default">${category.categoryName}</p>
                <section>
                    <p class="text__bold14 text__white--default">1</p> <p class="text__bold14 text__white--weak">/ ${category.length}</p>
                </section>
            </li>`
}
/**
 * @description 선택되지 않은 카테고리 아이템 DOM string을 반환해주는 함수 
 * @returns "<li>...</li>"
 */
function getUnselectedCategoryItem(categoryName) {
    return `<li class="media-contents__category-item">
                <p class="media-contents__category-item-text text--weak">${categoryName}</p>
            </li>`
}

function getSelectedCategoryContents(media) {
    const { iconUrl, editDate, isSubscribed, imageContent, contents } = media;

    return `
    <section class="flexbox__flex-start--center gap16">
        <img alt="언론사 아이콘" src="${iconUrl}" />
        <p class="text__medium12">${editDate}</p>
        ${isSubscribed ? `
            <section class="border media-contents__subscribe-button">
                <img alt="구독 취소 아이콘" src="./static/icons/close-default.svg" />
            </section>` : `
            <section class="border media-contents__subscribe-button">
                <img alt="구독 클릭 아이콘" src="./static/icons/plus-default.svg" />
                <p class="media-contents__subscribe-text text__medium12 text--weak">구독하기</p>
            </section>`}
    </section>

    <section class="flexbox__flex-start--start gap32">
        <a class="media-contents__image-content flexbox__column-direction gap16" href="${imageContent.url}">
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