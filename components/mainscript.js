//import { leftNews, rightNews } from "./animation.js";

const leftNews = [
  "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출"
];

const rightNews = [
  "[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출",
  "[5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출"
];

window.addEventListener('load', function() {
  displayDate();
  updateList();
});

function displayDate() {
    const days = ["일","월","화","수","목","금","토"];
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (1 + today.getMonth())).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    const day = today.getDay();
    const formattedDate = `${year}. ${month}. ${date}. ${days[day]}요일`;

    document.getElementById('currentDate').innerText = formattedDate;
}

function clickArt(buttonId) {
  const button = document.getElementById(buttonId);

  // Remove 'active' class from all buttons
  document.querySelectorAll('.subs').forEach(function(btn) {
      btn.classList.remove('active-art');
      //btn.style.color = '#879298';
  });

  // Add 'active' class to the clicked button
  button.classList.add('active-art');
  //button.style.color = '#14212B';
}

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
});

//-------------------
function startAnimation() {
    var button = document.getElementById('colorButton');
    button.classList.add('blue-background');
    button.style.color = '#fff';
}

function resetAnimation() {
    var button = document.getElementById('colorButton');
    button.classList.remove('blue-background');
    button.style.color = '#fff';
}

function toggleButton(buttonId) {
    const button = document.getElementById(buttonId);
    // Remove 'active' class from all buttons
    document.querySelectorAll('.div').forEach(function(btn) {
      btn.classList.remove('active');
    });
    // Add 'active' class to the clicked button
    button.classList.add('active');
}

//------------------

//페이지 넘김
let currentIndex = 0;

var btnRight = document.getElementById('btnRight');
var btnLeft = document.getElementById('btnLeft');

function updateList() {

    // 왼쪽 버튼 상태 업데이트
    if (currentIndex === 0) {
      btnLeft.classList.add('disabled');
    } else {
      btnLeft.classList.remove('disabled');
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
    updateList();
    console.log('Current Index:', currentIndex);
};

function leftButtonClick() {
    currentIndex--;
    updateList();
    console.log('Current Index:', currentIndex);
};


function popup_sub(){
    window.open("./popup_subscribe.html", "a", "width=400, height=300, left=100, top=50"); 
};

function rotateHeadlines(newsContainer, newsData, subId) {
  let currentNewsIndex = 0; // currentIndex를 currentNewsIndex로 변경
  const headlinesLength = newsData.length;
  let animationTimer;

  function rolling() {
    const headline = document.createElement('div');
    headline.className = 'rollarticle';
    headline.textContent = newsData[currentNewsIndex];

    newsContainer.appendChild(headline); // 새 타이틀

    // 이전 기사 타이틀 - 사라짐
    if (newsContainer.children.length > 2) {
      // 기존 - slideOut
      for (let i = 1; i < newsContainer.children.length - 1; i++) { 
        const child = newsContainer.children[i];
        child.style.animation = 'slideOut 1s forwards';
      }
    }

    // 새로운 기사 - slideIn
    headline.style.animation = 'slideIn 1s forwards';

    setTimeout(() => {
      while (newsContainer.children.length > 2) { //rolling article만
        newsContainer.removeChild(newsContainer.children[1]);
      }
    }, 1000); // 1초 후 기존 기사 제거

    currentNewsIndex = (currentNewsIndex + 1) % headlinesLength;

    // 초기화
    animationTimer = setTimeout(rolling, 5000); // 5초 간격
  }

  if (subId === 'rightNews-sub'){
    setTimeout(rolling, 1000); //1초 지연
  }  
  else{
    rolling();
  }

  newsContainer.addEventListener('mouseenter', function() {
    clearTimeout(animationTimer); // 정지
  });

  newsContainer.addEventListener('mouseleave', function() {
    clearTimeout(animationTimer);
    rolling();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const leftNewsContainer = document.getElementById('leftNews');
  const rightNewsContainer = document.getElementById('rightNews');

  // 독립적으로 회전
  rotateHeadlines(leftNewsContainer, leftNews, 'leftNews-sub');
  rotateHeadlines(rightNewsContainer, rightNews, 'rightNews-sub');
});