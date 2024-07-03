function changeColor() {
    
    var button = document.getElementById('colorButton');
    
    button.classList.add('blue-background');
    
    // setTimeout - 되돌리기
    setTimeout(function() {
        button.classList.remove('blue-background');
    }, 1500); // 1.5초 
    
    button.style.color = '#fff';
}


const leftNews = [
    "속보 1: Lorem ipsum dolor sit amet",
    "속보 2: Consectetur adipiscing elit",
    "속보 3: Sed do eiusmod tempor incididunt ut labore",
    "속보 4: Et dolore magna aliqua",
    "속보 5: Ut enim ad minim veniam"
];
  
const rightNews = [
    "충격111 1: Duis aute irure dolor in reprehenderit",
    "충격222 2: Voluptate velit esse cillum dolore",
    "충격 3: Fugiat nulla pariatur",
    "왼쪽 바와 오른쪽 바는 각각 다른 최신 뉴스의 헤드라인 5개가 5초마다 자동으로 무한 롤링되도록 한다.",
    "Latest Update 5: Sunt in culpa qui officia deserunt mollit anim"
];

function rotateHeadlines(newsContainer, newsData) {
    let currentIndex = 0;
    const headlinesLength = newsData.length;
    let animationTimer;
  
    function animate() {
      const headline = document.createElement('div');
      headline.className = 'headline';
      headline.textContent = newsData[currentIndex];
  
      newsContainer.appendChild(headline); //새 타이틀
  
      // 이전 기사 타이틀 - 사라짐
      if (newsContainer.children.length > 1) {
        // 기존 - slideout
        for (let i = 0; i < newsContainer.children.length - 1; i++) {
          const child = newsContainer.children[i];
          child.style.animation = 'slideOut 1s forwards';
        }
      }
  
      // 새로운 기사 - slidein
      headline.style.animation = 'slideIn 1s forwards';
  
      setTimeout(() => {
        while (newsContainer.children.length > 1) {
          newsContainer.removeChild(newsContainer.children[0]);
        }
      }, 1000); // 1초 후 기존 기사 타이틀 제거
  
      currentIndex = (currentIndex + 1) % headlinesLength;
  
      // 초기화
      animationTimer = setTimeout(animate, 5000); // 5초 간격
    }
  
    animate();
  
    newsContainer.addEventListener('mouseenter', function() {
      clearTimeout(animationTimer); //정지
    });
  
    newsContainer.addEventListener('mouseleave', function() {
      clearTimeout(animationTimer); 
      animate(); 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const leftNewsContainer = document.getElementById('leftNews');
    const rightNewsContainer = document.getElementById('rightNews');
  
    //독립적으로 회전
    rotateHeadlines(leftNewsContainer, leftNews);
    rotateHeadlines(rightNewsContainer, rightNews);
});