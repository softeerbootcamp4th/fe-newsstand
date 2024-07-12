import { newstype } from "../newstab/newstab.js";
import { updateNewsDisplay } from "../displaynews/displayNews.js";
import stateManager from "../statemanager/stateManager.js";
export let animationTimer;

export const transformToProgress = (element) => {
    console.log(stateManager.getPressIndex());
    console.log(stateManager.getPageIndex());
    element.setAttribute('data-original-text', element.textContent);
    element.classList.add('progress-button');
    const pageindex = stateManager.getPages();
    const maxrepeat = pageindex[Number(element.dataset.index)];
    let counts = 0;

    const startAnimation = () => {
        element.classList.add('animate');
        
        setTimeout(() => {
            element.classList.remove('animate');
        }, 2000);
    };

    const updateProgress = () => {
        stateManager.setPageIndex(stateManager.getPageIndex() + 1);
        console.log(stateManager.getPressIndex());
        console.log(stateManager.getPageIndex());
        counts++;
        updateButtonText(element);
        updateNewsDisplay(newstype[stateManager.getPressIndex()], stateManager.getPageIndex());

        if (counts >= maxrepeat) {
            clearInterval(animationTimer);
            stateManager.setPressIndex((stateManager.getPressIndex() + 1) % newstype.length);
            stateManager.setPageIndex(0);

            const nextButton = document.querySelector(`.text-button[data-index="${stateManager.getPressIndex()}"]`);
            resetProgress();
            transformToProgress(nextButton);
            updateNewsDisplay(newstype[stateManager.getPressIndex()], stateManager.getPageIndex());
            return;
        }

        startAnimation();
    };

    clearInterval(animationTimer); // 기존 애니메이션 타이머 초기화
    updateButtonText(element);
    startAnimation();

    animationTimer = setInterval(updateProgress, 2050);
}

export const updateButtonText = (element) => {
    const originalText = element.getAttribute('data-original-text').replace(/\s+\d+\/\d+$/, '');
    let spanElement = element.querySelector('span');
    if (!spanElement){
        spanElement = document.createElement('span');
        element.appendChild(spanElement);
    }
    const iii = element.dataset.index;
    const snum = Number(iii);
    const pageindex = stateManager.getPages();
    spanElement.textContent = `${stateManager.getPageIndex() + 1}/${pageindex[snum]}`;
    element.textContent = originalText;
    element.appendChild(spanElement);
}

export const resetProgress = () => {
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
