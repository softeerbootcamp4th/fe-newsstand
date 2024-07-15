import { EventsHandler } from "./EventsHandler.js";

/**
 * @class InitEventHandler
 * @classdesc 초기화 이벤트 담당 이벤트 핸들러
 */
class InitEventHandler extends EventsHandler {
    /**
    * @constructor
    * @param {States} states - 주입받은 states 
    * @param {object} eventInfoList - 발생한 이벤트 리스트
    */
    constructor(states = [], eventInfoList = []) {
        super();
        this.states = states;
        this.element = document;
        this.#addEvents(eventInfoList);
    }

    /**
     * 이벤트를 등록하는 함수
     * @param {object} eventInfoList - 발생한 이벤트 리스트
     * @param {string} eventInfoList[].type - 등록할 이벤트 타입
     * @param {Function} eventInfoList[].listener - 등록할 이벤트 리스너 
     */
    #addEvents(eventInfoList) {
        eventInfoList.forEach(({ type, listener }) => {
            listener(event, this.states, this.element)
        });
    }
}

export { InitEventHandler }
