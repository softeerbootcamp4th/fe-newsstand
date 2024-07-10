import { EventsHandler } from "./EventsHandler.js";

/**
 * @class CategoryEventHandler
 * @classdesc 카테고리 이벤트 핸들러
 */
class CategoryEventHandler extends EventsHandler {
    /**
     * @constructor
     * @param {States} states - 주입받은 states 
     * @param {object} eventInfoList - 발생한 이벤트 리스트
     */
    constructor(states = {}, eventInfo) {
        super();
        this.states = states;
        this.element = document.querySelector(".news-list__navbar");
        this.#addEvents(eventInfo);
    }

    /**
     * 이벤트를 등록하는 함수
     * @param {object} eventInfoList - 발생한 이벤트 리스트
     * @param {string} eventInfoList[].type - 등록할 이벤트 타입
     * @param {Function} eventInfoList[].listener - 등록할 이벤트 리스너 
     */
    #addEvents(eventInfos) {
        eventInfos.forEach(({ type, listener }) => {
            this.element.addEventListener(type, (event) => listener(event, this.states, this.element));
        })
    }
}

export { CategoryEventHandler }