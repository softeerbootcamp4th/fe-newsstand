import { ERROR_MESSAGE } from "../constants/message.js";

/**
 * @class Renderer
 * @classdesc 렌더링을 위한 부모 클래스
 */
class Renderer {
    constructor() {
    }

    /**
     * 이벤트가 유효한 이벤트인지 확인 후 렌더 함수 실행
     * @param {Object} event - 발생한 이벤트에 대한 정보를 담은 객체
     * @param {string} event.eventName - 발생한 이벤트 정보 이름
     * @param {*} event.value - 렌더 함수에 전달할 값 
     */
    update(event) {
        if (this.checkEventName(event)) this.render(event);
    }

    /**
     * @throws {Error} - 미구현 시 오류 발생
     */
    checkEventName() {
        throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED);
    }

    /**
     * @throws {Error} - 미구현 시 오류 발생
     */
    render() {
        throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED);
    }
}

export { Renderer }