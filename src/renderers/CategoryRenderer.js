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
        return event.eventName === 'clickCategory'; // 나중에 상수 배열로 빼기
    }

    /**
     * 생성된 element를 렌더링하는 함수
     * @param {number} categoryIndex - 선택된 카테고리 인덱스
     * @param {Array} categoryList - 표시 될 카테고리 목록
     */
    _render({ categoryIndex, categoryList }) {
        const categoryListElement = this.#generateCategoryListElement(categoryIndex, categoryList);
        this.categoryContainer.innerHTML = '';
        this.categoryContainer.innerHTML += categoryListElement;
    }

    /**
     * 표시될 element를 생성하는 함수
     * @param {number} categoryIndex - 선택된 카테고리 인덱스
     * @param {Array} categoryList - 표시 될 카테고리 목록
     * @returns {Element}
     */
    #generateCategoryListElement(categoryIndex = 0, categoryList) {
        return categoryList.map((category, index) =>
            `<li class="news-list__navbar__category" data-selected=${index === categoryIndex ? "yes" : "no"}>${category}</li>`
        ).join("")
    }
}

export { CategoryRenderer }