import { getNextNumber } from "../utils/getNextNumber.js";

/**
 * @description 최신 뉴스 DOM의 텍스트를 rolling 해주는 함수
 */
export function rollingDOM(rollingBoxDOM, rollingData, rollingIdx) {
    const length = rollingData.length;
    
    if (length === 0) {
        return;
    }

    const staticTextDOM = rollingBoxDOM.querySelector('.current-news__static-text');
    const disappearTextDOM = rollingBoxDOM.querySelector('.current-news__disappear-text');
    const appearTextDOM = rollingBoxDOM.querySelector('.current-news__appear-text');

    let prevIdx = 0, nextIdx = 1;
    staticTextDOM.textContent = rollingData.newsList[prevIdx].title;
    staticTextDOM.href = rollingData.newsList[prevIdx].url;

    if (length === 1) {
        return;
    }

    disappearTextDOM.textContent = rollingData.newsList[prevIdx].title;
    appearTextDOM.textContent = rollingData.newsList[nextIdx].title;

    /**
     * @description 실제 rolling 애니메이션 실행하는 함수
     */
    let resetRollingId = null;
    function rolling() {
        staticTextDOM.classList.add('current-news__not-display');
        disappearTextDOM.classList.add('rolling-out');
        appearTextDOM.classList.add('rolling-in');

        staticTextDOM.textContent = rollingData.newsList[nextIdx].title;
        staticTextDOM.href = rollingData.newsList[nextIdx].url;

        /**
         * 다음 rolling 애니메이션을 위해 초기화
         */
        prevIdx = getNextNumber(prevIdx, length);
        nextIdx = getNextNumber(nextIdx, length);

        resetRollingId = setTimeout(() => {
            staticTextDOM.classList.remove('current-news__not-display');
            disappearTextDOM.classList.remove('rolling-out');
            appearTextDOM.classList.remove('rolling-in');

            disappearTextDOM.textContent = rollingData.newsList[prevIdx].title;
            appearTextDOM.textContent = rollingData.newsList[nextIdx].title;
        }, 1200);
    }
    
    /**
     * 순차적 rolling 실행
     */
    let intervalRollingId = null;
    setTimeout(() => {
        intervalRollingId = setInterval(rolling, 5000);
    }, 1000 * rollingIdx);

    /**
     * static 텍스트 hover 처리
     */
    staticTextDOM.addEventListener('mouseover', () => {
        clearInterval(intervalRollingId);
        clearTimeout(resetRollingId);
    });
    staticTextDOM.addEventListener('mouseout', () => {
        intervalRollingId = setInterval(rolling, 5000);
    });
}
