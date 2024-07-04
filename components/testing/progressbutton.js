let currentIndex = 1;
let animationTimer;

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.text-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            resetProgress(); // 다른 버튼 상태 초기화
            transformToProgress(this); // 클릭된 버튼을 progress-button으로 변경
        });
    });
});

//-----------------
function transformToProgress(element) {
    // 기존 text 저장
    element.setAttribute('data-original-text', element.textContent);

    element.classList.add('progress-button', 'transition');
    updateButtonText(element);

    animationTimer = setInterval(() => {
        currentIndex++;
        updateButtonText(element);
        clearInterval(animationTimer);
    }, 5000); 
}

function updateButtonText(element) {
    const originalText = element.getAttribute('data-original-text');
    element.textContent = `${originalText} ${currentIndex}/81`;
}

//초기화
function resetProgress() {
    currentIndex = 1;
    clearInterval(animationTimer);

    const progressButtons = document.querySelectorAll('.progress-button');
    progressButtons.forEach(button => {
        button.classList.remove('progress-button', 'transition');
        button.classList.add('text-button');
        button.textContent = button.getAttribute('data-original-text'); // 초기 텍스트로 복원
    });
}

