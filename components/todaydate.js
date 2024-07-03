function displayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const date = today.getDate();
    const formattedDate = `${year}. ${month}. ${date}.`;

    document.getElementById('currentDate').innerText = formattedDate;
}
window.onload = displayDate;

/*
클릭시 색상 변경
function changeColor() {
    
    var button = document.getElementById('colorButton');
    
    button.classList.add('blue-background');
    
    // setTimeout - 되돌리기
    setTimeout(function() {
        button.classList.remove('blue-background');
    }, 1500); // 1.5초 
    
    button.style.color = '#fff';
} */

function startAnimation() {
    var button = document.getElementById('colorButton');
    button.classList.add('blue-background');
    button.style.color = '#fff';
}

function resetAnimation() {
    var button = document.getElementById('colorButton');
    button.classList.remove('blue-background');
    button.style.color = '#fff';
}

