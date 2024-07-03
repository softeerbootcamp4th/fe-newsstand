document.addEventListener("DOMContentLoaded", () => {
    const leftNewsContainer = document.querySelector('.news-container-left');
    const rightNewsContainer = document.querySelector('.news-container-right');

    let leftIndex = 0;
    let rightIndex = 0;
    const intervalTime = 5000; // 롤링 간격 (5초)

    let leftTimer;
    let rightTimer;

    let leftNews = [];
    let rightNews = [];

    // 뉴스 아이템 생성 함수
    function createNewsItem(news) {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const companySpan = document.createElement('span');
        companySpan.classList.add('news-company');
        companySpan.textContent = news.company;
        newsItem.appendChild(companySpan);

        const titleParagraph = document.createElement('p');
        titleParagraph.classList.add('news-title');
        titleParagraph.textContent = news.title;
        newsItem.appendChild(titleParagraph);

        newsItem.setAttribute('data-url', news.url); // 뉴스 링크 추가

        // 클릭 이벤트 리스너 추가
        newsItem.addEventListener('click', () => {
            window.open(news.url, '_blank'); // 새 창에서 뉴스 링크 열기
        });

        return newsItem;
    }

    // 왼쪽 바 뉴스 출력 함수
    function renderLeftNews() {
        leftNewsContainer.innerHTML = ''; // 기존 내용 삭제
        const newsItem = createNewsItem(leftNews[leftIndex]);
        leftNewsContainer.appendChild(newsItem);
    }

    // 오른쪽 바 뉴스 출력 함수
    function renderRightNews() {
        rightNewsContainer.innerHTML = ''; // 기존 내용 삭제
        const newsItem = createNewsItem(rightNews[rightIndex]);
        rightNewsContainer.appendChild(newsItem);
    }

    // 왼쪽 바 뉴스 롤링 함수
    function rollLeftNews() {
        leftTimer = setInterval(() => {
            leftIndex = (leftIndex + 1) % leftNews.length;
            renderLeftNews();
        }, intervalTime);
    }

    // 오른쪽 바 뉴스 롤링 함수
    function rollRightNews() {
        rightTimer = setInterval(() => {
            rightIndex = (rightIndex + 1) % rightNews.length;
            renderRightNews();
        }, intervalTime);
    }

    // 뉴스 데이터 가져오기
    fetch("./data/latestNews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(newsData => {
            // 왼쪽과 오른쪽 배열로 나누기
            leftNews = newsData.slice(0, 5); 
            rightNews = newsData.slice(5, 10);

            // 초기 뉴스 출력
            renderLeftNews();
            renderRightNews();

            // 왼쪽, 오른쪽 바 뉴스 롤링 시작
            rollLeftNews();
            setTimeout(rollRightNews, 1000); // 오른쪽 바 뉴스 롤링 시작을 1초 뒤로 지연

            // 마우스 호버 시 롤링 일시정지 및 밑줄 표시
            leftNewsContainer.addEventListener('mouseenter', () => {
                clearInterval(leftTimer);
                leftNewsContainer.querySelector('.news-item').classList.add('hovered');
            });
            leftNewsContainer.addEventListener('mouseleave', () => {
                leftNewsContainer.querySelector('.news-item').classList.remove('hovered');
                rollLeftNews();
            });

            rightNewsContainer.addEventListener('mouseenter', () => {
                clearInterval(rightTimer);
                rightNewsContainer.querySelector('.news-item').classList.add('hovered');
            });
            rightNewsContainer.addEventListener('mouseleave', () => {
                rightNewsContainer.querySelector('.news-item').classList.remove('hovered');
                rollRightNews();
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});
