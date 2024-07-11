import { deepFreeze } from "../utils/deepfreeze.js";

/**
 * 카테고리를 클릭 했을 때의 이벤트 정보 객체
 */
export const categoryClickEventInfo = deepFreeze({
    type: "click",
    listener: (event, states, element) => {
        states.setCategory(Array.from(element.children).indexOf(event.target))
    }
})

/**
 * Renderer에서 렌더를 허용할 이벤트 이름의 목록
 */
export const categoryEventNameList = deepFreeze(["clickCategory", "clickSubAll"]);