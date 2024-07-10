import {findParentWithClass} from "./utils.js";

/*
*eventlistener 생성하는 함수들
*/

/*
*title 클릭 시 새로고침
*/
function refresh() {
	const	titleElement = document.querySelector(".Title");
	if (titleElement)
	{
		titleElement.addEventListener("click", function() {
			location.reload();
		});
	}
}

/*
*탭 항목 클릭 시 class 변경 (내용 변경도 추가할 예정)
*탭 클래스에 .Field-chosen 추가하기 위해 utils.js에 있는 findParentWithClass 함수 사용
*/
function clickTab() {
	const	fieldTabElement = document.querySelector(".FieldTab");
	if (fieldTabElement)
	{
		fieldTabElement.addEventListener("click", function(event) {
			const	parentWithClassTab = findParentWithClass(event.target, "Tab");
			if (parentWithClassTab === null)
				;
			else
			{
				const	chosenElement = document.querySelector(".Field-chosen");
				if (chosenElement)
					chosenElement.classList.remove("Field-chosen");
				parentWithClassTab.classList.add("Field-chosen");
			}
		});
	}
}

/*
*외부에서 사용할 함수 다른 추가적인 함수 생성되면 추가할 예정
*/
export	function	addEvents() {
	refresh();
	clickTab();
}
