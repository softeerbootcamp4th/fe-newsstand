import { deepFreeze } from "../utils/deepfreeze.js";

/**
 * 초기화 이벤트 정보 객체
 */
export const InitEventInfo = deepFreeze({
    type: "DOMContentLoaded",
    listener: (event, states, element) => {
        states.forEach((state) => {
            state.setInitialState();
        })
    }
})