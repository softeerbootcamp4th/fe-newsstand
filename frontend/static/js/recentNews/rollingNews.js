export function rollingNews(currentDom, data, hoverIn, hoverOut) {
    const futureDom = document.querySelector(".futureDom");

    currentDom.classList.add("currentDomStart");
    futureDom.innerText = data;
    futureDom.classList.add("futureDomStart");

    setTimeout(function () {
        currentDom.innerText = data;
        currentDom.classList.remove("currentDomStart");
        futureDom.classList.remove("futureDomStart");
    }, 1001);
}
