import { category } from "./data.js";

let curCategoryIdx = 0;

/* 카테고리 초기화 및 클릭 이벤트 추가 함수 */
function createCategory() {
    const parentDiv = document.querySelector('.all-cate-header');

    // 카테고리 아이템 생성 및 추가
    category.forEach((cat, idx) => {
        const divElement = document.createElement('div');
        divElement.classList.add('category-item');
        
        const textElement = document.createElement('span');
        textElement.textContent = cat;
        textElement.classList.add('category-text');
        
        divElement.appendChild(textElement);
        parentDiv.appendChild(divElement);

        // 카테고리명 선택하면 선택한 카테고리의 인덱스 가져옴
        divElement.addEventListener('click', () => {
            curCategoryIdx = idx;
            loadCurrentCategoryNews();
        })
    });
   
}


// const progressBar = document.querySelector('.progress .progress-bar');

// let curIndex = 0;
// const intervalTime = 20000;

// // 초기 카테고리 표시
// showCategory(curIndex);

// // 20초마다 다음 카테고리 선택 및 프로그레스바 업데이트
// setInterval(() => {
//     curIndex = (curIndex + 1) % category.length;
//     showCategory(curIndex);
// }, intervalTime);

// function showCategory(index) {
//     // 모든 카테고리 아이템 초기화 (스타일 제거)
//     const categoryItems = document.querySelectorAll('.category-item');
//     categoryItems.forEach(item => {
//         item.classList.remove('selected');
//         const progressBarDivElement = item.querySelector('.progress-bar');
//         if (progressBarDivElement) {
//             progressBarDivElement.remove(); // 프로그래스 바 제거
//         }
//     });

//     // 선택된 카테고리 스타일 적용
//     const selectedDiv = parentDiv.children[index];
//     selectedDiv.classList.add('selected');
//     selectedDiv.querySelector('.category-text').textContent = category[index];

//     const progressBarDivElement = document.createElement('div');
//     progressBarDivElement.classList.add('progress-bar');
//     selectedDiv.appendChild(progressBarDivElement);

//     progressBarDivElement.style.animation = `progressAnimation ${intervalTime / 1000}s linear forwards`;
// }


/* 조회한 카테고리의 전체 뉴스 가져오는 함수 */
function loadCurrentCategoryNews() {
    const mainNewsDiv = document.querySelector('.main-news');
    const subNewsDiv = document.querySelector('.sub-news');

    mainNewsDiv.innerHTML = '';
    subNewsDiv.innerHTML = '';

    fetch("./data/allNews.json")
        .then(response => {
            if(!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(newsData => {
            const news = newsData[curCategoryIdx].news[0];
            
            const thumnbailImg = document.createElement('img');
            thumnbailImg.src = news.thumbnailUrl;
            const thumbnailNews = document.createElement('div');
            thumbnailNews.textContent = news.newsItems[0].title;

            mainNewsDiv.appendChild(thumnbailImg);
            mainNewsDiv.appendChild(thumbnailNews);

            news.newsItems.slice(1).forEach(n => {
                const newsItemDiv = document.createElement('div');
                newsItemDiv.classList.add('sub-news-item');
                newsItemDiv.textContent = n.title;
                newsItemDiv.addEventListener('click', () => {
                    window.open(n.url, '_blank');
                })

                subNewsDiv.appendChild(newsItemDiv);
            });

            const explanationDiv = document.createElement('div');
            explanationDiv.classList.add('explanation');
            explanationDiv.textContent = `${news.company} 언론사에서 직접 편집한 뉴스 입니다.`
            subNewsDiv.appendChild(explanationDiv);
        })
        .catch(error => {
            console.error(error);
        })
    

}

document.addEventListener("DOMContentLoaded", () => {
    createCategory();
    loadCurrentCategoryNews();

})