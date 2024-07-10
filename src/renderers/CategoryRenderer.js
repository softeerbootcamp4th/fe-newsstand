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
     * @returns 
     */
    _checkEventName(event) {
        return event.eventName === 'clickCategory';
    }

    /**
     * 렌더 함수
     */
    _render({ eventName, value, ...rest }) {
        const categoryListElement = this.#generateCategoryListElement(value);
        this.categoryContainer.innerHTML = '';
        this.categoryContainer.innerHTML += categoryListElement;
    }

    #generateCategoryListElement(value) {
        return `<div>dd</div>`
    }
}

export { CategoryRenderer }