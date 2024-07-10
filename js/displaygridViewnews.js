let newsData = [];
let companies = [];
let currentPage = 0; // 현재 페이지를 추적하기 위한 변수
const itemsPerPage = 24; // 한 페이지당 보여줄 아이템 수

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.grid-view-container')) return;
    initializeGridViewContainerTypeAll();
});

export const initializeGridViewContainerTypeAll = () => {
    fetchNewsData();
}

function createGridItem() {
    const gridContainer = document.querySelector('.grid-view-container');
    gridContainer.innerHTML = ""; // 이전 아이템을 모두 제거

    const startIdx = currentPage * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, companies.length);

    for (let i = 0; i < itemsPerPage; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        if (i < (endIdx - startIdx)) {
            const imgElement = document.createElement('img');
            imgElement.src = companies[startIdx + i].logoUrl;
            imgElement.alt = companies[startIdx + i].company;
            gridItem.appendChild(imgElement);

            gridItem.addEventListener('click', () => {
                console.log(imgElement.getAttribute('alt'));
            })
    
        }


        gridContainer.appendChild(gridItem);
    }

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    if (currentPage === 0) {
        leftBtn.style.display = 'none';
    } else {
        leftBtn.style.display = 'block';
    }

    if ((currentPage + 1) * itemsPerPage >= companies.length) {
        rightBtn.style.display = 'none';
    } else {
        rightBtn.style.display = 'block';
    }
}

function createPaginationButtons() {
    const leftBtn = document.querySelector('.left-btn.grid');
    const rightBtn = document.querySelector('.right-btn.grid');

    rightBtn.addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < companies.length) {
            currentPage++;
            createGridItem();
        }
    });

    leftBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            createGridItem();
        }
    });

    updatePaginationButtons();
}

function fetchNewsData() {
    fetch("./data/allNews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            newsData = data;
            displayData();
            createGridItem();
            createPaginationButtons(); // 버튼 생성 및 초기 상태 업데이트
        })
        .catch(error => {
            console.error(error);
        });
}

function displayData() {
    let info = [];
    newsData.forEach(data => {
        data.news.forEach(newsItem => {
            info.push({company : newsItem.company, logoUrl : newsItem.logoUrl});
        });
    });

    companies = info;
}
