document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".navItem");
    const articleTop = document.querySelector('.articleTop');
    const articleBottom = document.querySelector('.articleBottom');
    // const leftButton = document.querySelector('.leftButton');
    // const rightButton = document.querySelector('.rightButton');
    let currentCategoryIndex = 0;
    let currentPressIndex = 0;
    let intervalId;

    // 초기 첫 번째 카테고리를 활성화 상태로 지정하고 프로그래스 애니메이션 시작
    navItems[0].classList.add("active", "progress");

    // 초기 화면 로드 시 첫 번째 뉴스 데이터 표시 및 프로그래스바 애니메이션 시작
    fetch('./asset/data/newsData.json')
        .then(response => response.json())
        .then(data => {
            displayNews(data.newsList[0], 0);
            startAutoProgress(); // 첫 번째 뉴스 데이터 표시 후 자동 진행 시작
        })
        .catch(error => console.error('데이터 가져오기 실패:', error));

    // 각 카테고리에 클릭 이벤트 리스너 추가
    navItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            clearInterval(intervalId); // 자동 진행 중지
            currentCategoryIndex = index; // 클릭한 카테고리의 인덱스를 현재 카테고리 인덱스로 지정
            currentPressIndex = 0; // 첫 번째 언론사로 초기화
            animateNavItem(); // 프로그래스바 애니메이션 및 뉴스 데이터 표시 실행
            startAutoProgress(); // 자동 진행 재시작
        });
    });

    // leftButton.addEventListener("click", function () {
    //     clearInterval(intervalId);
    //     if(currentPressIndex === 0) {
    //         currentCategoryIndex--;
    //         currentPressIndex = 0;
    //     }else {
    //         currentPressIndex--;
    //     }
    //     animateNavItem();
    //     startAutoProgress();
    // });

    // rightButton.addEventListener("click", function () {
    //     clearInterval(intervalId);
    //     if(currentPressIndex === navItems[currentCategoryIndex].length - 1) {
    //         currentCategoryIndex++;
    //         currentPressIndex = 0;
    //     }else {
    //         currentPressIndex++;
    //     }
    //     animateNavItem();
    //     startAutoProgress();
    // });

    // 자동으로 프로그래스바 애니메이션을 실행하는 함수
    function startAutoProgress() {
        intervalId = setInterval(() => {
            animateNavItem();
        }, 20000); // 20초마다 다음 요소로 이동
    }

    // 각 li 태그에 대해 애니메이션을 적용하는 함수
    function animateNavItem() {
        navItems.forEach(item => {
            item.classList.remove("active", "progress");

            // "현재 언론사 인덱스 / 해당 카테고리의 언론사 개수" 텍스트 삭제
            const anchor = item.querySelector('a');
            anchor.textContent = anchor.textContent.split(' ')[0];
        });

        const currentItem = navItems[currentCategoryIndex];
        currentItem.classList.add("active");

        fetch('./asset/data/newsData.json')
            .then(response => response.json())
            .then(data => {
                const newsData = data.newsList[currentCategoryIndex];
                // 현재 언론사의 뉴스 데이터 표시
                displayNews(newsData, currentPressIndex);

                // 강제로 리플로우를 일으켜서 같은 카테고리에서 애니메이션이 다시 시작되도록 함
                void currentItem.offsetWidth;
                currentItem.classList.add("progress");

                // "현재 언론사 인덱스 / 해당 카테고리의 언론사 개수" 텍스트 추가
                const anchor = currentItem.querySelector('a');
                anchor.style.whiteSpace = 'pre'; // 공백을 유지하도록 설정
                anchor.textContent += '     '; // 5개의 공백 문자열 추가
                anchor.textContent += `${currentPressIndex + 1} / ${newsData.press.length}`;

                // 다음 언론사로 인덱스 증가
                currentPressIndex++;

                // 모든 언론사의 뉴스 데이터가 표시된 후에 자동으로 다음 카테고리로 전환
                if (currentPressIndex >= newsData.press.length) {
                    currentPressIndex = 0; // 인덱스 초기화
                    currentCategoryIndex = (currentCategoryIndex + 1) % navItems.length; // 다음 카테고리로 이동
                }
            })
            .catch(error => console.error('데이터 가져오기 실패:', error));
    }

    // 뉴스 데이터를 동적 생성하는 함수
    function displayNews(newsData, pressIndex) {
        // 기존에 있던 내용 삭제
        articleTop.innerHTML = '';
        articleBottom.innerHTML = '';

        const pressData = newsData.press[pressIndex];

        // <div class="articleTop"> 업데이트
        const pressImage = document.createElement('img');
        pressImage.src = pressData.pressLogo;
        pressImage.alt = 'pressImage';
        const editDate = document.createElement('span');
        editDate.id = 'editDate';
        editDate.textContent = pressData.editDate;
        const subscribeBtn = document.createElement('button');
        subscribeBtn.classList.add('subscribeBtn');
        subscribeBtn.textContent = '+구독하기';

        articleTop.appendChild(pressImage);
        articleTop.appendChild(editDate);
        articleTop.appendChild(subscribeBtn);

        // <div class="articleBottom"> 업데이트
        const articleImageDiv = document.createElement('div');
        articleImageDiv.classList.add('articleImage');
        const mainNewsImage = document.createElement('img');
        mainNewsImage.id = 'mainNewsImage';
        mainNewsImage.src = pressData.mainNews.mainNewsImage;
        mainNewsImage.alt = 'mainNewsImage';
        const mainNewsTitle = document.createElement('strong');
        mainNewsTitle.id = 'mainNewsTitle';
        mainNewsTitle.textContent = pressData.mainNews.mainNewsTitle;

        articleImageDiv.appendChild(mainNewsImage);
        articleImageDiv.appendChild(mainNewsTitle);

        const articleOtherDiv = document.createElement('div');
        articleOtherDiv.classList.add('articleOther');
        const verticalList = document.createElement('ul');
        verticalList.classList.add('vertical-list');

        pressData.subNews.forEach(subNews => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = subNews.subNewsTitle;
            span.appendChild(a);
            li.appendChild(span);
            verticalList.appendChild(li);
        });

        articleOtherDiv.appendChild(verticalList);
        articleBottom.appendChild(articleImageDiv);
        articleBottom.appendChild(articleOtherDiv);
    }
});
