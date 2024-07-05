document.addEventListener("DOMContentLoaded", () => {
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
    let timeout1, timeout2;

    const changeNews = () => {
        const newsTitleShown = document.getElementById("newsTitleShown");
        const newsTitleHidden = document.getElementById("newsTitleHidden");

        // 4.5초 후에 애니메이션 시작
        timeout1 = setTimeout(() => {
            newsTitleShown.classList.add('autoRolling');
            newsTitleHidden.classList.add('autoRolling');
        }, 4500);

        // 5초 후에 텍스트 교체 및 클래스 초기화
        interval1 = setTimeout(() => {
            newsTitleShown.classList.remove('autoRolling');
            newsTitleHidden.classList.remove('autoRolling');

            // 교체할 텍스트 업데이트
            newsTitleShown.innerText = newsItems[(index1 + 1) % newsItems.length];
            newsTitleHidden.innerText = newsItems[(index1 + 2) % newsItems.length];

            // index 업데이트
            index1 = (index1 + 1) % newsItems.length;
        }, 5000);
    }

    const changeSecondNews = () => {
        const newsTitleShown = document.getElementById("newsTitleShown2");
        const newsTitleHidden = document.getElementById("newsTitleHidden2");

        // 4.5초 후에 애니메이션 시작
        timeout2 = setTimeout(() => {
            newsTitleShown.classList.add('autoRolling');
            newsTitleHidden.classList.add('autoRolling');
        }, 4500);

        // 5초 후에 텍스트 교체 및 클래스 초기화
        interval2 = setTimeout(() => {
            newsTitleShown.classList.remove('autoRolling');
            newsTitleHidden.classList.remove('autoRolling');

            // 교체할 텍스트 업데이트
            newsTitleShown.innerText = newsItems[(index2 + 1) % newsItems.length];
            newsTitleHidden.innerText = newsItems[(index2 + 2) % newsItems.length];

            // index 업데이트
            index2 = (index2 + 1) % newsItems.length;
        }, 5000);
    }

    const startNewsInterval = () => {
        changeNews();
        interval1 = setInterval(changeNews, 5000);
    }

    const startSecondNewsInterval = () => {
        changeSecondNews();
        interval2 = setInterval(changeSecondNews, 5000);
    }

    const stopNewsInterval = () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearInterval(interval1);
        clearInterval(interval2);
    }

    startNewsInterval();

    setTimeout(() => {
        startSecondNewsInterval();
    }, 1000);

    const ticker1 = document.querySelector("#ticker1");
    const ticker2 = document.querySelector("#ticker2");

    ticker1.addEventListener("mouseenter", () => {
        clearTimeout(timeout1);
        clearInterval(interval1);
    });

    //ticker1.addEventListener("mouseleave", startNewsInterval);

    ticker2.addEventListener("mouseenter", () => {
        clearTimeout(timeout2);
        clearInterval(interval2);
    });

    //ticker2.addEventListener("mouseleave", startSecondNewsInterval);
});
