import { removeAllChild } from "../utils/removeAllChild.js"
import * as navControl from "./navControl.js"

const id = "mainContent"
let state = {
    sortedNews: [],
    categories: ["종합/경제", "방송/통신", "IT", "스포츠/연애", "매거진/전문지", "지역"],
    currentArticleIndex: 0,
    currentArticleDetailIndex: 0,
    recentTimerId: 0
}
function init() {
    const generateNavTemplate = () =>
        `<ul id="mainContentNav"></ul>`

    const generateContentTemplate = () =>
        `<div id="mainContentContainer">
            <div id="previousMainContentArea" class="allPadding24"></div>
            <div id="mainContentArea" class="allPadding24">
                <div id="mainContentTitle" class="Layout__row alignItems-center gap10">
                    <img src="" style="width: 52.5px; height:20px;" alt="img">
                    <span>편집</span>
                    <img class="modeImg" src="./static/assets/images/subscribeButton.svg" alt="Description of SVG">
                </div>
                <div id="mainContentArticles" class="Layout__row">
                    <div id="mainContentRepresentiveArticle" class="Layout__column-center">
                        <img src="" alt="Description of SVG" style="width: 320px; height: 200px">
                        <span class="marginTop16"></span>
                    </div>
                    <div id="mainContentAritcleList">
                        <ui></ui>
                        <div>언론사에서 직접 편집한 뉴스입니다.</div>
                    </div>
                </div>
            </div>
            <div id="nextMainContentArea" class="allPadding24"></div>
        </div>`

    const generateMainContentTemplate = () =>
        `<div id="mainContent" class="main-border">
                ${generateNavTemplate()}
                ${generateContentTemplate()}
            </div>`

    return generateMainContentTemplate()
}
function domDidLoad(data) {
    // 여기서 fetch도 할 예정
    allCompany(data)
}

function allCompany(data) {
    const sortedNews = state.categories.map(category => data.filter(news => news.category == category))
    state.sortedNews = sortedNews

    function navInit() {
        let template = ``
        state.categories.forEach((element, index) => {
            template +=
                `<li class="mainContentNavElement ${index == 0 ? "isSelected" : ""}">
                        <div id="text">${element}</div>
                </li>`
        })
        const mainContentNav = document.querySelector("#mainContentNav")
        mainContentNav.insertAdjacentHTML('afterbegin', template)
        mainContentNav.addEventListener('click', (event) => {
            const element = event.target
            const elements = document.querySelectorAll(".mainContentNavElement");
            getSelectedNav().classList.remove("isSelected")
            element.classList.add("isSelected")
            const elementsArray = Array.from(elements);
            state.currentArticleIndex = elementsArray.indexOf(element);
            state.currentArticleDetailIndex = 0
            restartProgress()
        })
    }

    function contentInit() {
        let currentData = state.sortedNews[state.currentArticleIndex]
        let listTemplate = '<ui>'
        for (let i = 1; i < currentData[state.currentArticleIndex].articles.length && i < 7; i++) {
            listTemplate += `<li>${currentData[state.currentArticleIndex].articles[i].articleTitle}</li>`
        }
        listTemplate += '</ui>'
        currentData = sortedNews[state.currentArticleIndex][state.currentArticleDetailIndex];
        const template =
            `<div id="mainContentTitle" class="Layout__row alignItems-center gap10">
                    <img src="${currentData.mediaCompanyImageURL}" style="width: 52.5px; height:20px;" alt="img">
                    <span>${currentData.lastDate}편집</span>
                    <img class="subScribeButton" src="./static/assets/images/${currentData.isSubscribe ? "Button.svg" : "subscribeButton.svg"}" alt="Description of SVG">
                </div>
                <div id="mainContentArticles" class="Layout__row">
                    <div id="mainContentRepresentiveArticle" class="Layout__column-center">
                        <img src="${currentData.articles[state.currentArticleDetailIndex].imageURL}" alt="Description of SVG" style="width: 320px; height: 200px">
                        <span class="marginTop16">${currentData.articles[state.currentArticleDetailIndex].articleTitle}</span>
                    </div>
                    <div id="mainContentAritcleList">
                        ${listTemplate}
                        <div>${currentData.name} 언론사에서 직접 편집한 뉴스입니다.</div>
                    </div>
                </div>`

        removeAllChild(document.querySelector("#mainContentArea"))
        document.querySelector("#mainContentArea").insertAdjacentHTML('beforeend', template)
    }

    function animationStart() {
        restartProgress();
        document.querySelector(".mainContentNavProgress").addEventListener("animationend", () => {
            nextIndex()
            restartProgress()
        })
    }

    navInit()
    contentInit()
    animationStart()
}

function actions() {
    const tempMap = new Map()
    tempMap.set("nextArticle", function () {
        nextIndex()
        restartProgress()
    })
    tempMap.set("previousArticle", function () {
        previousIndex()
        restartProgress()
    })

    return tempMap
}

function nextIndex() {
    if (state.sortedNews[state.currentArticleIndex].length - 1 > state.currentArticleDetailIndex) {
        state.currentArticleDetailIndex += 1
    }
    else {
        state.currentArticleIndex = state.currentArticleIndex + 1 % state.sortedNews.length
        state.currentArticleDetailIndex = 0
    }
}

function previousIndex() {
    if (state.currentArticleDetailIndex - 1 < 0) {
        state.currentArticleIndex = state.currentArticleIndex + state.sortedNews.length - 1 % state.sortedNews.length
        state.currentArticleDetailIndex = state.sortedNews[state.currentArticleIndex].length - 1
    }
    else {
        state.currentArticleDetailIndex -= 1
    }
}


const getSelectedNav = () => document.querySelector(".mainContentNavElement.isSelected")

const getAllNavElements = () => document.querySelectorAll(".mainContentNavElement");

function restartProgress() {
    const element = getSelectedNav();
    const navElements = getAllNavElements();
    navControl.removeSelected(navElements);
    console.log(state.sortedNews[state.currentArticleIndex])
    navControl.selected(state.currentArticleDetailIndex, state.sortedNews[state.currentArticleIndex].length, element);
}




export { actions, domDidLoad, id, init }

