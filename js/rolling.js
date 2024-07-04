document.addEventListener('DOMContentLoaded', ()=> {
    // 좌우 롤링 인터벌 설정
    let intervalLeft = window.setInterval(rollingLeftCallback, 5000);
    let intervalRight;
    // intervalRight는 intervalLeft보다 1초 늦게 실행되도록 Timeout 이용
    setTimeout(() => {
        intervalRight = window.setInterval(rollingRightCallback, 5000);
    }, 1000);

    //마우스 hover시 롤링이 멈추었다 벗어나면 다시 롤링이 되도록 처리
    document.querySelector('.headline-left-group').addEventListener('mouseover', function(){
        window.clearInterval(intervalLeft);
    })
    document.querySelector('.headline-left-group').addEventListener('mouseout', function(){
        intervalLeft = window.setInterval(rollingLeftCallback, 5000);
    })
    document.querySelector('.headline-right-group').addEventListener('mouseover', function(){
        window.clearInterval(intervalRight);
    })
    document.querySelector('.headline-right-group').addEventListener('mouseout', function(){
        intervalRight = window.setInterval(rollingRightCallback, 5000);
    })
})

// 왼쪽 헤드라인 콜백함수
function rollingLeftCallback() {
    //.prev 클래스 삭제
    document.querySelector('.headline-left-group .prev').classList.remove('prev');

    //.current -> .prev
    let currentLeft = document.querySelector('.headline-left-group .current');
    currentLeft.classList.remove('current');
    currentLeft.classList.add('prev');

    //.next -> .current
    let nextLeft = document.querySelector('.headline-left-group .next');

    //다음 목록 요소가 널인지 체크
    if(nextLeft.nextElementSibling == null) {
        document.querySelector('.headline-left-group ul li:first-child').classList.add('next');
    }else {
        //목록 처음 요소를 다음 요소로 선택
        nextLeft.nextElementSibling.classList.add('next');
    }

    nextLeft.classList.remove('next');
    nextLeft.classList.add('current');
}

// 오른쪽 헤드라인 콜백 함수
function rollingRightCallback() {
    //.prev 클래스 삭제
    document.querySelector('.headline-right-group .prev').classList.remove('prev');

    //.current -> .prev
    let currentRight = document.querySelector('.headline-right-group .current');
    currentRight.classList.remove('current');
    currentRight.classList.add('prev');

    //.next -> .current
    let nextRight = document.querySelector('.headline-right-group .next');

    //다음 목록 요소가 널인지 체크
    if(nextRight.nextElementSibling == null) {
        document.querySelector('.headline-right-group ul li:first-child').classList.add('next');
    }else {
        //목록 처음 요소를 다음 요소로 선택
        nextRight.nextElementSibling.classList.add('next');
    }

    nextRight.classList.remove('next');
    nextRight.classList.add('current');
}