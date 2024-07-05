import { leftns, rightns } from "./animation.js";
import { displayDate } from "./date/date.js";
import { updateNewsDisplay } from "./displaynews/displayNews.js";
//import displaysubscribe from "./displaynews/displaysubscribe.js";
import { subscribePress } from "./subscribe/subscribe.js";

window.addEventListener('load', function() {
  displayDate();
  updateList();
});

//페이지 넘김
//  전역변수
let currentIndex = 0;
let pushedButton = "";
//press 종류
let buttonId = "";
let maxpage = 100;
let btntext = "";
//------

//뉴스 탭이 클릭 되었을 때 실행된다.
function handlefilters(event) {
    pushedButton = event.target;
    buttonId = pushedButton.id;
    currentIndex = 0;
    updateList();
    const filteredItems = datatotal.filter(item => item.pressType === buttonId);
    btntext = filteredItems[currentIndex].pressName;
    maxpage = filteredItems.length;
    updateList();
    updateNewsDisplay(buttonId, currentIndex);
}

//------

function clickArt(buttonId) {
  const button = document.getElementById(buttonId);

  // Remove 'active' class from all buttons
  document.querySelectorAll('.subs').forEach(function(btn) {
      btn.classList.remove('active-art');
  });

  // Add 'active' class to the clicked button
  button.classList.add('active-art');
}

//------------------

var btnRight = document.getElementById('btnRight');
var btnLeft = document.getElementById('btnLeft');

function updateList() {
    // 왼쪽 버튼 상태 업데이트
    if (currentIndex === 0) {
      btnLeft.classList.add('disabled');
    } else {
      btnLeft.classList.remove('disabled');
    }
    if (currentIndex === maxpage) {
      btnRight.classList.add('disabled');
    } else {
      btnRight.classList.remove('disabled');
    }
}

btnRight.addEventListener('click', function() {
  rightButtonClick();
});
btnLeft.addEventListener('click', function() {
  leftButtonClick();
});

function rightButtonClick() {
    currentIndex++;
    //오른쪽 버튼
    updateList();
    updateNewsDisplay(buttonId, currentIndex);
};

function leftButtonClick() {
    //왼쪽 버튼
    currentIndex--;
    updateList();
    updateNewsDisplay(buttonId, currentIndex);
};

function rotateHeadlines(newsContainer, newsData, subId) {
  let currentNewsIndex = 0; 
  const headlinesLength = newsData.length;
  let animationTimer;

  function rolling() {
    // 기존 headline 요소 삭제
    const existingHeadline = document.getElementById(subId);
    if (existingHeadline) {
      existingHeadline.remove();
    }

    const headline = document.createElement('div');
    headline.className = 'rollarticle';
    headline.id = subId;
    headline.textContent = newsData[currentNewsIndex];
    newsContainer.appendChild(headline); // 새 타이틀 추가

    if (newsContainer.children.length > 1){
      for(let i=0;i<newsContainer.children.length - 1;i++){
        const child = newsContainer.children[i];
        child.style.animation = 'slideOut 1s forwards'
      }
    }

    // 새로운 기사 - slideIn 애니메이션 적용
    headline.style.animation = 'slideIn 1s forwards';

    // 1초 후 이전 기사 타이틀 제거
    setTimeout(() => {
      while (newsContainer.children.length > 1) {
        newsContainer.removeChild(newsContainer.children[0]);
      }
    }, 1000);

    currentNewsIndex = (currentNewsIndex + 1) % headlinesLength;

    // 초기화 및 다음 기사 호출
    animationTimer = setTimeout(rolling, 5000); // 5초 간격
  }

  // 1초 지연 설정
  if (subId === 'rightNews-sub') {
    setTimeout(rolling, 1000); // 1초 지연
  } else {
    rolling();
  }

  // 마우스 이벤트 핸들러
  newsContainer.addEventListener('mouseenter', function() {
    clearTimeout(animationTimer); // 정지
  });

  newsContainer.addEventListener('mouseleave', function() {
    clearTimeout(animationTimer);
    rolling(); // 재개
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const leftNewsContainer = document.getElementById('leftNews');
  const rightNewsContainer = document.getElementById('rightNews');

  // 독립적으로 회전
  rotateHeadlines(leftNewsContainer, leftns, 'leftNews-sub');
  rotateHeadlines(rightNewsContainer, rightns, 'rightNews-sub');
});

document.addEventListener('DOMContentLoaded', function() {
  // 버튼 클릭 이벤트 리스너 추가
  const allArticleButton = document.getElementById('all-article');
  const myArticleButton = document.getElementById('my-article');

  allArticleButton.addEventListener('click', function() {
      clickArt('all-article');
  });

  myArticleButton.addEventListener('click', function() {
      clickArt('my-article');
  });
  const buttons = document.querySelectorAll('.text-button');
  buttons.forEach(button => {
      button.addEventListener('click', handlefilters);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const bt1 = document.querySelector('.news-press-subscribe');
    bt1.addEventListener('click', function() {
      subscribePress(buttonId, btntext);
  });
});