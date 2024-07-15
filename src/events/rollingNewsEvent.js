import { deepFreeze } from "../utils/deepfreeze.js";

export const rollingNewsEventInfo = deepFreeze({
    type: "mouseover",
    listener: (event, states, element) => {
        states.setRollingNews();
    }
})

export const newsRolledEventInfo = deepFreeze({
    type: "newsRolled",
    listener: (event, states, element) => {
        if (event.detail.position === "right") states.setRollingNews("right");
        else states.setRollingNews("left")
    }
})

export const rollingNewsEventNameList = deepFreeze(["init", "hoverRollingNews", "newsRolledFinished"])