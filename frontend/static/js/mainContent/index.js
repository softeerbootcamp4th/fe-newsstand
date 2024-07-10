import * as alert from "../alert/alert.js"
import { removeAllChild } from "../utils/removeAllChild.js"
import * as navControl from "./navControl.js"

const id = "mainContent"
let state = {
    data: "",
    sortedNews: [],
    categories: [],
    currentArticleIndex: 0,
    currentArticleDetailIndex: 0,
    recentTimerId: 0,
    state: "all" // "myCompnies"
}
function init() {
    const generateNavTemplate = () =>
        `<ul id="mainContentNav"></ul>`

    const generateContentTemplate = () =>
        `<div id="mainContentContainer">
            <div id="mainContentArea" class="allPadding24">
                <div id="mainContentTitle" class="Layout__row alignItems-center gap10">
                    <img src="" style="width: 52.5px; height:20px;" alt="img">
                    <span>편집</span>
                    <div class="subScribeButton">
                        <img src="./static/assets/images/subscribeButton.svg" alt="Description of SVG">
                    </div>
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
        </div>`

    const generateMainContentTemplate = () =>
        `<div id="mainContent" class="main-border">
                ${generateNavTemplate()}
                ${generateContentTemplate()}
            </div>`

    return generateMainContentTemplate()
}
function domDidLoad(data) {
    showAllCompany(data)
}

function initState() {
    state.data = ""
    state.sortedNews = []
    state.categories = []
    state.currentArticleIndex = 0
    state.currentArticleDetailIndex = 0
    state.recentTimerId = 0
}

function showMyCompany(data) {
    initState()
    state.data = data
    const sortedNews = data.filter(news => news.isSubscribe).map(news => [news])
    state.sortedNews = sortedNews
    state.categories = sortedNews.map(news => news[0].name)

    navInit(state.categories)
    animationStart()
}

function showAllCompany(data) {
    initState()
    state.data = data
    state.categories = ["종합/경제", "방송/통신", "IT", "스포츠/연애", "매거진/전문지", "지역"]
    const sortedNews = state.categories.map(category => data.filter(news => news.category == category))
    state.sortedNews = sortedNews

    navInit(state.categories)
    animationStart()
}

function animationStart() {
    restartProgress();
    document.querySelector(".mainContentNavProgress").addEventListener("animationend", () => {
        console.log("start")
        nextIndex()
        animationStart()
    })
}

function contentInit(news) {
    removeAllChild(document.querySelector("#mainContentTitle"))
    let currentData = news[state.currentArticleIndex]
    let listTemplate = '<ui>'
    for (let i = 1; i < currentData[state.currentArticleDetailIndex].articles.length && i < 7; i++) {
        listTemplate += `<li>${currentData[state.currentArticleDetailIndex].articles[i].articleTitle}</li>`
    }
    listTemplate += '</ui>'
    currentData = news[state.currentArticleIndex][state.currentArticleDetailIndex];
    const getSubscribeButtonTemplate = (isSubscribed) => isSubscribed ? `<img src="./static/assets/images/Button.svg" alt="Description of SVG">` : `<img src="./static/assets/images/subscribeButton.svg" alt="Description of SVG"></img>`
    const template =
        `<div id="mainContentTitle" class="Layout__row alignItems-center gap10">
                <img src="${currentData.mediaCompanyImageURL}" style="width: 52.5px; height:20px;" alt="img">
                <span>${currentData.lastDate}편집</span>
                <div class="subscribeButton ${currentData.isSubscribe ? "isSubscribed" : ""}">
                    ${getSubscribeButtonTemplate(currentData.isSubscribe)}
                </div>
            </div>
            <div id="mainContentArticles" class="Layout__row">
                <div id="mainContentRepresentiveArticle" class="Layout__column-center">
                    <img src="${currentData.articles[0].imageURL}" alt="Description of SVG" style="width: 320px; height: 200px">
                    <span class="marginTop16">${currentData.articles[0].articleTitle}</span>
                </div>
                <div id="mainContentAritcleList">
                    ${listTemplate}
                    <div>${currentData.name} 언론사에서 직접 편집한 뉴스입니다.</div>
                </div>
            </div>`

    removeAllChild(document.querySelector("#mainContentArea"))
    document.querySelector("#mainContentArea").insertAdjacentHTML('beforeend', template)
    const subButton = document.querySelector(".subscribeButton")
    subButton.addEventListener("click", () => {
        if (!subButton.classList.contains("isSubscribed")) {
            currentData.isSubscribe = true
            subButton.classList.add("isSubscribed")
            removeAllChild(subButton)
            subButton.insertAdjacentHTML('afterbegin', `<img src="./static/assets/images/Button.svg" alt="Description of SVG">`)
            alert.showSubscribeAlert(() => {
                showMyCompany(state.data)
            })
        }
        else {
            currentData.isSubscribe = false
            subButton.classList.remove("isSubscribed")
            removeAllChild(subButton)
            subButton.insertAdjacentHTML('afterbegin', `<img src="./static/assets/images/subscribeButton.svg" alt="Description of SVG">`)
            alert.showUnSubsribeAlert(currentData.name, () => {
                showAllCompany(state.data)
            })
        }
    })
}

function navInit(categories) {
    removeAllChild(document.querySelector("#mainContentNav"))
    let template = ``
    categories.forEach((element, index) => {
        template +=
            `<li class="mainContentNavElement ${index == 0 ? "isSelected" : ""}">
                    <div id="text">${element}</div>
            </li>`
    })
    const mainContentNav = document.querySelector("#mainContentNav")
    mainContentNav.insertAdjacentHTML('afterbegin', template)
    mainContentNav.addEventListener('click', (event) => {
        const element = event.target.closest(".mainContentNavElement")
        const elements = document.querySelectorAll(".mainContentNavElement");
        getSelectedNav().classList.remove("isSelected")
        element.classList.add("isSelected")
        const elementsArray = Array.from(elements);
        state.currentArticleIndex = elementsArray.indexOf(element);
        state.currentArticleDetailIndex = 0
        restartProgress()
    })
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
    tempMap.set("showAll", function (data) {
        showAllCompany(data)
    })
    tempMap.set("showMyCompanies", function (data) {
        showMyCompany(data)
    })

    return tempMap
}

function nextIndex() {
    if (state.sortedNews[state.currentArticleIndex].length - 1 > state.currentArticleDetailIndex) {
        state.currentArticleDetailIndex += 1
    }
    else {
        state.currentArticleIndex = (state.currentArticleIndex + 1) % state.sortedNews.length
        state.currentArticleDetailIndex = 0
    }
}

function previousIndex() {
    if (state.currentArticleDetailIndex - 1 < 0) {
        state.currentArticleIndex = (state.currentArticleIndex + state.sortedNews.length - 1) % state.sortedNews.length
        state.currentArticleDetailIndex = state.sortedNews[state.currentArticleIndex].length - 1
    }
    else {
        state.currentArticleDetailIndex -= 1
    }
}


const getSelectedNav = () => document.querySelectorAll(".mainContentNavElement")[state.currentArticleIndex]

const getAllNavElements = () => document.querySelectorAll(".mainContentNavElement");

function restartProgress() {
    contentInit(state.sortedNews)
    const element = getSelectedNav();
    const navElements = getAllNavElements();
    navControl.removeSelected(navElements);
    navControl.selected(state.currentArticleDetailIndex, state.sortedNews[state.currentArticleIndex].length, element);
}


export { actions, domDidLoad, id, init }

