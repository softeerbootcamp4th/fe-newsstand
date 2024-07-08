import { allNewsData } from './news.js';
import { pressInfoButton } from './button.js';
import { snackBar } from './snackBar.js';
import { newsListLi } from './newsListLi.js';
import { cancelAlert } from './cancelAlert.js';

let currentIntervalId = null; // 현재 실행 중인 intervalId
let currentTimeoutId = null; // 현재 실행 중인 timeoutId

document.addEventListener("DOMContentLoaded", async () => {

    // 카테고리 목록을 생성하고 이벤트 리스너를 추가
    const liList = newsListLi(true);
    liList.forEach((li, companyIndex) => {
        li.addEventListener('click', async () => {
            await handleCategoryClick(companyIndex, liList, true);
        });
    });

    let newsIndex = 0;

    // 초기 실행을 위해 첫 번째 카테고리를 선택
    while (true) {
        await processCategory(newsIndex, liList, true);
        newsIndex = (newsIndex + 1) % allNewsData.length;
    }
});

// 카테고리 목록을 클릭하면 실행되는 함수
const handleCategoryClick = async (index, liList, isFull) => {
    const currentSelectedIndex = getCurrentSelectedIndex(liList);

    // 현재 선택된 카테고리와 다른 카테고리를 클릭했을 경우
    if (index !== currentSelectedIndex) {
        deselectCategory(currentSelectedIndex, liList, isFull);

        // 선택된 카테고리부터 순서대로 processCategory 실행
        while (true) {
            await processCategory(index, liList, isFull);
            index = (index + 1) % allNewsData.length;
        }
    }
};

// 현재 selectNews 클래스를 가지고 있는 카테고리의 index를 가져오는 함수
const getCurrentSelectedIndex = (liList) => {
    return Array.from(liList).findIndex(li => li.classList.contains('selectNews'));
};

// 현재 selectNews 클래스를 가지고 있는 카테고리의 스타일을 notselectNews으로 바꾸고 processCategory함수 종료
const deselectCategory = (index, liList, isFull) => {
    const currentSelectedLi = liList[index];

    // 선택된 카테고리의 스타일을 변경합니다.
    currentSelectedLi.classList.replace('selectNews', 'notselectNews');

    if (isFull) {
        currentSelectedLi.textContent = allNewsData[index].category;
    }
    else {
        const subscribeNewData = allNewsData.flatMap(category =>
            category.company.filter(company => company.isSubscribe))
        currentSelectedLi.textContent = subscribeNewData[index].companyName;
    }

    // 현재 실행 중인 intervalId와 timeoutId를 모두 초기화
    clearInterval(currentIntervalId);
    clearTimeout(currentTimeoutId);
};

const subscribeNews = (currentCompanyName) => {
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    NewsListUl.innerHTML = '';

    const liList = newsListLi(false);

    liList.forEach((li, companyIndex) => {
        li.addEventListener('click', async () => {
            await handleCategoryClick(companyIndex, liList, false);
        });
    });

    const subscribedCompanies = allNewsData.flatMap(category =>
        category.company.filter(company => company.isSubscribe));

    // currentCompanyName과 일치하는 회사의 index를 찾음
    let newsIndex = subscribedCompanies.findIndex(company => company.companyName === currentCompanyName);

    // 만약 currentCompanyName과 일치하는 회사가 없다면 newsIndex를 0으로 설정
    if (newsIndex === -1) {
        newsIndex = 0;
    }

    // 현재 실행 중인 intervalId와 timeoutId를 모두 초기화
    clearInterval(currentIntervalId);
    clearTimeout(currentTimeoutId);

    processCategory(newsIndex, liList, false, subscribedCompanies);

};



// 카테고리의 정보를 표시하고 일정 시간 간격으로 업데이트하는 함수
const processCategory = async (index, liList, isFull, subscribedCompanies) => {

    if (isFull) {

        let i = 1;
        const NewsListCategory = liList[index];

        // 선택된 카테고리의 스타일을 변경
        NewsListCategory.classList.replace('notselectNews', 'selectNews');
        const totalCompanies = allNewsData[index].company.length;


        // 카테고리 정보를 업데이트하는 함수
        const updateNewsCategory = () => {
            const pressInfo = document.getElementById('mainNews').querySelector('.pressInfo');
            const mainNewsLeft = document.getElementById('news').querySelector('.newsLeft');
            const mainNewsRight = document.getElementById('news').querySelector('.newsRight');
            const newsData = allNewsData[index].company[i - 1];

            const text = `
            <div class="selected-bold14">${allNewsData[index].category}</div>
            <div>
                <span id="currentNewsIndex">${i}</span>
                <span class="display-bold12">/ ${totalCompanies}</span>
            </div>`;
            NewsListCategory.innerHTML = text;

            // news 안에 내용을 채워줌 (pressInfo)
            const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(newsData.isSubscribe ? "" : "구독하기")}`
            pressInfo.innerHTML = pressInfoText;

            const button = pressInfo.querySelector('.pressInfoButton');
            if (button) {
                button.addEventListener('click', () => {

                    if (!newsData.isSubscribe) {
                        const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(newsData.isSubscribe ? "구독하기" : "")}`
                        pressInfo.innerHTML = pressInfoText;
                        snackBar("내가 구독한 언론사에 추가되었습니다.");
                        setTimeout(() => {
                            subscribeNews(newsData.companyName);
                        }, 5000);
                        newsData.isSubscribe = !newsData.isSubscribe;
                    }
                    else {
                        const modalText = newsData.companyName;
                        const modalHtml = cancelAlert(modalText, () => {
                            // 모달에서 '예' 버튼 클릭 시
                            newsData.isSubscribe = false;

                            const modal = document.getElementById('cancelAlert');
                            modal.remove();
                        }, () => {
                            // 모달에서 '아니오' 버튼 클릭 시
                            // 모달 제거

                            const modal = document.getElementById('cancelAlert');
                            modal.remove();
                        });
                        pressInfo.insertAdjacentHTML(modalHtml);
                    }

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
                    NewsListCategory.classList.replace('selectNews', 'notselectNews');
                    NewsListCategory.textContent = allNewsData[index].category;
                }, 20000);
            }
        };

        // 일정 시간 간격으로 updateNewsCategory 함수를 실행
        currentIntervalId = setInterval(() => {
            updateNewsCategory();
        }, 20000);

        // 맨 처음 랜더링을 해주기 위해 호출
        updateNewsCategory();

        // 일정 시간이 지난 후에 intervalId를 종료
        await new Promise(resolve => {
            currentTimeoutId = setTimeout(() => {
                clearInterval(currentIntervalId);
                resolve();
            }, totalCompanies * 20000);
        });
    }
    else {
        let currentIndex = index;
        const subscribeNewData = allNewsData.flatMap(category =>
            category.company.filter(company => company.isSubscribe));
        // 카테고리 정보를 업데이트하는 함수
        const updateNewsCategory = (currentIndex) => {
            const NewsListCategory = liList[currentIndex];

            // 선택된 카테고리의 스타일을 변경
            NewsListCategory.classList.replace('notselectNews', 'selectNews');
            const pressInfo = document.getElementById('mainNews').querySelector('.pressInfo');
            const mainNewsLeft = document.getElementById('news').querySelector('.newsLeft');
            const mainNewsRight = document.getElementById('news').querySelector('.newsRight');
            const newsData = subscribeNewData[currentIndex];

            const text = `
            <div class="selected-bold14">${newsData.companyName}</div>
            <div>
                <span class="selected-bold14">></span>
            </div>`;
            NewsListCategory.innerHTML = text;

            // news 안에 내용을 채워줌 (pressInfo)
            const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(newsData.isSubscribe ? "" : "구독하기")}`
            pressInfo.innerHTML = pressInfoText;

            const button = pressInfo.querySelector('.pressInfoButton');
            if (button) {
                button.addEventListener('click', () => {

                    if (!newsData.isSubscribe) {
                        const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(newsData.isSubscribe ? "구독하기" : "")}`
                        pressInfo.innerHTML = pressInfoText;
                        snackBar("내가 구독한 언론사에 추가되었습니다.");
                        setTimeout(() => {
                            subscribeNews(newsData.companyName);
                        }, 5000);
                        newsData.isSubscribe = !newsData.isSubscribe;
                    }
                    else {
                        const modalText = newsData.companyName;
                        const modalHtml = cancelAlert(modalText, () => {
                            // 모달에서 '예' 버튼 클릭 시
                            newsData.isSubscribe = false;

                            const modal = document.getElementById('cancelAlert');
                            modal.remove();
                        }, () => {
                            // 모달에서 '아니오' 버튼 클릭 시
                            // 모달 제거

                            const modal = document.getElementById('cancelAlert');
                            modal.remove();
                        });
                        pressInfo.insertAdjacentHTML(modalHtml);
                    }

                })
            }


            // news 안에 내용을 채워줌 (newsLeft)
            const newsLeftText = `<img src="${newsData.mainNews.src}" alt="Thumbnail Image"/>
                     <p class = "available-medium16">${newsData.mainNews.title}</p>`;
            mainNewsLeft.innerHTML = newsLeftText;


            // news 안에 내용을 채워줌 (newsRight)
            const newsRightText = newsData.news.map(item => `<li class="newsEach">${item.title}</li>`).join('') + `<p class="display-medium14">${newsData.companyName}에서 직접 편집한 뉴스입니다.</p>`;
            mainNewsRight.innerHTML = newsRightText;
        };

        updateNewsCategory(currentIndex);

        currentIntervalId = setInterval(() => {
            liList[currentIndex].classList.replace('selectNews', 'notselectNews');
            liList[currentIndex].innerText = subscribedCompanies[currentIndex].companyName;
            currentIndex = (currentIndex + 1) % liList.length;
            updateNewsCategory(currentIndex);
        }, 20000);
    }
};
