import { States } from "./States.js";

/**
 * @class NewsStates
 * @classdesc 뉴스 정보를 가지고 있는 State, 옵저버 패턴에서 Subject 역할
 */
class NewsStates extends States {
    /**
     * 
     * @param {Object} newsInfo - 뉴스 정보를 받아오는 객체
     * @param {number} newsInfo.categoryIndex - 어떤 카테고리가 선택되어 있는지에 대한 정보 
     * @param {string} newsInfo.allSubInfo - 구독 언론사인지, 전체 언론사인지에 대한 정보 
     * @param {number} newsInfo.newsListIndex - 몇 번째 뉴스 목록인지 대한 정보 
     * @param {json} newsInfo.newsList - 뉴스 목록에 대한 json 파일
     * @param {Renderer} renderers - 렌더링을 해주는 클래스
     */
    constructor({ categoryIndex = 0, allSubInfo = 'all', newsListIndex = 0, newsList }) {
        super();
        this.categoryIndex = categoryIndex;
        this.allSubInfo = allSubInfo;
        this.newsListIndex = newsListIndex;
        this.newsList = newsList;
    }

    /**
     * 카테고리를 클릭해서 설정하는 함수, 지금 Subject를 구독하고 있는 Observer에게 알림을 전달
     * @param {number} value - 현제 인덱스 정보 
     */
    setCategory(value) {
        this.categoryIndex = value;
        this.notify({
            eventName: "clickCategory",
            value: this.categoryIndex
        })
    }
}

export { NewsStates }