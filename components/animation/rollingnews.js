export const leftnews = [
    { name: "데일리안", news: "3.5조원 AI분야 정책금융 신설한다···로봇·자율주행 등 전분야 지원" },
    { name: "연합뉴스", news: "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출" },
    { name: "매일경제", news: "[속보] 與최고위원 본경선, 김병민·김용태·김재원·민영삼" },
    { name: "시사뉴스e", news: "다음주 충격 발표.. 무더위 속 평균 온도 30도 예상" },
    { name: "서울경제", news: "MS 서피스 프로 11 2024년형 리뷰 | 아직 오지 않은 미래를 엿보다" }
];

export const rightnews = [
    { name: "경향신문", news: "국내외 정치와 경제에 대한 깊이 있는 분석을 제공합니다." },
    { name: "조선일보", news: "다양한 사회 이슈와 관련된 최신 뉴스를 다룹니다." },
    { name: "한겨레", news: "사회적 이슈와 환경 문제에 대한 다양한 관점을 제공합니다." },
    { name: "동아일보", news: "경제, 문화, 국제 뉴스 등 다양한 분야의 최신 뉴스를 보도합니다." },
    { name: "중앙일보", news: "정치, 경제, 사회 등 다양한 분야의 깊이 있는 뉴스를 제공합니다." }
];

document.addEventListener('DOMContentLoaded', function () {
    let leftIndex = 0;
    let rightIndex = 0;

    const leftTicker = document.getElementById('leftNews');
    const rightTicker = document.getElementById('rightNews');

    let leftInterval;
    let rightInterval;

    function updateTicker(ticker, index, newsArray) {
        const press = ticker.querySelector('.press');
        const article = ticker.querySelector('.rollarticle');

        //기존 뉴스 - slideout
        press.style.animation = 'slideOut 0.5s ease forwards';
        article.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
            press.textContent = newsArray[index].name;
            article.textContent = newsArray[index].news;

            //새로운 뉴스 - slidein
            press.style.animation = 'slideIn 0.5s ease forwards';
            article.style.animation = 'slideIn 0.5s ease forwards';
        }, 200);
    }

    function startTickerInterval(ticker, index, newsArray) {
        return setInterval(() => {
            index = (index + 1) % newsArray.length;
            updateTicker(ticker, index, newsArray);
        }, 5000); // 5초 간격
    }

    //마우스 떼면 바로 다음 기사 보이기
    function mouseleaveing(ticker, index, newsArray) {
        index = (index + 1) % newsArray.length;
        updateTicker(ticker, index, newsArray);
        return index;
    }

    leftInterval = startTickerInterval(leftTicker, leftIndex, leftnews);

    // 오른쪽 롤링바 - 1초 지연 후 시작
    setTimeout(() => {
        rightInterval = startTickerInterval(rightTicker, rightIndex, rightnews);
    }, 1000);

    leftTicker.addEventListener('mouseenter', () =>
        clearInterval(leftInterval));
    leftTicker.addEventListener('mouseleave', () => {
        leftIndex = mouseleaveing(leftTicker, leftIndex, leftnews);
        leftInterval = startTickerInterval(leftTicker, leftIndex, leftnews);
    });

    rightTicker.addEventListener('mouseenter', () =>
        clearInterval(rightInterval));
    rightTicker.addEventListener('mouseleave', () => {
        rightIndex = mouseleaveing(rightTicker, rightIndex, rightnews);
        rightInterval = startTickerInterval(rightTicker, rightIndex, rightnews);
    });
});
