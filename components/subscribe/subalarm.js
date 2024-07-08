export const showsubmodal = () => {
    const modal = document.getElementById('submodal');
    modal.innerText = "내가 구독한 언론사에 추가되었습니다.";
    modal.className = 'active';
    setTimeout(() => {
        modal.classList.remove('active');
    }, 5000);
}