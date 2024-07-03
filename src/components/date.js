const now = document.getElementById("nowDate");

function getClock(){
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2,"0");
    const nowDay = String(date.getDate()).padStart(2,"0");
    let day = date.getDay();
    if(day === 0){
        day = "일요일";
    }
    else if(day === 1){
        day = "월요일";
    }
    else if(day === 2){
        day = "화요일";
    }
    else if(day === 3){
        day = "수요일";
    }
    else if(day === 4){
        day = "목요일";
    }
    else if(day === 5){
        day = "금요일";
    }
    else if(day === 6){
        day = "토요일";
    }
    now.innerText = `${year}. ${month}. ${nowDay}. ${day}`;
}

getClock();