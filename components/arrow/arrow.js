import { addNextPageEvent, addPrePageEvent } from "../articleList/event/pageEvent.js"

export const createArrow = () => {
    return `
        <div class="arrow-wrapper">
            <div class="left-arrow-wrapper">
                <button class="left-arrow-btn">
                    <img src="/images/buttons/leftButton.png" />
                </button>
            </div>
            <div class="right-arrow-wrapper">
                <button class="right-arrow-btn">
                    <img src="/images/buttons/rightButton.png" />
                </button>    
            </div>
        </div>
    `
}

export const initArrow = () => {
    addEventListeners();
}

const addEventListeners = () => {
    addEventListenerLeftArrow();
    addEventListenerRightArrow();
}

const addEventListenerLeftArrow = () => {
    const leftArrow = document.querySelector('.left-arrow-btn');
    const thisBtn = document.querySelector('.menu-btn-wrapper-clicked') !== null ? document.querySelector('.menu-btn-wrapper-clicked') : document.querySelectorAll('.menu-btn-wrapper')[0]
    leftArrow.addEventListener('click', () => {
        addPrePageEvent({ isNow: true })
    })
}

const addEventListenerRightArrow = () => {
    const rightArrow = document.querySelector('.right-arrow-btn');
    const thisBtn = document.querySelector('.menu-btn-wrapper-clicked');
    const nextBtn = thisBtn.nextElementSibling !== null ? thisBtn.nextElementSibling : thisBtn.parentElement.firstElementChild;
    rightArrow.addEventListener('click', () => {
        addNextPageEvent({ isNow: true })
    })
}