
export function subscribePress(buttonId, btntxt) {
    const newPressData = btntxt;
      //pressType: buttonId,btntxt;
  
    let existingPressData = localStorage.getItem('mysubscribe');
    let pressDataArray = existingPressData ? JSON.parse(existingPressData) : [];
    if (!pressDataArray.includes(btntxt)){
        //데이터 추가
        pressDataArray.push(newPressData);
  
        localStorage.setItem('mysubscribe', JSON.stringify(pressDataArray));
  
        // 버튼 이미지 변경
        const button = document.querySelector(`.news-press-subscribe`);
        button.innerHTML = '<img src="../../image/cancel.svg" alt="Subscribed">'; // 버튼 이미지 변경
    }
    
}
