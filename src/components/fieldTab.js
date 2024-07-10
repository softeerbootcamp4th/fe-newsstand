import { allNewsData } from './news.js';
import { pressInfoButton } from './button.js';
import { snackBar } from './snackBar.js';
import { newsListLi } from './newsListLi.js';

let currentIntervalId = null; // 현재 실행 중인 intervalId
let currentTimeoutId = null; // 현재 실행 중인 timeoutId
let currentMidiaIndex = 0; // 현재 실행중인 카테고리중 언론사의 index


export const init = async () => {
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    NewsListUl.innerHTML = '';
    currentMidiaIndex = 0;
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
        await processCategory(newsIndex, liList, true, false);
        newsIndex = (newsIndex + 1) % allNewsData.length;
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    const cancelAlert = document.getElementById('cancelAlert');
    const positiveButton = document.getElementById('positiveButton');
    const negativeButton = document.getElementById('negativeButton');
    const rightButton = document.getElementById('rightButton');
    const leftButton = document.getElementById('leftButton');

    positiveButton.addEventListener('mouseenter', () => {
        positiveButton.classList.replace('available-medium16', 'hover-medium16');
    });

    negativeButton.addEventListener('mouseenter', () => {
        negativeButton.classList.replace('available-medium16', 'hover-medium16');
    })

    positiveButton.addEventListener('mouseleave', () => {
        positiveButton.classList.replace('hover-medium16', 'available-medium16');
    });

    negativeButton.addEventListener('mouseleave', () => {
        negativeButton.classList.replace('hover-medium16', 'available-medium16');
    });

    positiveButton.addEventListener('click', () => {
        const button = document.getElementById('allPress').className;
        if (button === 'selected-bold16') {
            removeSubscribedData(true);
        }
        else {
            removeSubscribedData(false);
        }
    });

    negativeButton.addEventListener('click', () => {
        cancelAlert.classList.remove('show');
    });

    rightButton.addEventListener('click', async () => {
        const button = document.getElementById('allPress').className;
        if (button === 'selected-bold16') {
            clearInterval(currentIntervalId);
            clearTimeout(currentTimeoutId);
            leftButton.className = 'show';
            const liList = document.querySelectorAll('#NewsList ul li');
            const categoryIndex = getCurrentSelectedIndex(liList);
            const totalCompanies = allNewsData[categoryIndex].company.length;
            const currentSelectedLi = liList[categoryIndex];
            currentSelectedLi.classList.add('restartAnimation');
            setTimeout(() => {
                currentSelectedLi.classList.remove('restartAnimation');
                //restartAnimation(currentSelectedLi);
            }, 50);
            if (currentMidiaIndex + 1 === totalCompanies) {
                rightButton.className = `hidden`;
            }

            while (true) {
                await processCategory(categoryIndex, liList, true, false);
                categoryIndex = (categoryIndex + 1) % allNewsData.length;
            }
        }
        else {
            const selectedLi = document.querySelector('#NewsList ul li.selectNews');
            const nextLi = selectedLi.nextElementSibling;

            if (nextLi) {
                const nextLiText = nextLi.textContent.trim();
                subscribeNews(nextLiText);
            } else {
                const firstLiText = selectedLi.parentElement.firstElementChild.textContent.trim();
                subscribeNews(firstLiText);
            }
        }
    });

    leftButton.addEventListener('click', async () => {
        const button = document.getElementById('allPress').className;
        if (button === 'selected-bold16') {
            rightButton.classList.remove('hidden');
            clearInterval(currentIntervalId);
            clearTimeout(currentTimeoutId);
            const liList = document.querySelectorAll('#NewsList ul li');
            currentMidiaIndex = (currentMidiaIndex - 2);
            const categoryIndex = getCurrentSelectedIndex(liList);
            const currentSelectedLi = liList[categoryIndex];
            currentSelectedLi.classList.add('restartAnimation');
            setTimeout(() => {
                currentSelectedLi.classList.remove('restartAnimation');
                //restartAnimation(currentSelectedLi);
            }, 50);
            if (currentMidiaIndex === 0) {
                leftButton.classList.remove('show');
            }

            while (true) {
                await processCategory(categoryIndex, liList, true, false);
                categoryIndex = (categoryIndex + 1) % allNewsData.length;
            }
        }
        else {
            const selectedLi = document.querySelector('#NewsList ul li.selectNews');
            const nextLi = selectedLi.previousElementSibling;

            if (nextLi) {
                const prevLiText = nextLi.textContent.trim();
                subscribeNews(prevLiText);
            } else {
                const lastLiText = selectedLi.parentElement.lastElementChild.textContent.trim();
                subscribeNews(lastLiText);
            }
        }
    });

    init();
});


// 카테고리 목록을 클릭하면 실행되는 함수
export const handleCategoryClick = async (index, liList, isFull) => {
    const rightButton = document.getElementById('rightButton');
    const leftButton = document.getElementById('leftButton');
    const currentSelectedIndex = getCurrentSelectedIndex(liList);


    // 현재 선택된 카테고리와 다른 카테고리를 클릭했을 경우
    if (index !== currentSelectedIndex) {
        rightButton.classList.remove('hidden');
        leftButton.classList.remove('show');
        deselectCategory(currentSelectedIndex, liList, isFull);

        if (isFull) {
            currentMidiaIndex = 0;
            // 선택된 카테고리부터 순서대로 processCategory 실행
            while (true) {
                await processCategory(index, liList, isFull, false);
                index = (index + 1) % allNewsData.length;
            }
        }
        else {
            processCategory(index, liList, false, false);
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
        const subscribeNewData = getSubscribedData();
        currentSelectedLi.textContent = subscribeNewData[index];
    }
};

export const subscribeNews = (currentCompanyName) => {
    clearInterval(currentIntervalId);
    clearTimeout(currentTimeoutId);
    const allPress = document.getElementById("allPress");
    const subscribedPress = document.getElementById("subscribedPress");
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    NewsListUl.innerHTML = '';

    const liList = newsListLi(false);

    subscribedPress.classList.replace('available-medium16', 'selected-bold16');
    allPress.classList.replace('selected-bold16', 'available-medium16');


    if (liList === undefined) {
        nonLilist();
    }
    else {

        liList.forEach((li, companyIndex) => {
            li.addEventListener('click', async () => {
                await handleCategoryClick(companyIndex, liList, false);
            });
        });

        const subscribed = getSubscribedData();
        // currentCompanyName과 일치하는 회사의 index를 찾음
        let newsIndex = subscribed.findIndex(company => company === currentCompanyName);


        // 만약 currentCompanyName과 일치하는 회사가 없다면 newsIndex를 0으로 설정
        if (newsIndex === -1) {
            newsIndex = 0;
        }

        processCategory(newsIndex, liList, false, false);
    }

};


const nonLilist = () => {
    const news = document.querySelector('.pressInfo');
    const newsLeft = document.querySelector('.newsLeft');
    const newsRight = document.querySelector('.newsRight');

    news.innerHTML = '';
    newsLeft.innerHTML = '';
    newsRight.innerHTML = '';
};


export const getSubscribedData = () => {
    const subscribedData = localStorage.getItem('subscribed');
    if (subscribedData) {
        return JSON.parse(subscribedData); // JSON 문자열을 배열로 변환
    } else {
        return []; // 로컬 스토리지에 데이터가 없으면 빈 배열 반환
    }
};


const addSubscribedData = (newCompanyName) => {
    // 현재 구독 정보 가져오기
    let subscribedData = getSubscribedData();

    // 새로운 구독 정보 추가
    subscribedData.push(newCompanyName);

    // 로컬스토리지에 배열 형식으로 저장
    localStorage.setItem('subscribed', JSON.stringify(subscribedData));
};


const removeSubscribedData = (isFull) => {
    const cancelAlert = document.getElementById('cancelAlert');
    const subscribed = getSubscribedData();
    const calcelText = document.getElementById('cancelAlertTop').querySelector('p>strong').textContent;
    const currentIndex = subscribed.findIndex(company => company === calcelText);
    subscribed.splice(currentIndex, 1);
    localStorage.setItem('subscribed', JSON.stringify(subscribed));
    cancelAlert.classList.remove('show');
    if (!isFull) {
        const NewsListUl = document.getElementById('NewsList').querySelector('ul');
        NewsListUl.innerHTML = '';
        const liList = newsListLi(false);

        liList.forEach((li, companyIndex) => {
            li.addEventListener('click', async () => {
                await handleCategoryClick(companyIndex, liList, false);
            });
        });
        if (subscribed.length == 0) {
            nonLilist();
        }
        else {
            if (currentIndex === subscribed.length) {
                processCategory(0, liList, false, false);
            }
            else {
                processCategory(currentIndex, liList, false, false);
            }
        }
    }
    else {
        const button = document.querySelector('.pressInfoButton');
        button.innerHTML = `<img src='../../images/plus.svg' alt='plus icon'/>
            <span>구독하기</span>`;
    }

}


// 카테고리의 정보를 표시하고 일정 시간 간격으로 업데이트하는 함수
export const processCategory = async (index, liList, isFull, isClickTopAndViewer) => {
    clearInterval(currentIntervalId);
    clearTimeout(currentTimeoutId);

    if (isFull) {

        if (isClickTopAndViewer) {
            currentMidiaIndex = 0;
        }

        const NewsListCategory = liList[index];

        // 선택된 카테고리의 스타일을 변경
        NewsListCategory.classList.replace('notselectNews', 'selectNews');
        const totalCompanies = allNewsData[index].company.length;
        const subscribedData = getSubscribedData();


        // 카테고리 정보를 업데이트하는 함수
        const updateNewsCategory = () => {
            const pressInfo = document.getElementById('mainNews').querySelector('.pressInfo');
            const newsContainer = document.getElementById('news');
            const mainNewsLeft = newsContainer.querySelector('.newsLeft');
            const mainNewsRight = newsContainer.querySelector('.newsRight');
            const newsData = allNewsData[index].company[currentMidiaIndex];

            const text = `
            <div class="selected-bold14">${allNewsData[index].category}</div>
            <div>
                <span id="currentNewsIndex">${currentMidiaIndex + 1}</span>
                <span class="display-bold12">/ ${totalCompanies}</span>
            </div>`;
            NewsListCategory.innerHTML = text;

            // news 안에 내용을 채워줌 (pressInfo)
            const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton(subscribedData.includes(newsData.companyName) ? "" : "구독하기")}`
            pressInfo.innerHTML = pressInfoText;

            const button = pressInfo.querySelector('.pressInfoButton');
            if (button) {
                button.addEventListener('click', () => {

                    if (!subscribedData.includes(newsData.companyName)) {
                        const pressInfoText = `
            <img src = ${newsData.companyIcon}>
            <span class = "display-medium12">${newsData.updatedDate}</span>
            ${pressInfoButton("구독하기")}`
                        pressInfo.innerHTML = pressInfoText;
                        snackBar("내가 구독한 언론사에 추가되었습니다.");
                        setTimeout(() => {
                            subscribeNews(newsData.companyName);
                            leftButton.className = 'show';
                        }, 5000);
                        addSubscribedData(newsData.companyName);
                    }
                    else {
                        const cancelAlert = document.getElementById('cancelAlert');
                        const calcelText = document.getElementById('cancelAlertTop').querySelector('p');
                        calcelText.innerHTML = `<strong>${newsData.companyName}</strong>을/를<br>구독해지하시겠습니까?`;
                        cancelAlert.className = `show`;
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


            currentMidiaIndex++;



            // 모든 정보를 업데이트한 후에 intervalId를 종료하고, 일정 시간이 지난 후에 스타일을 초기화
            if (currentMidiaIndex > totalCompanies) {
                clearInterval(currentIntervalId);
                setTimeout(() => {
                    NewsListCategory.classList.replace('selectNews', 'notselectNews');
                    NewsListCategory.textContent = allNewsData[index].category;
                }, 20000);
            }
        };

        // 일정 시간 간격으로 updateNewsCategory 함수를 실행
        currentIntervalId = setInterval(() => {
            const leftButton = document.getElementById('leftButton');
            leftButton.className = 'show';
            updateNewsCategory();
        }, 20000);

        // 맨 처음 랜더링을 해주기 위해 호출
        updateNewsCategory();

        // 일정 시간이 지난 후에 intervalId를 종료
        await new Promise(resolve => {
            currentTimeoutId = setTimeout(() => {
                clearInterval(currentIntervalId);
                resolve();
                currentMidiaIndex = 0;
            }, (totalCompanies - currentMidiaIndex + 1) * 20000);
        });
    }
    else {
        let currentIndex = index;
        const subscribed = getSubscribedData();
        // 카테고리 정보를 업데이트하는 함수
        const updateNewsCategory = (currentIndex) => {
            const NewsListCategory = liList[currentIndex];

            // 선택된 카테고리의 스타일을 변경
            NewsListCategory.classList.replace('notselectNews', 'selectNews');
            const pressInfo = document.getElementById('mainNews').querySelector('.pressInfo');
            const newsContainer = document.getElementById('news');
            const mainNewsLeft = newsContainer.querySelector('.newsLeft');
            const mainNewsRight = newsContainer.querySelector('.newsRight');
            const newsData = allNewsData
                .flatMap(category => category.company)
                .find(company => company.companyName === subscribed[currentIndex]);



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
            ${pressInfoButton("")}`
            pressInfo.innerHTML = pressInfoText;

            const button = pressInfo.querySelector('.pressInfoButton');
            if (button) {
                button.addEventListener('click', () => {
                    const cancelAlert = document.getElementById('cancelAlert');
                    const calcelText = document.getElementById('cancelAlertTop').querySelector('p');
                    calcelText.innerHTML = `<strong>${newsData.companyName}</strong>을/를<br>구독해지하시겠습니까?`;
                    cancelAlert.className = `show`;
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
            const leftButton = document.getElementById('leftButton');
            leftButton.className = 'show';
            liList[currentIndex].classList.replace('selectNews', 'notselectNews');
            liList[currentIndex].innerText = subscribed[currentIndex];
            currentIndex = (currentIndex + 1) % liList.length;
            updateNewsCategory(currentIndex);
        }, 20000);
    }
};
