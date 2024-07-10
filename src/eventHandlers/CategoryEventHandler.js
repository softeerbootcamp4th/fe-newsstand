import { EventsHandler } from "./EventsHandler.js";

/**
 * @class CategoryEventHandler
 * @classdesc 카테고리 이벤트 핸들러
 */
class CategoryEventHandler extends EventsHandler {
    /**
     * @constructor
     * @param {string} type 
     * @param {Array} [states = 0] - 주입받는 states
     */
    constructor(states = {}, eventInfo) {
        super();
        this.states = states;
        this.element = document.querySelector(".news-list__navbar");
        this.#addEvents(eventInfo);
    }

    /**
     * 이벤트를 등록하는 함수
     * @param {Function} listener 
     * @param {string} type 
     */
    #addEvents(eventInfos) {
        eventInfos.forEach(({ type, listener }) => {
            this.element.addEventListener(type, (event) => listener(event, this.states, this.element));
        })
    }
}

export { CategoryEventHandler }