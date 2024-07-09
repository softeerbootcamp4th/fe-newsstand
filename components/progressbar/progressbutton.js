import { testingpages, indexstate } from "../displaynews/displayNews.js";
import { newstype } from "../newstab/newstab.js";
import { updateNewsDisplay } from "../displaynews/displayNews.js";

let animationTimer;

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.text-button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            resetProgress(); // 버튼 상태 초기화
            transformToProgress(event.currentTarget); 
        });
    });
});

export const transformToProgress = (element) => {
    element.setAttribute('data-original-text', element.textContent);
    element.classList.add('progress-button');

    const maxrepeat = testingpages[Number(element.dataset.index)];
    let counts = 0;

    const startAnimation = () => {
        element.classList.add('animate');
        
        setTimeout(() => {
            element.classList.remove('animate');
        }, 2000);
    };

    const updateProgress = () => {
        indexstate.pageIndex++;
        counts++;
        updateButtonText(element);
        updateNewsDisplay(newstype[indexstate.pressIndex], indexstate.pageIndex);

        if (counts >= maxrepeat) {
            clearInterval(animationTimer);
            indexstate.pressIndex = (indexstate.pressIndex + 1) % newstype.length;
            indexstate.pageIndex = 0;
            const nextButton = document.querySelector(`.text-button[data-index="${indexstate.pressIndex}"]`);
            resetProgress();
            transformToProgress(nextButton);
            updateNewsDisplay(newstype[indexstate.pressIndex], indexstate.pageIndex);
            return;
        }

        startAnimation();
    };

    updateButtonText(element);
    startAnimation();

    animationTimer = setInterval(updateProgress, 2100);
}

export const updateButtonText = (element) =>{
    const originalText = element.getAttribute('data-original-text').replace(/\s+\d+\/\d+$/, '');
    let spanElement = element.querySelector('span');
    if (!spanElement){
        spanElement = document.createElement('span');
        element.appendChild(spanElement);
    }
    const iii = element.dataset.index;
    const snum = Number(iii);
    spanElement.textContent = `${indexstate.pageIndex + 1}/${testingpages[snum]}`;
    element.textContent = originalText + ' ';
    element.appendChild(spanElement);
}

export const resetProgress = () =>  {
    clearInterval(animationTimer);

    const progressButtons = document.querySelectorAll('.progress-button');
    progressButtons.forEach(button => {
        button.classList.remove('progress-button', 'animate');
        button.classList.add('text-button');
        button.textContent = button.getAttribute('data-original-text'); // 초기 텍스트로 복원
    });
}

export const moveToNextCatidx = (pridx) => {
    resetProgress();
    const buttons = document.querySelectorAll('.text-button');
    const nextButton = buttons[pridx];
    transformToProgress(nextButton);
}
