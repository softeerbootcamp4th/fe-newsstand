import { addModeSelectionEventListener,
    addViewSelectionEventListener,
    addCategorySelectionEventListener,
    addWholeListEventListener,
    addWholeGridEventListener,
    addSubscriptionGridEventListener,
    addSubscriptionListEventListener,
    addBtnEventsListener,
    addCancleSubscriptionEventListener,
    addHoverUnderlineEventListener } from "./event/clickEvent.js";
import { menuInfo,
    menuCurrentPage,
    menuIdx,
    categoryTimeoutId,
    isGrid,
    isMediaWhole } from "../../pages/state/newsState.js";
import { delay, getSubscriptionList, setSubscription } from "../../utils/api.js";
import { insertSubscriptionContent, insertWholeContent } from "./html/articleListHtml.js";
import { newsState } from "../../pages/state/newsState.js";
import { addNextPageEvent } from "./event/pageEvent.js";
import { createSnackBar } from "../snackBar/snackBar.js";

// 초기화 함수
export const initArticleList = async () => {
    try {
        addEventListeners();
        newsState.setMenuIdx(0);
        setWholeData(document.querySelectorAll('.menu-btn-wrapper')[0]);
    } catch (error) {
        console.log(error)
    }
}

// 이벤트 리스너 추가 함수
const addEventListeners = () => {
    addBtnEventsListener();
    addModeSelectionEventListener();
    addViewSelectionEventListener();
    addCategorySelectionEventListener();
    addSubscriptionEventListener();
    addSubscriptionGridEventListener();
    addWholeGridEventListener();
    addWholeListEventListener();
    addSubscriptionListEventListener();
    addCancleSubscriptionEventListener();
    addHoverUnderlineEventListener();
}

export const addSubscriptionEventListener = () => {
    document.querySelector('.subscribe-btn').addEventListener('click', () => {
        const el = document.createElement('div');
        el.classList.add('snack-bar-area');
        el.innerHTML = createSnackBar('내가 구독한 언론사에 추가되었습니다.');
        document.querySelector('.article-body-wrapper').appendChild(el);
        setSubscription();

        delay(5).then(() => { !isGrid && document.querySelector('.subscription-media-btn').click() })
    })
}

// 탭 데이터 설정 함수
export const setWholeData = () => {
    newsState.setMenuCurrentPage(1);
    if (isMediaWhole) {
        newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    } else {
        newsState.setMenuLastPage(localStorage.length)
    }
    
    if (isMediaWhole) {
        insertWholeContent();
    } else {
        insertSubscriptionContent();
    }

    document.querySelectorAll('.menu-btn-wrapper').forEach((btnWrapper, idx) => {
        if (btnWrapper.querySelector('.article-menu-pages')) {
            btnWrapper.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[idx].totalPages}`;
        }
    });

    clearTimeout(categoryTimeoutId);

    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    document.querySelectorAll('.menu-btn-wrapper')[menuIdx].classList.add('menu-btn-wrapper-clicked')

    addNextPageEvent();
}

export const setSubscriptionData = () => {
    const subList = getSubscriptionList();
    
    newsState.setMenuCurrentPage(1);
    newsState.setMenuLastPage(1);
    
    insertSubscriptionContent();
    
    clearTimeout(categoryTimeoutId);
    
    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    document.querySelectorAll('.menu-btn-wrapper')[menuIdx].classList.add('menu-btn-wrapper-clicked');
    
    addNextPageEvent();
}