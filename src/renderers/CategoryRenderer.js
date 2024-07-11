import { categoryEventNameList } from "../events/categoryEvent.js";
import { Renderer } from "./Renderer.js";

/**
 * @class CategoryRenderer
 * @classdesc 카테고리를 렌더링하는 클래스
 */
class CategoryRenderer extends Renderer {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.categoryContainer = document.querySelector(".news-list__navbar");
    }

    /**
     * 이 클래스에서 실행 될 이벤트인지 확인한다.
     * @param {string} event.eventName - 이벤트의 이름 
     * @returns {boolean}
     */
    _checkEventName(event) {
        return categoryEventNameList.includes(event.eventName);
    }

    /**
     * 생성된 element를 렌더링하는 함수
     * @param {number} categoryIndex - 선택된 카테고리 인덱스
     * @param {Array} categoryList - 표시 될 카테고리 목록
     * @param {number} currentNewsListIndex - 현제 표시될 뉴스 목록의 인덱스
     */
    _render({ categoryIndex, categoryList, currentNewsListIndex, currentNewsListCount }) {
        const categoryListElement = this.#generateCategoryListElement(categoryIndex, categoryList, currentNewsListIndex, currentNewsListCount);
        this.categoryContainer.innerHTML = '';
        this.categoryContainer.innerHTML += categoryListElement;
    }

    /**
     * 표시될 element를 생성하는 함수
     * @param {number} categoryIndex - 선택된 카테고리 인덱스
     * @param {Array} categoryList - 표시 될 카테고리 목록
     * @param {number} currentNewsListIndex - 현제 표시될 뉴스 목록의 인덱스
     * @returns {Element}
     */
    #generateCategoryListElement(categoryIndex = 0, categoryList, currentNewsListIndex, currentNewsListCount) {
        debugger;
        return categoryList.map((category, index) =>
            `<li class="news-list__navbar__category" 
            data-selected=${index === categoryIndex ? "yes" : "no"} 
            data-news-index=${currentNewsListIndex}
            data-news-count=${currentNewsListCount}>
                ${category}
            </li>`
        ).join("")
    }
}

export { CategoryRenderer }