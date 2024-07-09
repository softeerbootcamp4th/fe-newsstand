import { menuInfo, isGrid, isMediaWhole, newsState } from "../../../pages/state/newsState.js";
import { initArticleList } from "../articleList.js";
import { createArticleList } from "../html/articleListHtml.js";
import { setSubscriptionData } from "../articleList.js";
import { extractMedias } from "../../../utils/api.js";
import { setWholeData } from "../articleList.js";

// 전체 언론사, 구독한 언론사
export const addModeSelectionEventListener = () => {
    document.querySelector('.media-wrapper').addEventListener('click', (event) => {
        if (event.target.classList.contains('mode-selection-btn')) {
            document.querySelectorAll('.mode-selection-btn').forEach(btn => btn.classList.remove('mode-selection-btn-clicked'));
            event.target.classList.add('mode-selection-btn-clicked');
        }
    });
}

// 리스트 보기, 그리드 보기
export const addViewSelectionEventListener = () => {
    document.querySelector('.icon-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.view-btn')) {
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('view-btn-clicked'));
            event.target.closest('.view-btn').classList.add('view-btn-clicked');
        }
    });
}

// 탭 버튼
export const addCategorySelectionEventListener = () => {
    document.querySelector('.article-menu-wrapper').addEventListener('click', (event) => {
        if (event.target.closest('.menu-btn-wrapper')) {
            const btnWrapper = event.target.closest('.menu-btn-wrapper');
            const idx = Array.from(btnWrapper.parentNode.children).indexOf(btnWrapper);
            newsState.setMenuIdx(idx);
            setWholeData();
        }
    });
}

// 전체 미디어, 구독 미디어, 그리드, 리스트
export const addBtnEventsListener = () => {
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
}

// 전체미디어 / 리스트
export const addWholeListEventListener = () => {
    const callback = () => {
        document.querySelector('.article-body-wrapper').innerHTML = createArticleList({ isSubscription: false });
        document.querySelectorAll('.article-header-wrapper')[1].remove();
        initArticleList();
    }

    document.querySelectorAll('.whole-media-btn, .list-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!isGrid && isMediaWhole) {
                console.log('클릭')
                callback();
            }
        });
    });
}

export const addSubscriptionGridEventListener = () => {
    const callback = () => {
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
    
    document.querySelectorAll('.subscription-media-btn, .grid-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (isGrid && !isMediaWhole) {
                callback();
            }
        })
    });
}

export const addSubscriptionListEventListener = () => {
    const callback = () => {
        document.querySelector('.article-body-wrapper').innerHTML = createArticleList({ isSubscription: true });
        document.querySelectorAll('.article-header-wrapper')[1].remove();
        addModeSelectionEventListener();
        newsState.setMenuIdx(0);
        setSubscriptionData();
        addCategorySelectionEventListener();
    }

    document.querySelectorAll('.subscription-media-btn, .list-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!isGrid && !isMediaWhole) {
                callback();
            }
        })
    })
}

export const addWholeGridEventListener = () => {
    const callback = () => {
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

    document.querySelectorAll('.whole-media-btn, .grid-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (isGrid && isMediaWhole) {
                callback();
            }
        })
    })
}