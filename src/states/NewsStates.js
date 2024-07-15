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
     * @param {string} newsInfo.subAllInfo - 구독 언론사인지, 전체 언론사인지에 대한 정보 
     * @param {number} newsInfo.newsListIndex - 몇 번째 뉴스 목록인지 대한 정보 
     * @param {json} newsInfo.allNewsData - 전체 언론사 목록에 대한 json 파일
     * @param {json} newsInfo.subscribedNewsData - 구독한 언론사 목록에 대한 json 파일
     * @param {Renderer} renderers - 렌더링을 해주는 클래스
     */
    constructor({ categoryIndex = 0, subAllInfo = 'all', newsListIndex = 0, currentNewsListIndex = 0, allNewsData = {}, subscribedNewsData = {} }) {
        super();
        this.categoryIndex = categoryIndex;
        this.subAllInfo = subAllInfo;
        this.newsListIndex = newsListIndex;
        this.currentNewsListIndex = currentNewsListIndex;
        this.allNewsData = allNewsData;
        this.subscribedNewsData = subscribedNewsData;
        this.currentNewsListCount = this.#getCurrentNewsListCount();
    }

    /**
     * DOM이 Load가 완료 되었을 때 실행되는 함수
     */
    setInitialState() {
        this.notify({
            eventName: "init",
            ...this.#getSubAllStates(),
            ...this.#getCategoryStates(),
            ...this.#getNewsListStates(),
        })
    }

    /**
     * 카테고리를 클릭해서 설정하는 함수, 지금 Subject를 구독하고 있는 Observer에게 알림을 전달
     * @param {number} value - 현제 인덱스 정보 
     */
    setCategory(value) {
        this.categoryIndex = value;
        this.currentNewsListIndex = 0;
        this.currentNewsListCount = this.#getCurrentNewsListCount();
        this.notify({
            eventName: "clickCategory",
            ...this.#getCategoryStates(),
            ...this.#getNewsListStates(),
        })
    }

    /**
     * '전체언론사', '내가 구독한 언론사'를 설정하는 함수, 지금 Subject를 구독하고 있는 Observer에게 알림을 전달
     * @param {string} value - 선택된 '전체언론사', '내가 구독한 언론사'정보 
     */
    setSubAll(value) {
        this.subAllInfo = value === 0 ? "all" : "sub";
        this.categoryIndex = 0;
        this.currentNewsListIndex = 0;
        this.currentNewsListCount = this.#getCurrentNewsListCount();
        this.notify({
            eventName: "clickSubAll",
            ...this.#getCategoryStates(),
            ...this.#getSubAllStates(),
            ...this.#getNewsListStates(),
        })
    }

    /**
     * 화살표 버튼을 눌렀을 때 실행되는 함수, 지금 Subject를 구독하고 있는 Observer에게 알림을 전달
     * @param {string} value - 화살표가 오른쪽인지 왼쪽인지 정보
     */
    setCurrentNewsListIndex(value) {
        if (value === 'plus') {
            if (this.currentNewsListIndex === this.currentNewsListCount) {
                this.categoryIndex++;
                this.currentNewsListIndex = 0;
                this.currentNewsListCount = this.#getCurrentNewsListCount();
            } else {
                this.currentNewsListIndex++;
            }
        }
        else {
            if (this.currentNewsListIndex === 0) {
                this.categoryIndex--;
                this.currentNewsListCount = this.#getCurrentNewsListCount();
                this.currentNewsListIndex = this.currentNewsListCount;
            } else {
                this.currentNewsListIndex--;
            }
        }
        this.notify({
            eventName: "clickArrow",
            ...this.#getCategoryStates(),
            ...this.#getNewsListStates()
        })
    }

    /**
     * 카테고리를 렌더링 하는데 필요한 state 객체를 반환하는 함수
     * @returns {object} 
     */
    #getCategoryStates() {
        return {
            categoryIndex: this.categoryIndex,
            categoryList: this.subAllInfo === "all" ? Object.keys(this.allNewsData) : Object.keys(this.subscribedNewsData),
            currentNewsListIndex: this.currentNewsListIndex + 1,
            currentNewsListCount: this.currentNewsListCount + 1,
        }
    }

    /**
     * '전체언론사', '내가 구독한 언론사'를 렌더링 하는데 필요한 state 객체를 반환하는 함수
     * @returns {object}
     */
    #getSubAllStates() {
        return {
            subAllInfo: this.subAllInfo,
        }
    }

    #getNewsListStates() {
        const newsListRawData = this.subAllInfo === "all" ? this.allNewsData : this.subscribedNewsData;
        const newsListData = Object.values(newsListRawData)[this.categoryIndex].slice(this.currentNewsListIndex * 7, this.currentNewsListIndex * 7 + 7);
        const categoryList = this.subAllInfo === "all" ? Object.keys(this.allNewsData) : Object.keys(this.subscribedNewsData)
        return {
            newsList: newsListData,
            isFirst: this.categoryIndex === 0 && this.currentNewsListIndex === 0,
            isLast: this.categoryIndex === categoryList.length - 1 && this.currentNewsListIndex === this.currentNewsListCount,
        }
    }

    #getCurrentNewsListCount() {
        const newsListRawData = this.subAllInfo === "all" ? this.allNewsData : this.subscribedNewsData;
        return Math.floor(Object.values(newsListRawData)[this.categoryIndex].length / 7) - 1;
    }
}

export { NewsStates }