const nowDate = new Date();
const nowDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][nowDate.getDay()]
const dateText = `${nowDate.getFullYear()}.${nowDate.getMonth()+1}.${nowDate.getDate()}.${nowDay}`

document.querySelector('#date-text').textContent = dateText