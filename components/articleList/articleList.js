import { MEDIA_LIST, CATEGORY_TIMEOUT } from "../../pages/NewsPage.js";
import { newsState } from "../../pages/state/newsState.js";
import { menuInfo, menuCurrentPage, menuLastPage, menuIdx, categoryTimeoutId, isGrid, isMediaWhole } from "../../pages/state/newsState.js";
import { extractDataWithMedia, extractMedias } from "../../utils/api.js";
import { createMenuList,
    insertSubscriptionContent,
    createSubscriptionMenuList,
    createArticleLiPart,
    insertWholeContent,
} from "./html/articleListHtml.js";

// 초기화 함수
export const initArticleList = async () => {
    try {
        addEventListeners();
        setWholeData(document.querySelectorAll('.menu-btn-wrapper')[0], 0);
    } catch (error) {
        console.log(error)
    }
}

// 초기 UI 렌더링 함수
export const createArticleList = () => {
    return `
        <div class="articleList-wrapper">
            <div class="article-header-wrapper flex-row-between">
                <div class="media-wrapper inline-tag">
                    <button class="btn whole-media-btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                    <button class="btn subscription-media-btn mode-selection-btn">내가 구독한 언론사</button>
                </div>
                <div class="icon-wrapper inline-tag flex-row-between">
                    <button class="btn list-btn view-btn view-btn-clicked">
                        <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                    </button>
                    <button class="btn grid-btn view-btn">
                        <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                    </button>
                </div>
            </div>
            <div class="article-body-wrapper">
                <div class="article-menu-wrapper">
                    ${createMenuList()}
                </div>
                <div class="article-wrapper">
                    <div class="article-selection-wrapper"></div>
                    <div class="article-content-wrapper">
                        <div class="content-header-wrapper flex-row">
                            <img class="media-img" src="" alt="">
                            <h4 class="updated-date-tag" style="font-size: 12px; font-weight: 400;"> 편집</h4>
                            <button class="subscribe-btn btn">+ 구독하기</button>
                        </div>
                        <div class="content-body-wrapper flex-row-between">
                            <aside class="thumbnail-part">
                                <img class="thumbnail-img" src="" alt="" width="320px" height="200px">
                                <p class="thumbnail-detail">ABC</p>
                            </aside>
                            <ul class="article-li-part flex-col-between">
                                <p class="li-part-info"></p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
    


// 이벤트 리스너 추가 함수
const addEventListeners = () => {
    document.querySelector('.whole-media-btn').addEventListener('click', () => {
        newsState.setIsMediaWhole(true);
    })
    document.querySelector('.subscription-media-btn').addEventListener('click', () => {
        newsState.setIsMediaWhole(false);
    })
    document.querySelector('.list-btn').addEventListener('click', () => {
        newsState.setIsGrid(false);
    })
    document.querySelector('.grid-btn').addEventListener('click', () => {
        newsState.setIsGrid(true);
    })
    

    addModeSelectionEventListener();
    addViewSelectionEventListener();
    addCategorySelectionEventListener();
    addSubscriptionEventListener();
    addSubscriptionGridBtnEventListener();
    addWholeGridEventListener();
    addWholeListBtnEventListener();
    addSubscriptionListBtnEventListener();
}

const addModeSelectionEventListener = () => {
    // Mode selection event
    document.querySelector('.media-wrapper').addEventListener('click', (event) => {
        if (event.target.classList.contains('mode-selection-btn')) {
            document.querySelectorAll('.mode-selection-btn').forEach(btn => btn.classList.remove('mode-selection-btn-clicked'));
            event.target.classList.add('mode-selection-btn-clicked');
        }
    });
}

const addViewSelectionEventListener = () => {
    // View selection event
    document.querySelector('.icon-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.view-btn')) {
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('view-btn-clicked'));
            event.target.closest('.view-btn').classList.add('view-btn-clicked');
        }
    });
}

const addCategorySelectionEventListener = () => {
    // Category selection event
    document.querySelector('.article-menu-wrapper').addEventListener('click', (event) => {
        console.log('click')
        if (event.target.closest('.menu-btn-wrapper')) {
            const btnWrapper = event.target.closest('.menu-btn-wrapper');
            const idx = Array.from(btnWrapper.parentNode.children).indexOf(btnWrapper);
            setWholeData(btnWrapper, idx);
        }
    });
}
 
const addSubscriptionEventListener = () => {
    document.querySelector('.subscribe-btn').addEventListener('click', () => {
        localStorage.setItem(menuInfo[menuIdx].mediaData[menuCurrentPage-1].mediaName, true)
        alert('구독')
        // alert 띄우고 없애는 이벤트
    })
}

const addWholeListBtnEventListener = () => {
    document.querySelector('.whole-media-btn').addEventListener('click', () => {
        if (!isGrid && isMediaWhole) {
            document.querySelector('.article-body-wrapper').innerHTML = createArticleList();
            document.querySelectorAll('.article-header-wrapper')[1].remove();
            initArticleList();
        }
    })
    document.querySelector('.list-btn').addEventListener('click', () => {
        if (!isGrid && isMediaWhole) {
            document.querySelector('.article-body-wrapper').innerHTML = createArticleList();
            document.querySelectorAll('.article-header-wrapper')[1].remove();
            initArticleList();
        }
    })
}

const addSubscriptionGridBtnEventListener = () => {
    document.querySelector('.subscription-media-btn').addEventListener('click', () => {
        console.log(isGrid, isMediaWhole)
        if (isGrid && !isMediaWhole) {
            const subList = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
            
            // Generate grid items from the subList
            const gridItems = subList.map(mediaName => `
                <div class="grid-item">
                    <img src="/images/logos/${mediaName}.png" height="20px" />
                </div>
            `).join('');
            
            // Add remaining empty grid items to complete the 24 items (if necessary)
            const totalGridItems = 24;
            const emptyGridItemsCount = totalGridItems - subList.length;
            const emptyGridItems = new Array(emptyGridItemsCount).fill('<div class="grid-item"></div>').join('');
    
            document.querySelector('.article-body-wrapper').innerHTML = `
                <div class="grid-container">
                    ${gridItems}
                    ${emptyGridItems}
                </div>
            `;
        }
    });
    document.querySelector('.grid-btn').addEventListener('click', () => {
        console.log(isGrid, isMediaWhole)
        if (isGrid && !isMediaWhole) {
            const subList = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
            
            // Generate grid items from the subList
            const gridItems = subList.map(mediaName => `
                <div class="grid-item">
                    <img src="/images/logos/${mediaName}.png" height="20px" />
                </div>
            `).join('');
            
            // Add remaining empty grid items to complete the 24 items (if necessary)
            const totalGridItems = 24;
            const emptyGridItemsCount = totalGridItems - subList.length;
            const emptyGridItems = new Array(emptyGridItemsCount).fill('<div class="grid-item"></div>').join('');
    
            document.querySelector('.article-body-wrapper').innerHTML = `
                <div class="grid-container">
                    ${gridItems}
                    ${emptyGridItems}
                </div>
            `;
        }
    });
}

const addSubscriptionListBtnEventListener = () => {
    document.querySelector('.subscription-media-btn').addEventListener('click', () => {
        if (!isGrid && !isMediaWhole) {
            document.querySelector('.article-body-wrapper').innerHTML = `
        <div class="articleList-wrapper">
            <div class="article-header-wrapper flex-row-between">
                <div class="media-wrapper inline-tag">
                    <button class="btn whole-media-btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                    <button class="btn subscription-media-btn mode-selection-btn">내가 구독한 언론사</button>
                </div>
                <div class="icon-wrapper inline-tag flex-row-between">
                    <button class="btn list-btn view-btn view-btn-clicked">
                        <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                    </button>
                    <button class="btn grid-btn view-btn">
                        <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                    </button>
                </div>
            </div>
            <div class="article-body-wrapper">
                <div class="article-menu-wrapper">
                    ${createSubscriptionMenuList()}
                </div>
                <div class="article-wrapper">
                    <div class="article-selection-wrapper"></div>
                    <div class="article-content-wrapper">
                        <div class="content-header-wrapper flex-row">
                            <img class="media-img" src="" alt="">
                            <h4 class="updated-date-tag" style="font-size: 12px; font-weight: 400;"> 편집</h4>
                            <button class="subscribe-btn btn">+ 구독하기</button>
                        </div>
                        <div class="content-body-wrapper flex-row-between">
                            <aside class="thumbnail-part">
                                <img class="thumbnail-img" src="" alt="" width="320px" height="200px">
                                <p class="thumbnail-detail">ABC</p>
                            </aside>
                            <ul class="article-li-part flex-col-between">
                                <p class="li-part-info"></p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        }
        document.querySelectorAll('.article-header-wrapper')[1].remove();
        addModeSelectionEventListener();
        setSubscriptionData(document.querySelectorAll('.menu-btn-wrapper')[0], 0)
        addCategorySelectionEventListener();
    })
    document.querySelector('.list-btn').addEventListener('click', () => {
        if (!isGrid && !isMediaWhole) {
            document.querySelector('.article-body-wrapper').innerHTML = `
        <div class="articleList-wrapper">
            <div class="article-header-wrapper flex-row-between">
                <div class="media-wrapper inline-tag">
                    <button class="btn whole-media-btn mode-selection-btn mode-selection-btn-clicked">전체 언론사</button>
                    <button class="btn subscription-media-btn mode-selection-btn">내가 구독한 언론사</button>
                </div>
                <div class="icon-wrapper inline-tag flex-row-between">
                    <button class="btn list-btn view-btn view-btn-clicked">
                        <img src="/icons/list-view.png" alt="" width="24px" height="24px">
                    </button>
                    <button class="btn grid-btn view-btn">
                        <img src="/icons/grid-view.png" alt="" width="24px" height="24px">
                    </button>
                </div>
            </div>
            <div class="article-body-wrapper">
                <div class="article-menu-wrapper">
                    ${createSubscriptionMenuList()}
                </div>
                <div class="article-wrapper">
                    <div class="article-selection-wrapper"></div>
                    <div class="article-content-wrapper">
                        <div class="content-header-wrapper flex-row">
                            <img class="media-img" src="" alt="">
                            <h4 class="updated-date-tag" style="font-size: 12px; font-weight: 400;"> 편집</h4>
                            <button class="subscribe-btn btn">+ 구독하기</button>
                        </div>
                        <div class="content-body-wrapper flex-row-between">
                            <aside class="thumbnail-part">
                                <img class="thumbnail-img" src="" alt="" width="320px" height="200px">
                                <p class="thumbnail-detail">ABC</p>
                            </aside>
                            <ul class="article-li-part flex-col-between">
                                <p class="li-part-info"></p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        }
        document.querySelectorAll('.article-header-wrapper')[1].remove();
        addModeSelectionEventListener();
        setSubscriptionData(document.querySelectorAll('.menu-btn-wrapper')[0], 0)
        addCategorySelectionEventListener();
    })
}

const addWholeGridEventListener = () => {
    document.querySelector('.whole-media-btn').addEventListener('click', () => {
        if (isGrid && isMediaWhole) {
            const subList = extractMedias(menuInfo);
            
            // Generate grid items from the subList
            const gridItems = subList.map(mediaName => `
                <div class="grid-item">
                    <img src="/images/logos/${mediaName}.png" height="20px" />
                </div>
            `).join('');
            
            // Add remaining empty grid items to complete the 24 items (if necessary)
            const totalGridItems = 24;
            const emptyGridItemsCount = totalGridItems - subList.length;
            const emptyGridItems = new Array(emptyGridItemsCount).fill('<div class="grid-item"></div>').join('');
    
            document.querySelector('.article-body-wrapper').innerHTML = `
                <div class="grid-container">
                    ${gridItems}
                    ${emptyGridItems}
                </div>
            `;
        }
    });
    document.querySelector('.grid-btn').addEventListener('click', () => {
        if (isGrid && isMediaWhole) {
            const subList = extractMedias(menuInfo);
            
            // Generate grid items from the subList
            const gridItems = subList.map(mediaName => `
                <div class="grid-item">
                    <img src="/images/logos/${mediaName}.png" height="20px" />
                </div>
            `).join('');
            
            // Add remaining empty grid items to complete the 24 items (if necessary)
            const totalGridItems = 24;
            const emptyGridItemsCount = totalGridItems - subList.length;
            const emptyGridItems = new Array(emptyGridItemsCount).fill('<div class="grid-item"></div>').join('');
    
            document.querySelector('.article-body-wrapper').innerHTML = `
                <div class="grid-container">
                    ${gridItems}
                    ${emptyGridItems}
                </div>
            `;
        }
    });
}

// // 콘텐츠 삽입 함수
// const insertWholeContent = (menuIdx, menuCurrentPage, menuLastPage) => {
//     const nowInfo = menuInfo[menuIdx].mediaData[menuCurrentPage - 1];
    
//     if (document.querySelector('.article-menu-pages') !== null) {
//         document.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
//     }
//     document.querySelector('.media-img').src = `/images/logos/${nowInfo.mediaName}.png`;
//     document.querySelector('.updated-date-tag').innerText = `${nowInfo.updatedDate} 편집`;
//     document.querySelector('.thumbnail-img').src = `/images/logos/${MEDIA_LIST[menuCurrentPage]}.png`;
//     document.querySelector('.thumbnail-detail').innerText = `${nowInfo.thumbnailDetail}`;
//     document.querySelector('.article-li-part').innerHTML = `
//         ${createArticleLiPart()}
//         <p class="li-part-info">${nowInfo.mediaName}에서 직접 편집한 뉴스입니다.</p>
//     `;
// }

// 페이지 이동 함수
export const handleNextPageEvent = (thisBtn, menuInfo, isNow) => {
    // param에서 thisBtn 제거
    thisBtn = document.querySelector('.menu-btn-wrapper-clicked')
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    const totalMenuLength = isMediaWhole ? menuInfo.length : localStorage.length;
    if (isMediaWhole) {
        newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    } else {
        newsState.setMenuLastPage(1);
    }

    if (isNow) {
        clearTimeout(categoryTimeoutId);
        const timeoutId = setTimeout(() => {
            if (menuCurrentPage === menuLastPage) {
                console.log('nextCategory')
                moveNextCategory(thisBtn, nextBtn, totalMenuLength);
            } else {
                console.log('nextPage')
                moveNextPage(thisBtn);
            }
            if (isMediaWhole) {
                insertWholeContent();
            } else {
                insertSubscriptionContent();
            }
        }, 1);
        newsState.setCategoryTimeoutId(timeoutId);
    } else {
        const timeoutId = setTimeout(() => {
            if (menuCurrentPage === menuLastPage) {
                moveNextCategory(thisBtn, nextBtn, totalMenuLength);
            } else {
                moveNextPage(thisBtn);
            }
            if (isMediaWhole) {
                insertWholeContent();
            } else {
                insertSubscriptionContent();
            }
        }, CATEGORY_TIMEOUT);
        newsState.setCategoryTimeoutId(timeoutId);
    }
}

export const handlePrePageEvent = (thisBtn, menuInfo, isNow) => {
    thisBtn = document.querySelector('.menu-btn-wrapper-clicked')
    const preBtn = thisBtn.previousElementSibling !== null ? thisBtn.previousElementSibling : thisBtn.parentElement.lastElementChild;
    const totalMenuLength = isMediaWhole ? menuInfo.length : localStorage.length;
    newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);

    if (isNow) {
        clearTimeout(categoryTimeoutId);
        const timeoutId = setTimeout(() => {
            if (menuCurrentPage === 1) {
                console.log('preCategory')
                movePreCategory(thisBtn, preBtn, totalMenuLength);
            } else {
                console.log('prePage')
                movePrePage(thisBtn)
            }
            if (isMediaWhole) {
                insertWholeContent();
            } else {
                insertSubscriptionContent()
            }
        }, 1);
        newsState.setCategoryTimeoutId(timeoutId);
    } else {
        const timeoutId = setTimeout(() => {
            if (menuCurrentPage === 1) {
                console.log('preCategory')
                movePreCategory(thisBtn, preBtn, totalMenuLength);
            } else {
                console.log('prePage')
                movePrePage(thisBtn)
            }
            if (isMediaWhole) {
                insertWholeContent();
            } else {
                insertSubscriptionContent()
            }
        }, CATEGORY_TIMEOUT);
        newsState.setCategoryTimeoutId(timeoutId);
    }
}

const moveNextCategory = (thisBtn, nextBtn) => {
    const totalMenuLength = isMediaWhole ? menuInfo.length : localStorage.length;
    newsState.setMenuCurrentPage(1);
    newsState.setMenuIdx(menuIdx+1);
    if (menuIdx === totalMenuLength) {
        newsState.setMenuIdx(0);
    }
    if (nextBtn.querySelector('.article-menu-pages') !== null) {
        nextBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[menuIdx].totalPages}`;
    }
    thisBtn.classList.remove('menu-btn-wrapper-clicked');
    nextBtn.classList.add('menu-btn-wrapper-clicked');
    handleNextPageEvent(nextBtn, menuInfo);
}

const movePreCategory = (thisBtn, preBtn) => {
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
    if (preBtn.querySelector('.article-menu-pages')) {
        preBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuInfo[menuIdx].totalPages}`;
    }
    thisBtn.classList.remove('menu-btn-wrapper-clicked');
    preBtn.classList.add('menu-btn-wrapper-clicked');
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    handleNextPageEvent(nextBtn, menuInfo);
}

const moveNextPage = (thisBtn) => {
    console.log(thisBtn)
    newsState.setMenuCurrentPage(menuCurrentPage+1);
    if (thisBtn.querySelector('.article-menu-pages') !== null) {
        thisBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    }
    thisBtn.querySelector('.fill-background').remove();
    
    const fillBackground = document.createElement('div');
    fillBackground.classList.add('fill-background');
    thisBtn.appendChild(fillBackground);
    
    handleNextPageEvent(thisBtn, menuInfo);
}

const movePrePage = (thisBtn) => {
    newsState.setMenuCurrentPage(menuCurrentPage-1);
    if (thisBtn.querySelector('.article-menu-pages')) {
        thisBtn.querySelector('.article-menu-pages').innerText = `${menuCurrentPage} / ${menuLastPage}`;
    }
    thisBtn.querySelector('.fill-background').remove();
    
    const fillBackground = document.createElement('div');
    fillBackground.classList.add('fill-background');
    thisBtn.appendChild(fillBackground);
    
    handleNextPageEvent(thisBtn, menuInfo);
}

// 탭 데이터 설정 함수
const setWholeData = (btnWrapper, menuIdx) => {
    newsState.setMenuIdx(menuIdx);
    newsState.setMenuCurrentPage(1);
    newsState.setMenuLastPage(menuInfo[menuIdx].totalPages);
    
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
    btnWrapper.classList.add('menu-btn-wrapper-clicked');

    handleNextPageEvent(btnWrapper, menuInfo);
}

const setSubscriptionData = (btnWrapper, menuIdx) => {
    const subList = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
    newsState.setMenuIdx(menuIdx)
    newsState.setMenuCurrentPage(1);
    newsState.setMenuLastPage(1);
    
    insertSubscriptionContent();
    
    console.log(btnWrapper)
    
    clearTimeout(categoryTimeoutId);
    
    document.querySelectorAll('.menu-btn-wrapper').forEach(b => b.classList.remove('menu-btn-wrapper-clicked'));
    btnWrapper.classList.add('menu-btn-wrapper-clicked');
    
    handleNextPageEvent(btnWrapper, menuInfo);
}