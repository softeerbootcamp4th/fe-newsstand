var days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

function getCurrentTime() {
    var now  = new Date();
    var year = now.getFullYear();
    var month = months[now.getMonth()];
    var date = String(now.getDate()).padStart(2, '0');
    var day = days[now.getDay()];

    var formattedDate = `${year}.${month}.${date} ${day}`;
    document.getElementById('currentTime').innerText = formattedDate;
}

getCurrentTime();