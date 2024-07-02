import { getNextNumber } from "../utils/getNextNumber.js";

/**
 * @description 최신 뉴스 DOM의 텍스트를 rolling 해주는 함수
 */
export function rolling(rollingBoxDOM, rollingData) {
    const length = rollingData.length;

    const staticTextDOM = rollingBoxDOM.querySelector('.current-news__static-text');
    const disappearTextDOM = rollingBoxDOM.querySelector('.current-news__disappear-text');
    const appearTextDOM = rollingBoxDOM.querySelector('.current-news__appear-text');

    staticTextDOM.innerText = rollingData.newsList[0].title;

    if (length === 1) {
        return;
    }

    let prevIdx = 0, nextIdx = 1;
    disappearTextDOM.innerText = rollingData.newsList[prevIdx].title;
    appearTextDOM.innerText = rollingData.newsList[nextIdx].title;
    
    setInterval(() => {
        // rolling 애니메이션 실행
        staticTextDOM.classList.add('current-news__not-display')
        disappearTextDOM.classList.add('rolling-out');
        appearTextDOM.classList.add('rolling-in');

        staticTextDOM.innerText = rollingData.newsList[nextIdx].title;

        // 다음 rolling 애니메이션을 위해 초기화
        prevIdx = getNextNumber(prevIdx, length);
        nextIdx = getNextNumber(nextIdx, length);

        setTimeout(() => {
            staticTextDOM.classList.remove('current-news__not-display');
            disappearTextDOM.classList.remove('rolling-out');
            appearTextDOM.classList.remove('rolling-in');

            disappearTextDOM.innerText = rollingData.newsList[prevIdx].title;
            appearTextDOM.innerText = rollingData.newsList[nextIdx].title;        
        }, 1200);
    }, 5000);
}