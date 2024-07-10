export const categoryClickEventInfo = {
    type: "click",
    listener: (event, states, element) => {
        states.setCategory(Array.from(element.children).indexOf(event.target))
    }
}

export const categoryOnloadEventInfo = {
    type: "load",
    listener: (event, states, element) => {
        console.log(1)
    }
}