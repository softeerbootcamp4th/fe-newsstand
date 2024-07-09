export const cancelAlert = (text, onPositiveClick, onNegativeClick) => {

    const positiveButton = document.getElementById('positiveButton');
    const negativeButton = document.getElementById('negativeButton');

    positiveButton.addEventListener('mouseenter', () => {
        positiveButton.classList.replace('available-medium16', 'hover-medium16');
    });

    negativeButton.addEventListener('mouseenter', () => {
        negativeButton.classList.replace('available-medium16', 'hover-medium16');
    })

    positiveButton.addEventListener('mouseleave', () => {
        positiveButton.classList.replace('hover-medium16', 'available-medium16');
    });

    negativeButton.addEventListener('mouseenter', () => {
        negativeButton.classList.replace('hover-medium16', 'available-medium16');
    });

    positiveButton.addEventListener('click', () => {
        onPositiveClick();
    });

    negativeButton.addEventListener('click', () => {
        onNegativeClick();
        const modal = document.getElementById('cancelAlert');
        modal.remove();
    });



    return `
        <div id="cancelAlert">
            <div id="cancelAlertTop">
                <p class="display-bold16"><strong>${text}</strong>을/를<br>구독해지하시겠습니까?</p>
            </div>
            <div id="cancelAlertBottom">
                <button id="positiveButton" class="available-medium16">예, 해지합니다.</button>
                <button id="negativeButton" class="available-medium16">아니오</button>
            </div>
        </div>
    `;
}