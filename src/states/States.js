/**
 * @class States
 * @classdesc State를 옵저버 패턴의 Subject로 만들기 위한 클래스 
 */
class States {
    /**
     * @constructor
     */
    constructor() {
        this.observers = [];
    }

    /**
     * Observer가 Subject를 구독하는 함수
     * @param {Renderer} observer - render 함수
     */
    subscribe(observer) {
        this.observers.push(observer);
    }

    /**
     * 구독한 Observer에게 알림을 주는 함수
     * @param {Object} event - 발생한 이벤트에 대한 정보를 담은 객체
     * @param {string} event.eventName - 발생한 이벤트 정보 이름
     * @param {*} event.value - 렌더 함수에 전달할 값 
     */
    notify(event) {
        this.observers.forEach((observer) => observer.update(event))
    }
}

export { States }