import headers from "../data/headers.js"

const newsHeader = Array.from(document.getElementsByClassName("content-sub-header__news-header"));
const hiddenHeader = Array.from(document.getElementsByClassName("content-sub-header__news-header_invisible"));
let time = setInterval(animateHeaders, 5000);
let one, two, three, four;

newsHeader.forEach((element) => {
    element.addEventListener("mouseover", onHoverHandler);
})

hiddenHeader.forEach((element) => {
    element.addEventListener("mouseover", onHoverHandler);
})

function onHoverHandler() {
    one.cancel();
}

function setLeftName() {
    time++;
    newsHeader[0].innerHTML = headers.연합뉴스1[time % 10];
    hiddenHeader[0].innerHTML = headers.연합뉴스1[(time + 1) % 10];
}

function setRightName() {
    newsHeader[1].innerHTML = headers.연합뉴스2[time % 10];
    hiddenHeader[1].innerHTML = headers.연합뉴스2[(time + 1) % 10];
}

function animateHeaders() {
    one = newsHeader[0].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    

    two = hiddenHeader[0].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    
    setTimeout(animateRightHeaders, 1000)
}

function animateRightHeaders() {
    setLeftName();

    three = newsHeader[1].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    

    four = hiddenHeader[1].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    

    setTimeout(setRightName, 1000);
}

setLeftName();
setRightName();


