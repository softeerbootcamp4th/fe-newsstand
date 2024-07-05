
export function rollingNews(currentDom, template, isLeft) {
    const futureDom = document.querySelector(isLeft ? ".futureDom_left" : ".futureDom_right");
    while (futureDom.firstChild) {
        futureDom.removeChild(futureDom.firstChild);
    }
    currentDom.classList.add("currentDom_Start");
    futureDom.insertAdjacentHTML('beforeend', template);
    futureDom.classList.add("futureDomStart");

    setTimeout(function () {
        while (currentDom.firstChild) {
            currentDom.removeChild(currentDom.firstChild);
        }
        currentDom.insertAdjacentHTML('beforeend', template);
        currentDom.classList.remove("currentDom_Start");
        futureDom.classList.remove("futureDomStart");
    }, 1000);
}
