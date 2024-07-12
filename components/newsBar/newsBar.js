import { leftRollingId, rightRollingId } from "../../pages/state/newsState.js"
import { newsState } from "../../pages/state/newsState.js"
import { delay } from "../../utils/api.js"

export const createNewsBar = () => {
    return `
        <div class="news-bar-wrapper flex-row-between">
            <div class="news-bar flex-row">
                <div class="rolling-banner left-rolling-banner">
                    <div class="title flex-row-between-center">
                        연합뉴스
                    </div>
                    <div class="wrap">
                        <ul class="hover-underline">
                            <li class="current flex-row-between-center"><a href="#">노바백스 백신 2월중순부터 접종</a></li>
                            <li class="next"><a href="#">얼어붙은 투심에…현대엔지니어링 상장 철회</a></li>
                            <li><a href="#">"일본 정부, 사도광산 세계유산 추천 방침 굳혀, 일본과 갈등 첨예화 예상"</a></li>
                            <li><a href="#">"공법변경 구조검토 요구, 현산 측이 묵살했다"</a></li>
                            <li class="prev"><a href="#">12월 주담대 금리 연 3.63%…7년7개월 만에 최고</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="news-bar flex-row">
                <div class="rolling-banner right-rolling-banner">
                    <div class="title flex-row-between-center">
                        연합뉴스
                    </div>
                    <div class="wrap">
                        <ul class="hover-underline">
                            <li class="current"><a href="#">노바백스 백신 2월중순부터 접종</a></li>
                            <li class="next"><a href="#">얼어붙은 투심에…현대엔지니어링 상장 철회</a></li>
                            <li><a href="#">"일본 정부, 사도광산 세계유산 추천 방침 굳혀, 일본과 갈등 첨예화 예상"</a></li>
                            <li><a href="#">"공법변경 구조검토 요구, 현산 측이 묵살했다"</a></li>
                            <li class="prev"><a href="#">12월 주담대 금리 연 3.63%…7년7개월 만에 최고</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
}

export const initNewsBar = () => {
    newsState.setleftRollingId(window.setInterval(leftRollingCallback, 5000));
    delay(1).then(() => newsState.setRightRollingId(window.setInterval(rightRollingCallback, 5000)))
    addEventListeners();
}

const addEventListeners = () => {
    addEventListenerLeftRolling();
    addEventListenerRightRolling();
}

const addEventListenerLeftRolling = () => {
    const leftRolling = document.querySelector('.left-rolling-banner')
    
    leftRolling.addEventListener('mouseover', () => {
        clearInterval(leftRollingId)
    })
    
    leftRolling.addEventListener('mouseout', () => {
        newsState.setleftRollingId(window.setInterval(leftRollingCallback, 5000));
    })
}

const addEventListenerRightRolling = () => {
    const rightRolling = document.querySelector('.right-rolling-banner')
    
    rightRolling.addEventListener('mouseover', () => {
        clearInterval(rightRollingId)
    })

    rightRolling.addEventListener('mouseout', () => {
        newsState.setRightRollingId(window.setInterval(rightRollingCallback, 5000));
    })
}

function leftRollingCallback(){
    //.prev 클래스 삭제
    document.querySelector('.left-rolling-banner .prev').classList.remove('prev');

    //.current -> .prev
    const current = document.querySelector('.left-rolling-banner .current');
    current.classList.remove('current');
    current.classList.add('prev');

    //.next -> .current
    const next = document.querySelector('.left-rolling-banner .next');
    //다음 목록 요소가 널인지 체크
    if (next.nextElementSibling == null) {
        document.querySelector('.left-rolling-banner ul li:first-child').classList.add('next');
    } else {
    	//목록 처음 요소를 다음 요소로 선택
        next.nextElementSibling.classList.add('next');
    }
    next.classList.remove('next');
    next.classList.add('current');
}

function rightRollingCallback(){
    //.prev 클래스 삭제
    document.querySelector('.right-rolling-banner .prev').classList.remove('prev');

    //.current -> .prev
    const current = document.querySelector('.right-rolling-banner .current');
    current.classList.remove('current');
    current.classList.add('prev');

    //.next -> .current
    const next = document.querySelector('.right-rolling-banner .next');
    //다음 목록 요소가 널인지 체크
    if (next.nextElementSibling == null) {
        document.querySelector('.right-rolling-banner ul li:first-child').classList.add('next');
    } else {
    	//목록 처음 요소를 다음 요소로 선택
        next.nextElementSibling.classList.add('next');
    }
    next.classList.remove('next');
    next.classList.add('current');
}