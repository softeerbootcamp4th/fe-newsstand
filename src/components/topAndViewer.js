import { processCategory, subscribeNews, handleCategoryClick } from "./fieldTab.js";
import { newsListLi } from './newsListLi.js';


const allPress = document.getElementById("allPress");
const subscribedPress = document.getElementById("subscribedPress");

const listViewIcon = document.getElementById('listViewIcon');
const gridViewIcon = document.getElementById('gridViewIcon');


const setColor = (element, color) => {
    element.setAttribute('fill', color);
}


listViewIcon.addEventListener('click', () => {
    setColor(listViewIcon, '#4362D0');
    setColor(gridViewIcon, '#14212B');
    const list = document.getElementById('NewsList');
    list.classList.remove('gridShow');
});


gridViewIcon.addEventListener('click', () => {
    setColor(listViewIcon, '#14212B');
    setColor(gridViewIcon, '#4362D0');
    const grid = document.getElementById('NewsList');
    grid.classList.add('gridShow');
});


allPress.addEventListener('click', async () => {
    subscribedPress.classList.replace('selected-bold16', 'available-medium16');
    allPress.classList.replace('available-medium16', 'selected-bold16');

    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    NewsListUl.innerHTML = '';

    const liList = newsListLi(true);
    liList.forEach((li, companyIndex) => {
        li.addEventListener('click', async () => {
            await handleCategoryClick(companyIndex, liList, true);
        });
    });

    let newsIndex = 0;
    while (true) {
        await processCategory(newsIndex, liList, true);
        newsIndex = (newsIndex + 1) % allNewsData.length;
    }
});

subscribedPress.addEventListener('click', () => {
    subscribedPress.classList.replace('available-medium16', 'selected-bold16');
    allPress.classList.replace('selected-bold16', 'available-medium16');
    subscribeNews("");
});

setColor(listViewIcon, '#4362D0');