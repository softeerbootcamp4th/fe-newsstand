let idx_loc = 1;
//import {currentIndex} from "../mainscript.js";
let animationTimer;

//this -> 에러 왜?
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.text-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            resetProgress(); // 다른 버튼 상태 초기화
            transformToProgress(button); // 클릭된 버튼을 progress-button으로 변경
        });
    });
});

//-----------------
export const transformToProgress = (element) => {
    // 기존 text 저장
    element.setAttribute('data-original-text', element.textContent);

    element.classList.add('progress-button', 'animate');
    updateButtonText(element);

    animationTimer = setInterval(() => {
        idx_loc++;
        updateButtonText(element);
        //clearInterval(animationTimer);
    }, 2000); 
}

export const updateButtonText = (element) =>{
    const originalText = element.getAttribute('data-original-text');
    element.textContent = `${originalText}      ${idx_loc}/81`;
}

//초기화
export const resetProgress = () =>  {
    idx_loc = 1;
    clearInterval(animationTimer);

    const progressButtons = document.querySelectorAll('.progress-button');
    progressButtons.forEach(button => {
        button.classList.remove('progress-button', 'animate');
        button.classList.add('text-button');
        button.textContent = button.getAttribute('data-original-text'); // 초기 텍스트로 복원
    });
}

