document.addEventListener("DOMContentLoaded", function() {
    // <nav> 내 모든 <li> 태그 선택
    const navItems = document.querySelectorAll("nav ul li");
    navItems[0].classList.add("active");

    // 각 <li> 태그에 클릭 이벤트 리스너 추가
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            // 모든 <li> 태그에서 'active' 클래스 및 'progress' 클래스 제거
            navItems.forEach(item => {
                item.classList.remove("active");
                item.classList.remove("progress");
            });
            // 클릭된 <li> 태그에 'active' 클래스 추가
            this.classList.add("active");

            // 타임아웃 없이 클래스를 추가하면 애니메이션이 시작되지 않을 수 있음
            setTimeout(() => {
                this.classList.add('progress');
            }, 0); // 클릭 후 0초 후에 애니메이션 시작
        });
    });

    // 초기 활성화된 항목에 애니메이션 클래스 추가
    setTimeout(() => {
        navItems[0].classList.add('progress');
    }, 100);
});
