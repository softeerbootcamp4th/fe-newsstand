function displayDate() {
    const days = ["일","월","화","수","목","금","토"];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const date = today.getDate();
    const day = today.getDay();
    const formattedDate = `${year}. ${month}. ${date}. ${days[day]}요일`;

    document.getElementById('currentDate').innerText = formattedDate;
}

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

function toggleButton(buttonId) {
    const button = document.getElementById(buttonId);
    // Remove 'active' class from all buttons
    document.querySelectorAll('.div').forEach(function(btn) {
      btn.classList.remove('active');
    });
    // Add 'active' class to the clicked button
    button.classList.add('active');
  }

let currentIndex = 0;

var btnRight = document.getElementById('btnRight');

function updateList() {
    var btnLeft = document.getElementById('btnLeft');

    // 왼쪽 버튼 상태 업데이트
    if (currentIndex === 0) {
      btnLeft.classList.add('disabled');
    } else {
      btnLeft.classList.remove('disabled');
    }
}

window.onload = updateList;
window.onload = displayDate;

function rightButtonClick() {
    currentIndex++;
    updateList();
    console.log('Current Index:', currentIndex);
}

function leftButtonClick() {
    currentIndex--;
    updateList();
    console.log('Current Index:', currentIndex);
}

function popup_sub(){
    window.open("./popup_subscribe.html", "a", "width=400, height=300, left=100, top=50"); 
}