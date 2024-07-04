const allTab = document.querySelector('.all');
const subscribeTab = document.querySelector('.subscribe');

document.addEventListener("DOMContentLoaded", () => {
    allTab.addEventListener('click', () => {
        allTab.classList.add('selected-tab');
        subscribeTab.classList.remove('selected-tab');
    })
    subscribeTab.addEventListener('click', () => {
        subscribeTab.classList.add('selected-tab');
        allTab.classList.remove('selected-tab');

    })
})