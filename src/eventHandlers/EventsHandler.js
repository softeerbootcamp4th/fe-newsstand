import { ERROR_MESSAGE } from "../constants/message.js";

/**
 * @class eventHandler
 * @classdesc 이벤트 핸들러 부모 클래스
 */
class EventsHandler {
    /**
     * @constructor
     */
    constructor() {
    }

    /**
     * 이벤트를 추가하는 메서드
     * @param {Function} listener 
     * @param {string} type 
     * @throws {Error} - 구현하지 않고 사용 시, 오류 발생
     */
    addEvents(listener, type) {
        throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED);
    }
}

export { EventsHandler }