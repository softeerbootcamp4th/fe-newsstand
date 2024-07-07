import headers from "../../data/headers.js"

const newsHeader = Array.from(document.getElementsByClassName("content-sub-header__news-header"));
const hiddenHeader = Array.from(document.getElementsByClassName("content-sub-header__news-header_invisible"));

let leftTime = 0, rightTime = 0;
let intervalLeft = setInterval(animateLeftHeaders, 5000);
let intervalRight;

setTimeout(() => {
    intervalRight = setInterval(animateRightHeaders, 5000);
}, 1000);

let leftVisibleHeader, leftHiddenHeader, rightVisibleHeader, rightHiddenHeader, leftName, rightName;

newsHeader[0].addEventListener("mouseover", onHoverLeftHandler);
newsHeader[0].addEventListener("mouseout", continueLeftAnimate);

newsHeader[1].addEventListener("mouseover", onHoverRightHandler);
newsHeader[1].addEventListener("mouseout", continueRightAnimate);

hiddenHeader[0].addEventListener("mouseover", onHoverLeftHandler);
hiddenHeader[0].addEventListener("mouseout", continueLeftAnimate);

hiddenHeader[1].addEventListener("mouseover", onHoverRightHandler);
hiddenHeader[1].addEventListener("mouseout", continueRightAnimate);

function onHoverLeftHandler() {
    leftHiddenHeader.cancel();
    leftVisibleHeader.cancel();
    clearTimeout(leftName);
    clearInterval(intervalLeft);
}

function onHoverRightHandler() {
    rightHiddenHeader.cancel();
    rightVisibleHeader.cancel();
    clearTimeout(rightName);
    clearInterval(intervalRight);
}

function continueLeftAnimate() {
    intervalLeft = setInterval(animateLeftHeaders, 5000)
}

function continueRightAnimate() {
    intervalRight = setInterval(animateRightHeaders, 5000)
}

function setLeftName() {
    leftTime++;
    newsHeader[0].innerHTML = headers.연합뉴스1[leftTime % 10];
    hiddenHeader[0].innerHTML = headers.연합뉴스1[(leftTime + 1) % 10];
}

function setRightName() {
    rightTime++;
    newsHeader[1].innerHTML = headers.연합뉴스2[rightTime % 10];
    hiddenHeader[1].innerHTML = headers.연합뉴스2[(rightTime + 1) % 10];
}

function animateLeftHeaders() {
    leftVisibleHeader = newsHeader[0].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    

    leftHiddenHeader = hiddenHeader[0].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    ); 
    leftName = setTimeout(setLeftName, 1000)
}

function animateRightHeaders() {
    rightVisibleHeader = newsHeader[1].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    

    rightHiddenHeader = hiddenHeader[1].animate(
        [
            {transform : "translateY(0)"},
            {transform : "translateY(49px)"}
        ],
        {duration:1000}
    );    

    rightName = setTimeout(setRightName, 1000);
}

setLeftName();
setRightName();