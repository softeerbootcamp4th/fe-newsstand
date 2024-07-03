 // HTML 문서가 완전히 로드되고 파싱된 후 발생
document.addEventListener("DOMContentLoaded", function() {
    // <nav> 내 모든 <li> 태그 선택
    const navItems = document.querySelectorAll("nav ul li");
    navItems[0].classList.add("active");

    // 각 <li> 태그에 클릭 이벤트 리스너 추가
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            // 모든 <li> 태그에서 'active' 클래스 제거
            navItems.forEach(item => {
                item.classList.remove("active");
            });
            // 클릭된 <li> 태그에 'active' 클래스 추가
            this.classList.add("active");
        });
    });
});
