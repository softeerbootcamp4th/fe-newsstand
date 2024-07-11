import { subscribeNews, handleCategoryClick, init, clearIntervalVar, getSubscribedData } from "./fieldTab.js";
import { newsListLi } from './newsListLi.js';
import { newsGrid } from './newsGrid.js';

let gridIndex = 0;
const totalIconPage = 3;

const allPress = document.getElementById("allPress");
const subscribedPress = document.getElementById("subscribedPress");

const listViewIcon = document.getElementById('listViewIcon');
const gridViewIcon = document.getElementById('gridViewIcon');

const NewsList = document.getElementById('NewsList');
const gridView = document.getElementById('gridView');


const gridRightButton = document.getElementById('gridRightButton');
const gridLeftButton = document.getElementById('gridLeftButton');
const rightButton = document.getElementById('rightButton');
const leftButton = document.getElementById('leftButton');

let subscribedData = getSubscribedData();


const setColor = (element, color) => {
    element.setAttribute('fill', color);
}


listViewIcon.addEventListener('click', () => {
    setColor(listViewIcon, '#4362D0');
    setColor(gridViewIcon, '#14212B');
    NewsList.classList.remove('hidden');
    gridView.classList.remove('show');
    gridLeftButton.classList.remove('show');
    gridRightButton.classList.remove('show');
    rightButton.classList.remove('hidden');
    init();
});


gridViewIcon.addEventListener('click', () => {
    clearIntervalVar();
    gridIndex = 0;
    setColor(listViewIcon, '#14212B');
    setColor(gridViewIcon, '#4362D0');

    NewsList.className = 'hidden';
    gridView.className = 'show';

    gridRightButton.className = 'show';
    rightButton.className = 'hidden';
    leftButton.classList.remove('show');

    subscribedPress.classList.replace('selected-bold16', 'available-medium16');
    allPress.classList.replace('available-medium16', 'selected-bold16');
    newsGrid(gridIndex, false);
});


gridRightButton.addEventListener('click', () => {
    const $id = (id, element = document) => element.getElementById(id);
    const buttonClass = $id('allPress').className;
    gridLeftButton.className = 'show';
    gridIndex = gridIndex + 1;
    if (buttonClass === 'selected-bold16') {

        if (gridIndex === totalIconPage) {
            gridRightButton.classList.remove('show');
        }
        newsGrid(gridIndex, false);
    }
    else {
        subscribedData = getSubscribedData();
        const totalSubscribe = Math.floor(subscribedData.length / 24);
        if (gridIndex >= totalSubscribe) {
            gridRightButton.classList.remove('show');
        }
        newsGrid(gridIndex, true);
    }
})


gridLeftButton.addEventListener('click', () => {
    const $id = (id, element = document) => element.getElementById(id);
    const buttonClass = $id('allPress').className;
    gridRightButton.className = 'show';
    gridIndex = gridIndex - 1;
    if (gridIndex === 0) {
        gridLeftButton.classList.remove('show');
    }
    if (buttonClass === 'selected-bold16') {
        newsGrid(gridIndex, false);
    }
    else {
        newsGrid(gridIndex, true);
    }
})


allPress.addEventListener('click', async () => {
    const isNewsGrid = document.getElementById('NewsList').className;
    subscribedPress.classList.replace('selected-bold16', 'available-medium16');
    allPress.classList.replace('available-medium16', 'selected-bold16');

    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    NewsListUl.innerHTML = '';
    gridIndex = 0;

    const liList = newsListLi(true);
    liList.forEach((li, companyIndex) => {
        li.addEventListener('click', async () => {
            await handleCategoryClick(companyIndex, liList, true);
        });
    });
    if (isNewsGrid === "hidden") {
        newsGrid(gridIndex, false);
        gridLeftButton.classList.remove('show');
        gridRightButton.className = 'show';
    }
    else {
        init();
    }
});

subscribedPress.addEventListener('click', () => {
    const isNewsGrid = document.getElementById('NewsList').className;
    subscribedPress.classList.replace('available-medium16', 'selected-bold16');
    allPress.classList.replace('selected-bold16', 'available-medium16');
    subscribedData = getSubscribedData();
    gridIndex = 0;
    if (isNewsGrid === "hidden") {
        newsGrid(gridIndex, true);

        if (subscribedData.length <= 24) {
            gridRightButton.classList.remove('show');
        }
        gridLeftButton.classList.remove('show');
    }
    else {
        leftButton.className = 'show';
        subscribeNews("");
    }
});

setColor(listViewIcon, '#4362D0');