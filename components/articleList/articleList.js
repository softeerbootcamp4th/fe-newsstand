import { MEDIA_LIST } from "../../pages/NewsPage.js";
import { newsState } from "../../pages/state/newsState.js";
import { menuInfo, menuCurrentPage, menuLastPage, menuIdx, categoryTimeoutId, isGrid, isMediaWhole, CATEGORY_TIMEOUT } from "../../pages/state/newsState.js";
import { extractDataWithMedia, extractMedias, getSubscriptionList, setSubscription } from "../../utils/api.js";
import { createMenuList,
    insertSubscriptionContent,
    createSubscriptionMenuList,
    createArticleLiPart,
    insertWholeContent,
} from "./html/articleListHtml.js";
import { handleNextPageEvent } from "./event/pageEvent.js";
import { addModeSelectionEventListener,
    addViewSelectionEventListener,
    addCategorySelectionEventListener,
    addWholeListEventListener,
    addWholeGridEventListener,
    addSubscriptionGridEventListener,
    addSubscriptionListEventListener,
    addBtnEventsListener,
    addCancleSubscriptionEventListener,
    addScrollEventListener,
} from "./event/clickEvent.js";
import { checkSubscription } from "./event/pageEvent.js";

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
}

export const addSubscriptionEventListener = () => {
    document.querySelector('.subscribe-btn').addEventListener('click', () => {
        setSubscription();
        alert('구독')
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

    handleNextPageEvent();
}

export const setSubscriptionData = () => {
    const subList = getSubscriptionList();
    
    newsState.setMenuCurrentPage(1);
    newsState.setMenuLastPage(1);
    
    insertSubscriptionContent();
    
    clearTimeout(categoryTimeoutId);
    
    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    document.querySelectorAll('.menu-btn-wrapper')[menuIdx].classList.add('menu-btn-wrapper-clicked');
    
    handleNextPageEvent();
}