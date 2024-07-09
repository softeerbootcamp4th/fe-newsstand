import { newsState,
    menuInfo,
    menuCurrentPage,
    isMediaWhole,
    menuIdx,
    categoryTimeoutId,
    menuLastPage,
    CATEGORY_TIMEOUT,    
} from "../../../pages/state/newsState.js";
import { insertSubscriptionContent, insertWholeContent } from "../html/articleListHtml.js";

const nextPageCallback = () => {
    // moveEvent
    if (menuCurrentPage === menuLastPage) {
        moveNextCategory();
    } else {
        moveNextPage();
    }

    // contentEvent
    if (isMediaWhole) {
        insertWholeContent();
    } else {
        insertSubscriptionContent();
    }
}

export const handleNextPageEvent = ({ isNow = false } = {}) => {
    const totalMenuLength = isMediaWhole ? menuInfo.length : localStorage.length;
    
    if (isMediaWhole) {
        newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    } else {
        newsState.setMenuLastPage(1);
    }

    if (isNow) {
        clearTimeout(categoryTimeoutId);
        nextPageCallback();
    } else {
        const timeoutId = setTimeout(nextPageCallback, CATEGORY_TIMEOUT);
        newsState.setCategoryTimeoutId(timeoutId);
    }
}

export const moveNextCategory = () => {
    const thisBtn = document.querySelector('.menu-btn-wrapper-clicked')
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    const totalMenuLength = isMediaWhole ? menuInfo.length : localStorage.length;
    
    newsState.setMenuCurrentPage(1);
    newsState.setMenuIdx(menuIdx+1);
    
    if (menuIdx === totalMenuLength) {
        newsState.setMenuIdx(0);
    }
    if (isMediaWhole) {
        nextBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[menuIdx].totalPages}`;
    }

    thisBtn.classList.remove('menu-btn-wrapper-clicked');
    nextBtn.classList.add('menu-btn-wrapper-clicked');
    handleNextPageEvent();
}

export const moveNextPage = () => {
    const thisBtn = document.querySelector('.menu-btn-wrapper-clicked')

    newsState.setMenuCurrentPage(menuCurrentPage+1);

    if (isMediaWhole) {
        thisBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    }

    thisBtn.querySelector('.fill-background').remove();
    
    const fillBackground = document.createElement('div');
    fillBackground.classList.add('fill-background');
    thisBtn.appendChild(fillBackground);
    
    handleNextPageEvent();
}

const prePageCallback = () => {
    // moveEvent
    if (menuCurrentPage === 1) {
        movePreCategory();
    } else {
        movePrePage()
    }

    // contentEvent
    if (isMediaWhole) {
        insertWholeContent();
    } else {
        insertSubscriptionContent()
    }
}

export const handlePrePageEvent = ({ isNow = false } = {}) => {
    newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);

    if (isNow) {
        clearTimeout(categoryTimeoutId);
        prePageCallback();
    } else {
        const timeoutId = setTimeout(prePageCallback, CATEGORY_TIMEOUT);
        newsState.setCategoryTimeoutId(timeoutId);
    }
}

export const movePreCategory = () => {
    const thisBtn = document.querySelector('.menu-btn-wrapper-clicked')
    const preBtn = thisBtn.previousElementSibling !== null ? thisBtn.previousElementSibling : thisBtn.parentElement.lastElementChild;
    const totalMenuLength = isMediaWhole ? menuInfo.length : localStorage.length;
    
    newsState.setMenuIdx(menuIdx-1);
    if (menuIdx === -1) {
        newsState.setMenuIdx(totalMenuLength-1)
    }
    if (isMediaWhole) {
        newsState.setMenuCurrentPage(menuInfo[menuIdx].mediaData.length)
    } else {
        newsState.setMenuCurrentPage(1)
    }
    if (isMediaWhole) {
        preBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[menuIdx].totalPages}`;
    }
    thisBtn.classList.remove('menu-btn-wrapper-clicked');
    preBtn.classList.add('menu-btn-wrapper-clicked');
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    handleNextPageEvent();
}

export const movePrePage = () => {
    const thisBtn = document.querySelector('.menu-btn-wrapper-clicked')
    newsState.setMenuCurrentPage(menuCurrentPage-1);
    if (isMediaWhole) {
        thisBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    }
    thisBtn.querySelector('.fill-background').remove();
    
    const fillBackground = document.createElement('div');
    fillBackground.classList.add('fill-background');
    thisBtn.appendChild(fillBackground);
    
    handleNextPageEvent();
}