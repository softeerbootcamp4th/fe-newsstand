import { displayDate } from "./date/date.js";
import { updateNewsDisplay } from "./displaynews/displayNews.js";
//import displaysubscribe from "./displaynews/displaysubscribe.js";
import { subscribePress } from "./subscribe/subscribe.js";
import { mytabs, originaltabs, tabgenerator } from "./newstab/newstab.js";

window.addEventListener('load', function() {
  displayDate();
  updateList();
});

//페이지 넘김
//  전역변수
export const currentIndex = 0;
let pushedButton = "";
//press 종류
let buttonId = "";
window.maxpage = 2;
window.btntext = "";
//------

/*
//뉴스 탭이 클릭 되었을 때 실행된다.
export default function handlefilters(event) {
  pushedButton = event.target;
  buttonId = pushedButton.id;
  currentIndex = 0;
  updateList();
  const filteredItems = window.newsData.filter(item => item.pressType === buttonId);
  btntext = filteredItems[currentIndex].pressName;
  //window.maxpage = filteredItems.length;
  //updateList();
  updateNewsDisplay(buttonId, currentIndex);
} */

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
    console.log(window.maxpage);
    // 왼쪽 버튼 상태 업데이트
    if (currentIndex === 0) {
      btnLeft.classList.add('disabled');
    } else {
      btnLeft.classList.remove('disabled');
    }
    if (currentIndex === window.maxpage) {
      btnRight.classList.add('disabled');
    } else {
      btnRight.classList.remove('disabled');
    }
}

btnRight.addEventListener('click', () => {
  rightButtonClick(window.maxpage);
});
btnLeft.addEventListener('click', () => {
  leftButtonClick();
});

function rightButtonClick(ttt) {
  if(currentIndex < ttt - 1){
    currentIndex++;
    //오른쪽 버튼
    updateList();
    updateNewsDisplay(buttonId, currentIndex);
  }
};

function leftButtonClick() {
  if (currentIndex > 0) {
    //왼쪽 버튼
    currentIndex--;
    updateList();
    updateNewsDisplay(buttonId, currentIndex);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 버튼 클릭 이벤트 리스너 추가
  const allArticleButton = document.getElementById('all-article');
  const myArticleButton = document.getElementById('my-article');

  allArticleButton.addEventListener('click', () => {
      clickArt('all-article');
      originaltabs();
      tabgenerator();
  });

  myArticleButton.addEventListener('click', () => {
      clickArt('my-article');
      mytabs();
  });
  //default로 첫번째가 선택되어 있게
  tabgenerator();
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.news-list-container');
    // 이벤트 위임 -  부모 요소에 이벤트 리스너 설정
    container.addEventListener('click', (event) => {
      //news-press-subscribe에만 적용
      const subscribeButton = event.target.closest('.news-press-subscribe');
      if (subscribeButton) {
          subscribePress(window.btntext);
      }
  });
}); 


