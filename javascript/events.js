import {findParentWithClass} from "./utils.js";
import {setNewsList} from "./setData.js";

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
*탭 항목 클릭 시 feild 변경 및 내용 변경
*탭 클래스에 .fieldChosen 추가하기 위해 utils.js에 있는 findParentWithClass 함수 사용
*/
function clickTab(current_idx, typenames, typeDeques) {
	const	fieldTabElement = document.querySelector(".FieldTab");
	if (fieldTabElement)
	{
		fieldTabElement.addEventListener("click", function(event) {
			const	parentWithClassTab = findParentWithClass(event.target, "Tab");
			const	tabElements = fieldTabElement.querySelectorAll(".Tab");
			if (parentWithClassTab === null)
				;
			else
			{
				const	tabName = parentWithClassTab.getAttribute("data-tab");
				tabElements.forEach((content, idx) => {
					if (content.getAttribute("data-tab") === tabName)
					{
						content.classList.add("fieldChosen");
						current_idx(idx, 0);
						setNewsList(tabName, typeDeques[typenames[idx]]);
					}
					else
						content.classList.remove("fieldChosen");
				});
			}
		});
	}
}

function clickButton(current_idx, typenames, typeDeques) {
	const	fieldNames = ["all", "broad", "it", "english", "sports", "magazine", "region"];
	const	tabElements = document.querySelectorAll(".Tab");
	let		next_deque;
	
	function getCurrentDeque() {
		return typeDeques[typenames[current_idx(-1, 0)]];
	}

	document.querySelector(".LeftButton").addEventListener("click", () => {
		const	current_deque = getCurrentDeque();
		if (current_deque.current === 1)
		{
			current_idx(-1, -1);
			next_deque = getCurrentDeque();
			next_deque.rotate(-1);
		}
		else
		{
			next_deque = current_deque;
			next_deque.rotate(1);
		}
		setNewsList(fieldNames[current_idx(-1, 0)], next_deque);
		tabElements.forEach((content, idx) => {
			content.classList.toggle("fieldChosen", idx === current_idx(-1, 0));
		});
	});

	document.querySelector(".RightButton").addEventListener("click", () => {
		const	current_deque = getCurrentDeque();
		if (current_deque.current === current_deque.size())
		{
			current_deque.rotate(-1);
			current_idx(-1, 1);
			next_deque = getCurrentDeque();
		}
		else
		{
			next_deque = current_deque;
			next_deque.rotate(-1);
		}
		setNewsList(fieldNames[current_idx(-1, 0)], next_deque);
		tabElements.forEach((content, idx) => {
			content.classList.toggle("fieldChosen", idx === current_idx(-1, 0));
		});
	});
}

/*
*외부에서 사용할 함수 다른 추가적인 함수 생성되면 추가할 예정
*/
export	function	addEvents(typenames, typeDeques) {
	// 클로저를 사용하여 static 변수 선언했지만 addEvents는 한 번 호출하므로 의미가 없는 거 같기두...
	const	current_idx = (() => {
		let	i = 0;
		return (idx, move) => {
			if (idx === -1)
			{
				i = i + move;
				if (i < 0)
					i = typenames.length - 1;
				else if (i >= typenames.length)
					i = 0;
			}
			else
				i = idx;
			return (i);
		}
	})();

	refresh();
	clickTab(current_idx, typenames, typeDeques);
	clickButton(current_idx, typenames, typeDeques);
}
