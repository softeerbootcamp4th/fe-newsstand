//import { leftNews, rightNews } from "./animation.js";


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

/*

function rotateHeadlines(newsContainer, newsData) {
  let currentIndex = 0;
  const headlinesLength = newsData.length;
  let animationTimer;

  function animate() {
    const headline = document.querySelectorAll('.rollarticle');
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
*/