import { showcancelmodal, showsubmodal } from "./subalarm.js";
let existingPressData = localStorage.getItem('mysubscribe');
let pressDataArray = existingPressData ? JSON.parse(existingPressData) : [];

//구독버튼 누르면 -> 구독하기
export const subscribePress = (btntxt) => {
    const newPressData = btntxt;
      //pressType: buttonId,btntxt;
    console.log(btntxt);
    if (!pressDataArray.includes(btntxt)){
        //데이터 추가
        pressDataArray.push(newPressData);
  
        localStorage.setItem('mysubscribe', JSON.stringify(pressDataArray));
  
        // 버튼 이미지 변경
        const button = document.querySelector(`.news-press-subscribe`);
        button.innerHTML = '<img src="../../icons/cancel.svg" alt="Subscribed">'; // 버튼 이미지 변경
        showsubmodal();
        console.log("dkseho");
    }
    else{
        cancelsubscribe(btntxt);
    }
        
}

//구독되었는지?
export const showsubscribe = (btntext) => {
  if (pressDataArray.includes(btntext)) {
      const btn = document.querySelector(`.news-press-subscribe`);
      btn.innerHTML = '<img src="../../icons/cancel.svg" alt="Cancel">';
  }
  else{
    const btn = document.querySelector(`.news-press-subscribe`);
    btn.innerHTML = '<img src="../../icons/Subscribe.svg" alt="Subscribe">';
  }
}

//구독취소
export const cancelsubscribe = (btntext1) => {
  if (pressDataArray.includes(btntext1)) {
    showcancelmodal(btntext1);
    const btn = document.querySelector(`.news-press-subscribe`);
    btn.innerHTML = '<img src="../../icons/Subscribe.svg" alt="Subscribe">';
    pressDataArray = pressDataArray.filter(item => item !== btntext1);
    const updatedsubs = JSON.stringify(pressDataArray);
    localStorage.setItem('mysubscribe' , updatedsubs);
  }
}