function changeColor() {
    
    var button = document.getElementById('colorButton');
    
    button.classList.add('blue-background');
    
    // setTimeout - 되돌리기
    setTimeout(function() {
        button.classList.remove('blue-background');
    }, 1500); // 1.5초 
    
    button.style.color = '#fff';
};

export const leftns = [
    "‘오픈AI 챗GPT’ 중국 해커한테 털렸다…AI 기술 설계·세부정보 탈취",
    "“340억 송금하세요” 화상회의서 지시받은 은행직원, 꼼짝없이 당했다",
    "안 베끼는게 없네 … 한국제품 짝퉁 年 13조원 유통",
    "OECD, 한국기업 위조상품 피해 분석 삼성 이어폰·LG전자 TV 등 위조품 2건중 1건 전자제품",
    "“삼바 가족 겹경사 났네”…1.5조 수주 대박 이어 FDA 허가도 따냈다"
];
  
export const rightns = [
    "충격111 1: Duis aute irure dolor in reprehenderit",
    "충격222 2: Voluptate velit esse cillum dolore",
    "충격 3: Fugiat nulla pariatur",
    "왼쪽 바와 오른쪽 바는 각각 다른 최신 뉴스의 헤드라인 5개 롤링",
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
    rotateHeadlines(leftNewsContainer, leftns);
    rotateHeadlines(rightNewsContainer, rightns);
});
