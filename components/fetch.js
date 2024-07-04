const jsonFilePath = '../news/allnews.json';
const xhr = new XMLHttpRequest();
var datatotal = "";
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            datatotal= JSON.parse(xhr.responseText);
            console.log(datatotal); // 데이터 확인용
        } else {
            console.error('Error fetching JSON:', xhr.status);
        }
    }
};

xhr.open('GET', jsonFilePath);
xhr.send();

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.text-button');
    buttons.forEach(button => {
        button.addEventListener('click', handlefilters);
    });
});

function handlefilters(event) {
    const clickedButton = event.target;
    const buttonId = clickedButton.id;

    console.log('Clicked Button ID:', buttonId);

    // JSON 데이터에서 pressType이 클릭된 버튼의 ID와 일치하는 아이템들을 필터링하여 콘솔에 출력
    const filteredItems = datatotal.filter(item => item.pressType === buttonId);
    console.log('Filtered Items:', filteredItems);
}
