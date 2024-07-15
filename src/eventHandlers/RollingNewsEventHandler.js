import { EventsHandler } from "./EventsHandler.js";

class RollingNewsEventHandler extends EventsHandler {
    constructor(states = {}, eventInfoList = []) {
        super();
        this.states = states;
        this.element = document.querySelector(".clipping-box");
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
            this.element.addEventListener(type, (event) => listener(event, this.states, this.element));
        })
    }
}

export { RollingNewsEventHandler }