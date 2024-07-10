import { subAllEventNameList } from "../events/subAllEvent.js";
import { Renderer } from "./Renderer.js";

/**
 * @class SubAllRenderer
 * @classdesc '전체언론사', '내가 구독한 언론사' 중 선택한 정보를 렌더링하는 클래스
 */
class SubAllRenderer extends Renderer {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.subAllContainer = document.querySelector(".news-list__menu__selectors");
    }

    /**
     * 이 클래스에서 실행 될 이벤트인지 확인한다.
     * @param {string} event.eventName - 이벤트의 이름
     * @returns {boolean}
     */
    _checkEventName(event) {
        return subAllEventNameList.includes(event.eventName);
    }

    /**
     * 생성된 element를 렌더링 하는 함수
     * @param {string} subAllInfo - 선택된 '전체언론사', '내가 구독한 언론사' 정보 
     */
    _render({ subAllInfo }) {
        debugger;
        const subAllElement = this.#generateSubAllElement(subAllInfo);
        this.subAllContainer.innerHTML = '';
        this.subAllContainer.innerHTML += subAllElement;
    }

    /**
     * 표시될 element를 생성하는 함수
     * @param {string} subAllInfo - 선택된 '전체언론사', '내가 구독한 언론사' 정보 
     * @returns {Element}
     */
    #generateSubAllElement(subAllInfo) {
        debugger;
        return `<span class="news-list__menu__selectors__all" ${subAllInfo === "all" ? "data-selected='yes'" : ""}>전체언론사</span>
                <span class="news-list__menu__selectors__all" ${subAllInfo === "sub" ? "data-selected='yes'" : ""}>내가 구독한 언론사</span>`
    }
}

export { SubAllRenderer }