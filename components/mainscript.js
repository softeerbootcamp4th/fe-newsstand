import { displayDate } from "./utils/date.js";
import { subscribePress } from "./subscribe/subscribe.js";


window.addEventListener('load', function() {
  displayDate();
});

//press 종류
let buttonId1 = "";
window.btntext = "";

export function clickArt(buttonId1) {
  const buttoning = document.getElementById(buttonId1);

  // Remove 'active' class from all buttons
  document.querySelectorAll('.subs').forEach((btn) => {
      btn.classList.remove('active-art');
  });

  buttoning.classList.add('active-art');
}


//이벤트 위임 문제?
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