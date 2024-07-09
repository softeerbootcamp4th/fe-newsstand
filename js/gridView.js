import { getSubscriptionList } from "./subscribe.js";

let subscriptions = getSubscriptionList();
let newsData = [];

document.addEventListener('DOMContentLoaded', () => {
    if(!document.querySelector('.grid-view-container')) return;
    initalizeGridViewContainer();
});

export const initalizeGridViewContainer = () => {
    createGridItem();
    fetchNewsData();


}


function createGridItem() {
    const gridContainer = document.querySelector('.grid-view-container');
    
    for(let i=0; i<24; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = i;
        gridContainer.appendChild(gridItem);
    }

}

function fetchNewsData() {

    fetch("./data/allNews.json")
    .then(response => {
        if(!response.ok) {
            throw new Error('Network Error');
        }
        return response.json();
    })
    .then(data => {
        newsData = data;
        //dataType === 'subscribe' && subscriptions.length === 0 ? showInformation() :displayNews(dataType);
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });


}

function displayData() {


    newsData.forEach(news => ({


    }));

}