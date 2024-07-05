document.addEventListener('DOMContentLoaded', () => {

    const subscribeBtn = document.querySelector('.subscribe-btn');

    subscribeBtn.addEventListener('click' , () => {
        subscribeBtn.classList.toggle('my-subscribe');
        if(subscribeBtn.classList.contains('my-subscribe')) {
            subscribeBtn.textContent = 'x';
        }
        else {
            subscribeBtn.textContent = `+ 구독하기`;
        }

    })


});

function handleSubscribeBtn () {

    const subscribeBtn = document.querySelector('.subscribe-btn');

}