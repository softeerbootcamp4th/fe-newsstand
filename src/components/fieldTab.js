import { data } from './news.js';
import { pressInfoButton } from './button.js';

let currentIntervalId = null; // 현재 실행 중인 intervalId
let currentTimeoutId = null; // 현재 실행 중인 timeoutId

document.addEventListener("DOMContentLoaded", async () => {
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');

    // 카테고리 목록을 생성하고 이벤트 리스너를 추가
    const liList = data.map((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.type;
        li.classList.add('notselectNews');

        // 각 li 요소에 클릭 이벤트 리스너를 추가
        li.addEventListener('click', async () => {
            await handleCategoryClick(index, liList);
        });

        NewsListUl.appendChild(li);
        return li;
    });

    let newsIndex = 0;

    // 초기 실행을 위해 첫 번째 카테고리를 선택
    while (true) {
        await processCategory(newsIndex, liList);
        newsIndex = (newsIndex + 1) % data.length;
    }
});

// 카테고리 목록을 클릭하면 실행되는 함수
const handleCategoryClick = async (index, liList) => {
    const currentSelectedIndex = getCurrentSelectedIndex(liList);

    // 현재 선택된 카테고리와 다른 카테고리를 클릭했을 경우
    if (index !== currentSelectedIndex) {
        await deselectCategory(currentSelectedIndex, liList);

        // 선택된 카테고리부터 순서대로 processCategory 실행
        while (true) {
            await processCategory(index, liList);
            index = (index + 1) % data.length;
        }
    }
};

// 현재 selectNews 클래스를 가지고 있는 카테고리의 index를 가져오는 함수
const getCurrentSelectedIndex = (liList) => {
    return Array.from(liList).findIndex(li => li.classList.contains('selectNews'));
};

// 현재 selectNews 클래스를 가지고 있는 카테고리의 스타일을 notselectNews으로 바꾸고 processCategory함수 종료
const deselectCategory = async (index, liList) => {
    const currentSelectedLi = liList[index];

    // 선택된 카테고리의 스타일을 변경합니다.
    currentSelectedLi.classList.remove('selectNews', 'nowSelected');
    currentSelectedLi.classList.add('notselectNews');
    currentSelectedLi.textContent = data[index].type;

    // 현재 실행 중인 intervalId와 timeoutId를 모두 초기화
    clearInterval(currentIntervalId);
    clearTimeout(currentTimeoutId);
};

// 카테고리의 정보를 표시하고 일정 시간 간격으로 업데이트하는 함수
const processCategory = async (index, liList) => {
    let i = 1;
    const NewsListCategory = liList[index];

    // 선택된 카테고리의 스타일을 변경
    NewsListCategory.classList.remove('notselectNews');
    NewsListCategory.classList.add('selectNews');

    const totalCompanies = data[index].company.length;


    // 카테고리 정보를 업데이트하는 함수
    const updateNewsCategory = () => {
        const pressInfo = document.getElementById('mainNews').querySelector('.pressInfo');
        const mainNewsLeft = document.getElementById('news').querySelector('.newsLeft');
        const mainNewsRight = document.getElementById('news').querySelector('.newsRight');
        const newsData = data[index].company[i - 1];

        const text = `
            <div class="selected-bold14">${data[index].type}</div>
            <div>
                <span class="selected-bold14">${i}</span>
                <span class="display-bold12">/${totalCompanies}</span>
            </div>`;
        NewsListCategory.innerHTML = text;

        // news 안에 내용을 채워줌 (pressInfo)
        const pressInfoText = `
            <img src = ${newsData.companyLogo}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(newsData.isSubscribe ? "" : "구독하기")}`
        pressInfo.innerHTML = pressInfoText;

        const button = pressInfo.querySelector('.pressInfoButton');
        if (button) {
            button.addEventListener('click', () => {
                newsData.isSubscribe = !newsData.isSubscribe;
                const pressInfoText = `
            <img src = ${newsData.companyLogo}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(newsData.isSubscribe ? "" : "구독하기")}`
                pressInfo.innerHTML = pressInfoText;
            })
        }


        // news 안에 내용을 채워줌 (newsLeft)
        const newsLeftText = `<img src="${newsData.mainNews.src}" alt="Thumbnail Image"/>
                     <p class = "available-medium16">${newsData.mainNews.title}</p>`;
        mainNewsLeft.innerHTML = newsLeftText;


        // news 안에 내용을 채워줌 (newsRight)
        const newsRightText = newsData.news.map(item => `<li class="newsEach">${item.title}</li>`).join('') + `<p class="display-medium14">${newsData.companyName}에서 직접 편집한 뉴스입니다.</p>`;
        mainNewsRight.innerHTML = newsRightText;


        i++;



        // 모든 정보를 업데이트한 후에 intervalId를 종료하고, 일정 시간이 지난 후에 스타일을 초기화
        if (i > totalCompanies) {
            clearInterval(currentIntervalId);
            setTimeout(() => {
                NewsListCategory.classList.remove('selectNews', 'nowSelected');
                NewsListCategory.classList.add('notselectNews');
                NewsListCategory.textContent = data[index].type;
            }, 50000);
        }

    };

    const resetAnimation = () => {
        setTimeout(() => {
            NewsListCategory.classList.add('nowSelected');
        }, 10);
    };

    // 일정 시간 간격으로 updateNewsCategory 함수를 실행
    currentIntervalId = setInterval(() => {
        updateNewsCategory();
        resetAnimation();
    }, 50000);

    // 맨 처음 랜더링을 해주기 위해 호출
    updateNewsCategory();
    resetAnimation();

    // 일정 시간이 지난 후에 intervalId를 종료
    await new Promise(resolve => {
        currentTimeoutId = setTimeout(() => {
            clearInterval(currentIntervalId);
            resolve();
        }, totalCompanies * 50000);
    });
};
