document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll("nav ul li");
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
            animateNavItem(index);
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
    }

    // 자동으로 프로그래스바 애니메이션을 실행하는 함수
    function startAutoProgress() {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % navItems.length;
            animateNavItem(currentIndex);
        }, 20000); // 20초마다 다음 요소로 이동
    }

    // 자동 진행 시작
    startAutoProgress();
});
