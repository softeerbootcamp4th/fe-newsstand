document.addEventListener("DOMContentLoaded", function() {
    const navItem = document.getElementById("nav-item-1");
    
    // 0.1초 지연 후 애니메이션 시작
    setTimeout(() => {
      navItem.classList.add('progress');
    }, 100); // DOM이 로드된 후 애니메이션 시작
  });
  