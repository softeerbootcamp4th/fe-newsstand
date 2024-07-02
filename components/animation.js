function changeColor() {
    
    var button = document.getElementById('colorButton');
    
    button.classList.add('blue-background');
    
    // setTimeout - 되돌리기
    setTimeout(function() {
        button.classList.remove('blue-background');
    }, 1500); // 1.5초 
    
    button.style.color = '#fff';
}
