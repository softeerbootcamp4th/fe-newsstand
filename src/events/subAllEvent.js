import { deepFreeze } from "../utils/deepfreeze.js";

/**
 * '전체언론사', '내가 구독한 언론사'를 클릭 했을 때의 이벤트 정보 객체
 */
export const subAllClickEventInfo = deepFreeze({
    type: "click",
    listener: (event, states, element) => {
        states.setSubAll(Array.from(element.children).indexOf(event.target));
    }
})

/**
 * Renderer에서 렌더를 허용할 이벤트 이름의 목록
 */
export const subAllEventNameList = deepFreeze(["init", "clickSubAll"]);