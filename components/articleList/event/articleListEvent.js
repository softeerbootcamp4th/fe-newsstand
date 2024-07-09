import { newsState, menuCurrentPage } from "../../../pages/state/newsState";

// 탭 데이터 설정 함수
export const setWholeData = (btnWrapper, menuIdx) => {
    newsState.setMenuIdx(menuIdx);
    newsState.setMenuCurrentPage(1);
    newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    
    if (isMediaWhole) {
        insertWholeContent(menuIdx, menuCurrentPage, menuLastPage);
    } else {
        insertSubscriptionContent(menuIdx);
    }

    document.querySelectorAll('.menu-btn-wrapper').forEach((btnWrapper, idx) => {
        if (btnWrapper.querySelector('.article-menu-pages')) {
            btnWrapper.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[idx].totalPages}`;
        }
    });

    clearTimeout(categoryTimeoutId);

    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    btnWrapper.classList.add('menu-btn-wrapper-clicked');

    handleNextPageEvent(btnWrapper, menuInfo);
}
