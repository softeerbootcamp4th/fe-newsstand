let idx_loc = 1;
let animationTimer;
//전역변수 -> mainscript의 currentIndex
let buttonIndex = 0;
const testingtabs = ["10", "1","2", "5", "1", "1", "2"];

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.text-button');
    let interval;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const dataIndex = button.getAttribute('data-index');
            buttonIndex = parseInt(dataIndex);
            resetProgress(); // 다른 버튼 상태 초기화
            transformToProgress(button); // 클릭된 버튼을 progress-button으로 변경
        });
    });
    const elementsWithDataIndex0 = document.querySelector('[data-index="0"]');

    transformToProgress(elementsWithDataIndex0);
}); 
  
//-----------------
const transformToProgress = (element) => {
    // 기존 text 저장
    element.setAttribute('data-original-text', element.textContent);
    const dataIndex = element.getAttribute('data-index');
    element.setAttribute('totalpages', testingtabs[dataIndex]);
    element.classList.remove('text-button');
    element.classList.add('progress-button','animate');
    updateButtonText(element);

    animationTimer = setInterval(() => {
        idx_loc++;
        if (idx_loc > parseInt(element.getAttribute('totalpages'))) {
            idx_loc = 1;
            moveToNextButton();
        } else {
            updateButtonText(element);
        }
    }, 2000); 

}

const updateButtonText = (element) => {
    const originalText = element.getAttribute('data-original-text');
    const totalp = element.getAttribute('totalpages');
    element.textContent = `${originalText}` +`  ${idx_loc}/${totalp}`;
}

const resetProgress = () => {
    idx_loc = 1;
    clearInterval(animationTimer);

    const progressButtons = document.querySelectorAll('.progress-button');
    progressButtons.forEach(button => {
        button.classList.remove('progress-button');
        button.classList.add('text-button');
        button.textContent = button.getAttribute('data-original-text'); // 초기 텍스트로 복원
    });
}

const moveToNextButton = () => {
    resetProgress();
    const buttons = document.querySelectorAll('.text-button');
    buttonIndex = (buttonIndex + 1) % buttons.length;
    const nextButton = buttons[buttonIndex];
    transformToProgress(nextButton);
}