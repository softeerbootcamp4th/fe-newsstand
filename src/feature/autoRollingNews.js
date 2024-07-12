export const autoRollingNews = () => {
    const newsItems = [
        "[속보] 미국, '중동 양자 정상 회담' 제안…이란, 긍정적 반응",
        "[속보] 日, 도쿄 올림픽 개막식 준비 완료…코로나19 예방 대책 강화",
        "[속보] 영국, 브렉시트 이후 EU와의 무역협정 체결 완료",
        "[속보] 아마존, 최대 1조 달러 규모의 클라우드 컴퓨팅 계약 체결",
        "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
    ];

    let index1 = 0;
    let index2 = 0;
    let interval1, interval2;

    const changeNews = () => {
        const newsTitleShown = document.getElementById("newsTitleShown");
        const newsTitleHidden = document.getElementById("newsTitleHidden");


        newsTitleShown.classList.add("autoRolling");
        newsTitleHidden.classList.add("autoRolling");


        // 5초 후에 텍스트 교체 및 클래스 초기화
        setTimeout(() => {
            newsTitleShown.classList.remove("autoRolling");
            newsTitleHidden.classList.remove("autoRolling");

            // 교체할 텍스트 업데이트
            newsTitleShown.innerText = newsItems[(index1 + 1) % newsItems.length];
            newsTitleHidden.innerText = newsItems[(index1 + 2) % newsItems.length];

            // index 업데이트
            index1 = (index1 + 1) % newsItems.length;
        }, 500);
    };

    const changeSecondNews = () => {
        const newsTitleShown = document.getElementById("newsTitleShown2");
        const newsTitleHidden = document.getElementById("newsTitleHidden2");


        newsTitleShown.classList.add("autoRolling");
        newsTitleHidden.classList.add("autoRolling");


        // 5초 후에 텍스트 교체 및 클래스 초기화
        setTimeout(() => {
            newsTitleShown.classList.remove("autoRolling");
            newsTitleHidden.classList.remove("autoRolling");

            // 교체할 텍스트 업데이트
            newsTitleShown.innerText = newsItems[(index2 + 1) % newsItems.length];
            newsTitleHidden.innerText = newsItems[(index2 + 2) % newsItems.length];

            // index 업데이트
            index2 = (index2 + 1) % newsItems.length;
        }, 500);
    };

    const startNewsInterval = () => {
        interval1 = setInterval(changeNews, 4500);
    };

    const startSecondNewsInterval = () => {
        interval2 = setInterval(changeSecondNews, 4500);
    };

    startNewsInterval();

    setTimeout(() => {
        startSecondNewsInterval();
    }, 1000);

    const ticker1 = document.querySelector("#ticker1");
    const ticker2 = document.querySelector("#ticker2");

    ticker1.addEventListener("mouseenter", () => {
        clearInterval(interval1);
    });

    ticker1.addEventListener("mouseleave", startNewsInterval);

    ticker2.addEventListener("mouseenter", () => {
        clearInterval(interval2);
    });

    ticker2.addEventListener("mouseleave", startSecondNewsInterval);
};