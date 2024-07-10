document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll("nav ul li");
    const articleTop = document.querySelector('.articleTop');
    const articleBottom = document.querySelector('.articleBottom');
    let currentIndex = 0;
    let intervalId;

    // 초기 첫 번째 카테고리를 활성화 상태로 지정
    navItems[0].classList.add("active");

    // 초기 첫 번째 카테고리에 애니메이션 클래스 추가
    setTimeout(() => {
        navItems[0].classList.add("progress");
    }, 0);

    // 각 li태그 요소에 클릭 이벤트 리스너 추가
    navItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            clearInterval(intervalId); // 자동 진행 중지
            animateNavItem(index); // 프로그래스바 애니메이션 실행
            startAutoProgress(); // 자동 진행 재시작
        });
    });

    // 각 li 태그에 대해 애니메이션을 적용하는 함수
    function animateNavItem(index) {
        navItems.forEach(item => {
            item.classList.remove("active", "progress");
        });

        navItems[index].classList.add("active");
        setTimeout(() => {
            navItems[index].classList.add("progress");
        }, 50); // 타임아웃을 0ms로 설정하면 progress 클래스가 미처 추가되지 못하고 다음 애니메이션이 작동하여 프로그래스바 애니메이션이 제대로 작동하지 않을 수 있다.

        currentIndex = index; // 현재 인덱스 업데이트

        // 데이터 로드 및 표시
        fetch('./asset/data/newsData.json')
            .then(response => response.json())
            .then(data => {
                displayNews(data.newsList[index]);
            })
            .catch(error => console.error('데이터 가져오기 실패:', error));
    }

    // 자동으로 프로그래스바 애니메이션을 실행하는 함수
    function startAutoProgress() {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % navItems.length;
            animateNavItem(currentIndex);
        }, 20000); // 20초마다 다음 요소로 이동
    }

    // 초기 화면 로드 시 첫 번째 뉴스 데이터 표시
    fetch('./asset/data/newsData.json')
        .then(response => response.json())
        .then(data => {
            displayNews(data.newsList[0]);
        })
        .catch(error => console.error('데이터 가져오기 실패:', error));

    // 뉴스 데이터를 동적 생성하는 함수
    function displayNews(newsData) {
        // 기존에 있던 내용 삭제
        articleTop.innerHTML = '';
        articleBottom.innerHTML = '';

        // <div class="articleTop"> 업데이트
        const pressImage = document.createElement('img');
        pressImage.src = newsData.press[0].pressLogo;
        pressImage.alt = 'pressImage';
        const editDate = document.createElement('span');
        editDate.id = 'editDate';
        editDate.textContent = newsData.press[0].editDate;
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
        mainNewsImage.src = newsData.press[0].mainNews.mainNewsImage;
        mainNewsImage.alt = 'mainNewsImage';
        const mainNewsTitle = document.createElement('strong');
        mainNewsTitle.id = 'mainNewsTitle';
        mainNewsTitle.textContent = newsData.press[0].mainNews.mainNewsTitle;

        articleImageDiv.appendChild(mainNewsImage);
        articleImageDiv.appendChild(mainNewsTitle);

        const articleOtherDiv = document.createElement('div');
        articleOtherDiv.classList.add('articleOther');
        const verticalList = document.createElement('ul');
        verticalList.classList.add('vertical-list');
        
        newsData.press[0].subNews.forEach(subNews => {
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

    // 자동 진행 시작
    startAutoProgress();
});
