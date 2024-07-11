import { removeAllChild } from "../../utils/removeAllChild.js";

function rollingNews(currentDom, futureDom, template) {
    removeAllChild(futureDom)
    currentDom.classList.add("currentDom_Start")
    futureDom.insertAdjacentHTML('beforeend', template)
    futureDom.classList.add("futureDomStart")
}

function rollingEnd(currentDom, futureDom, template) {
    removeAllChild(currentDom)
    currentDom.insertAdjacentHTML('beforeend', template)
    currentDom.classList.remove("currentDom_Start")
    futureDom.classList.remove("futureDomStart")
}


export { rollingEnd, rollingNews };
