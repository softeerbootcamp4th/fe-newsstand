import { deepFreeze } from "../utils/deepfreeze.js";

/**
 * 화살표를 클릭 했을 때의 이벤트 정보 객체
 */
export const arrowClickEventInfo = deepFreeze({
    type: "click",
    listener: (event, states, element) => {
        if (event.target.classList.contains('news-list__btn-left')) {
            states.setCurrentNewsListIndex('minus');
        } else if (event.target.classList.contains('news-list__btn-right')) {
            states.setCurrentNewsListIndex('plus');
        }
    }
})

/**
 * Renderer에서 렌더를 허용할 이벤트 이름의 목록
 */
export const newsListEventNameList = deepFreeze(["clickCategory", "clickSubAll", "clickArrow"]);