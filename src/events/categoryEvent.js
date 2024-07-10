import { deepFreeze } from "../utils/deepfreeze.js";

export const categoryClickEventInfo = deepFreeze({
    type: "click",
    listener: (event, states, element) => {
        states.setCategory(Array.from(element.children).indexOf(event.target))
    }
})

export const categoryOnloadEventInfo = deepFreeze({
    type: "load",
    listener: (event, states, element) => {
        console.log(1)
    }
})

export const categoryEventTypeList = deepFreeze(["load", "click"]);