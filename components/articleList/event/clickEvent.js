import { menuInfo, isGrid, isMediaWhole, newsState } from "../../../pages/state/newsState.js";
import { initArticleList } from "../articleList.js";
import { createArticleList, renderGridSubscription, renderSubscriptionList, renderWholeGrid } from "../html/articleListHtml.js";
import { setSubscriptionData } from "../articleList.js";
import { extractMedias, getSubscriptionList } from "../../../utils/api.js";
import { setWholeData } from "../articleList.js";
import { createAlert } from "../../alert/alert.js";
import { cancleMediaSubscription } from "./pageEvent.js";
import { setSubscription } from "../../../utils/api.js";
import { createSnackBar, deleteSnackBar } from "../../snackBar/snackBar.js";

// 전체 언론사, 구독한 언론사
export const addModeSelectionEventListener = () => {
    document.querySelector('.media-wrapper').addEventListener('click', (event) => {
        if (event.target.classList.contains('mode-selection-btn')) {
            document.querySelectorAll('.mode-selection-btn').forEach(btn => btn.classList.remove('mode-selection-btn-clicked'));
            event.target.classList.add('mode-selection-btn-clicked');
        }
    });
}

let isDown = false;
let startX;
let scrollLeft;

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
    document.querySelector('.list-selection-btn').addEventListener('click', () => {
        newsState.setIsGrid(false);
    })
    document.querySelector('.grid-selection-btn').addEventListener('click', () => {
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

    document.querySelectorAll('.whole-media-btn, .list-selection-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!isGrid && isMediaWhole) {
                callback();
            }
        });
    });
}

export const addSubscriptionGridEventListener = () => {
    document.querySelectorAll('.subscription-media-btn, .grid-selection-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (isGrid && !isMediaWhole) {
                renderGridSubscription();
                addGridHoverEventListener();
                addGridUnsubscribeBtnEventListener();
            }
        })
    });
}

export const addSubscriptionListEventListener = () => {
    document.querySelectorAll('.subscription-media-btn, .list-selection-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (!isGrid && !isMediaWhole) {
                renderSubscriptionList();
            }
        })
    })
}

export const addWholeGridEventListener = () => {
    document.querySelectorAll('.whole-media-btn, .grid-selection-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (isGrid && isMediaWhole) {
                renderWholeGrid();
                addGridHoverEventListener();
                addGridSubscribeBtnEventListener();
                addGridUnsubscribeBtnEventListener();
            }
        })
    })
}

// 구독 취소
export const addCancleSubscriptionEventListener = () => {
    document.querySelector('.cancle-btn')?.addEventListener('click', () => {
        const el = document.createElement('div');
        el.classList.add('alert-area');
        el.innerHTML = createAlert();
        document.querySelector('.article-content-wrapper').appendChild(el);
        addAlertAcceptBtnEventListener();
        addAlertCancleBtnEventListener();
    })
}

export const addAlertAcceptBtnEventListener = () => {
    document.querySelector('.alert-accept-btn').addEventListener('click', () => {
        cancleMediaSubscription();
        if (isGrid) {
            renderGridSubscription();
            // Or mediaName 받아서 해당 id el remove
        } else if (isMediaWhole) {
            document.querySelector('.whole-media-btn').click()
        } else {
            document.querySelector('.subscription-media-btn').click();
        }
    })
}

export const addAlertCancleBtnEventListener = () => {
    document.querySelector('.alert-cancle-btn').addEventListener('click', () => {
        document.querySelector('.alert-area').remove();
    })
}

export const addScrollEventListener = () => {
    const scrollable = document.querySelector('.article-menu-wrapper');

    scrollable.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollable.classList.add('active');
        startX = e.pageX - scrollable.offsetLeft;
        scrollLeft = scrollable.scrollLeft;
    });
    
    scrollable.addEventListener('mouseleave', () => {
        isDown = false;
        scrollable.classList.remove('active');
    });
    
    scrollable.addEventListener('mouseup', () => {
        isDown = false;
        scrollable.classList.remove('active');
    });
    
    scrollable.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollable.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        scrollable.scrollLeft = scrollLeft - walk;
    });
}

export const addGridHoverEventListener = () => {
    // 전체 그리드에 e.target에 mouseover 시 해당 target(grid-filled-item)에 grid-overed 클래스 추가
    document.querySelectorAll('.grid-filled-item').forEach((el) => {
        el.addEventListener('mouseover', function() {
            this.querySelector('img').classList.replace('display-block', 'display-none')
            this.querySelector('div').classList.replace('display-none', 'display-block')
        })
    })

    // 전체 그리드 e.target에 mouseover 시 grid-filled-item이라면 img에 display none, button에 display block
    document.querySelectorAll('.grid-filled-item').forEach((el) => {
        el.addEventListener('mouseout', function() {
            this.querySelector('div').classList.replace('display-block', 'display-none')
            this.querySelector('img').classList.replace('display-none', 'display-block')
        })
    })
}

export const addGridUnsubscribeBtnEventListener = () => {
    document.querySelectorAll('.grid-filled-item').forEach((item) => {
        item.addEventListener('click', function() {
            if (this.querySelector('.grid-unsubscribe-btn')) {
                newsState.setNowMediaName(this.id.split('-')[1])
                const el = document.createElement('div');
                el.classList.add('alert-area');
                el.innerHTML = createAlert();
                document.querySelector('.article-body-wrapper').appendChild(el);
                addAlertAcceptBtnEventListener();
                addAlertCancleBtnEventListener();
            }
        })
    })
}

export const addGridSubscribeBtnEventListener = () => {
    document.querySelectorAll('.grid-filled-item').forEach((item) => {
        item.addEventListener('click', function() {
            if (this.querySelector('.grid-subscribe-btn')) {
                newsState.setNowMediaName(this.id.split('-')[1]);

                const el = document.createElement('div');
                el.classList.add('snack-bar-area');
                el.innerHTML = createSnackBar('내가 구독한 언론사에 추가되었습니다.');
                document.querySelector('.article-body-wrapper').appendChild(el);
                setSubscription();

                setTimeout(() => {
                    deleteSnackBar();
                    document.querySelector('.subscription-media-btn').click()
                    document.querySelector('.list-selection-btn').click()
                }, 5000);
            }
        });
    });
};