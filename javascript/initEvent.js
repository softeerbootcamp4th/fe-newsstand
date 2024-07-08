/*
*처음부터 적용되는 eventlistener 생성하는 함수들
*/

/*
*title 클릭 시 새로고침
*/
function refresh() {
	const titleElements = document.getElementsByClassName("Title");
	titleElements[0].addEventListener("click", function() {
		location.reload();
	});
}

/*
*외부에서 사용할 함수 다른 추가적인 함수 생성되면 추가할 예정
*/
export	function	initEvent() {
	refresh();
}
