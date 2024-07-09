export const showsubmodal = () => {
    const modal = document.getElementById('submodal');
    modal.innerText = "내가 구독한 언론사에 추가되었습니다.";
    modal.className = 'active';
    setTimeout(() => {
        modal.classList.remove('active');
    }, 5000);
}

export const showcancelmodal = (bt_text) =>{
    const modal = document.getElementById('cancelmodal');
    modal.innerText = bt_text+"을(를) 구독해지하겠습니까?";
    modal.className = 'active';
    setTimeout(() => {
        modal.classList.remove('active');
    }, 5000);
}