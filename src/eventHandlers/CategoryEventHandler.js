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
    constructor(type, states = {}) {
        super();
        this.states = states;
        this.element = document.querySelector(".news-list__navbar");
        this.addEvents(this.#listener.bind(this), type);
    }

    /**
     * 이벤트를 등록하는 함수
     * @param {Function} listener 
     * @param {string} type 
     */
    addEvents(listener, type) {
        this.element.addEventListener(type, listener);
    }

    #listener(event) {
        this.states.setCategory(Array.from(this.element.children).indexOf(event.target));
    }
}

export { CategoryEventHandler }