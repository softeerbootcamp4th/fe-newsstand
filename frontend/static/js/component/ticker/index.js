import { rollingEnd, rollingNews } from "./rollingNews.js";

const id = "ticker"
const state = {
    currentRecentNewsIndexLeft: 0,
    currentRecentNewsIndexRight: 0,
    currentLeftTimerId: 0,
    currentRightTimerId: 0
}
function init() {
    const generateTemplate = () =>
        `<div id="rollingHeader" class="Layout__row-between gap10">
            <div class="Layout__row width_50percent bg-subGray alignItems-center main-border">
                    <div id="rollingBox_left">
                        <div class="currentDom_left"></div>
                        <div class="futureDom_left"></div>
                    </div>
            </div>
            <div class="Layout__row width_50percent bg-subGray alignItems-center main-border">
                <div id="rollingBox_right">
                    <div class="currentDom_right"></div>
                    <div class="futureDom_right"></div>
                </div>
            </div>
        </div>`

    return generateTemplate()
}

function domDidLoad(data) {

    function rollLeftTicker() {
        const currentDom = document.querySelector(".currentDom_left");
        const template = getRollingBoxContentTemplate(data[0], state.currentRecentNewsIndexLeft)
        const futureDom = document.querySelector(".futureDom_left")
        rollingNews(currentDom, futureDom, template, true)
    }

    function settingLeftTicker() {
        const currentDom = document.querySelector(".currentDom_left");
        const futureDom = document.querySelector(".futureDom_left")
        currentDom.addEventListener("animationend", () => {
            const template = getRollingBoxContentTemplate(data[0], state.currentRecentNewsIndexLeft)
            rollingEnd(currentDom, futureDom, template)
            state.currentRecentNewsIndexLeft = (state.currentRecentNewsIndexLeft + 1) % 5
            state.currentLeftTimerId = setTimeout(() => {
                rollLeftTicker(state)
            }, 5000);
        })
    }

    function settingHoverLeftTicker() {
        const currentDom = document.querySelector(".currentDom_left");
        const rollingBox_left = document.querySelector("#rollingBox_left");
        rollingBox_left.addEventListener('mouseenter', () => {
            clearTimeout(state.currentLeftTimerId);
            currentDom.classList.add("hoverInRecentNews");
        });

        rollingBox_left.addEventListener('mouseleave', () => {
            currentDom.classList.remove("hoverInRecentNews");
            state.currentLeftTimerId = setTimeout(() => {
                rollLeftTicker(state)
            }, 5000);
        });
    }

    function settingRightTicker() {
        const currentDom = document.querySelector(".currentDom_right");
        const futureDom = document.querySelector(".futureDom_right")
        currentDom.addEventListener("animationend", () => {
            const template = getRollingBoxContentTemplate(data[1], state.currentRecentNewsIndexRight)
            rollingEnd(currentDom, futureDom, template)
            state.currentRecentNewsIndexRight = (state.currentRecentNewsIndexRight + 1) % 5
            state.currentRightTimerId = setTimeout(() => {
                rollRightTicker(state)
            }, 5000);
        })
    }

    function rollRightTicker() {
        const currentDom = document.querySelector(".currentDom_right");
        const template = getRollingBoxContentTemplate(data[1], state.currentRecentNewsIndexRight)
        const futureDom = document.querySelector(".futureDom_right")
        rollingNews(currentDom, futureDom, template, true);
    }

    function settingHoverRightTicker() {
        const currentDom = document.querySelector(".currentDom_right");
        const rollingBox_right = document.querySelector("#rollingBox_right");
        rollingBox_right.addEventListener('mouseenter', () => {
            clearTimeout(state.currentRightTimerId);
            currentDom.classList.add("hoverInRecentNews");
        });

        rollingBox_right.addEventListener('mouseleave', () => {
            currentDom.classList.remove("hoverInRecentNews");
            state.currentRightTimerId = setTimeout(() => {
                rollRightTicker(state)
            }, 5000);
        });
    }

    function settingTicker() {
        settingLeftTicker()
        rollLeftTicker()
        settingHoverLeftTicker()
        settingRightTicker()
        rollRightTicker()
        settingHoverRightTicker()
    }

    settingTicker()
}

function actions() { return new Map() }


function getRollingBoxContentTemplate(news, index) {
    const { companyName, articleTitle } = { companyName: news.name, articleTitle: news.articles[index].articleTitle };
    return `<span class="recentArticleMedia">${companyName}</span><span class="recentArticleTitle">${articleTitle}</span>`;
}

export { actions, domDidLoad, id, init };

