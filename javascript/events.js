import {findParentWithClass} from "./utils.js";
import {setPressInfo, setNewsList} from "./setData.js";

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
function clickFieldTab(current_idx, typenames, typeDeques) {
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

/*
*전체 언론사, 구독 언론사 클릭
*/
function clickTab(current_idx, typenames, typeDeques, subscribed_list) {
	const	fieldNames = ["all", "broad", "it", "english", "sports", "magazine", "region"];
	const	allPressElement = document.querySelector(".AllPress");
	const	subscribedPressElement = document.querySelector(".SubscribedPress");

	if (allPressElement && subscribedPressElement)
	{
		allPressElement.addEventListener("click", () => {
			allPressElement.style.fontWeight = "bold";
			allPressElement.style.color = "#14212B";
			subscribedPressElement.style.fontWeight = "normal";
			subscribedPressElement.style.color = "#879298";
			setNewsList(fieldNames[current_idx(-1, 0)], typeDeques[typenames[current_idx(-1, 0)]]);
		});
		subscribedPressElement.addEventListener("click", () => {
			subscribedPressElement.style.fontWeight = "bold";
			subscribedPressElement.style.color = "#14212B";
			allPressElement.style.fontWeight = "normal";
			allPressElement.style.color = "#879298";
			//add a function that view a subscribed news list;
		});
	}
}

/*
*left, right button click
*/
function clickButton(current_idx, fieldNames, typenames, typeDeques) {
	const	tabElements = document.querySelectorAll(".Tab");
	const	leftButtonElement = document.querySelector(".LeftButton");
	const	rightButtonElement = document.querySelector(".RightButton");
	let		next_deque;
	
	function getCurrentDeque() {
		return typeDeques[typenames[current_idx(-1, 0)]];
	}

	leftButtonElement.addEventListener("click", () => {
		const	current_deque = getCurrentDeque();
		if (current_deque.getCurrent() === 1)
		{
			current_idx(-1, -1);
			next_deque = getCurrentDeque();
			next_deque.setCurrent(next_deque.size());
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

		rightButtonElement.addEventListener("click", () => {
		const	current_deque = getCurrentDeque();
		if (current_deque.getCurrent() === current_deque.size())
		{
			current_idx(-1, 1);
			next_deque = getCurrentDeque();
			next_deque.setCurrent(1);
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
*subscribe button click
*/
function clickSubscribeButton(current_idx, typenames, typeDeques, subscribed_list) {
	const	subscribeButtonElement = document.querySelector(".SubscribeButton");

	function getCurrentDeque() {
		return typeDeques[typenames[current_idx(-1, 0)]];
	}

	function showSnackbar() {
		const	snackBar = document.querySelector(".snackBar");
		snackBar.classList.add("show");
		setTimeout(() => {
			snackBar.classList.remove("show");
		}, 3000);
	}

	if (subscribeButtonElement)
	{
		subscribeButtonElement.addEventListener("click", () => {
			const	current_deque = getCurrentDeque();
			const	current_news = current_deque.peekFront();
			if (current_news.isSubscribe)
			{
				const	alertElement = document.querySelector(".Alert");
				if (alertElement)
				{
					const	spanElement = alertElement.getElementsByTagName("span")[0];
					if (spanElement)
					{
						spanElement.textContent = current_news.companyName;
						alertElement.classList.add("show");
						const	positiveButtonElement = alertElement.querySelector(".PositiveButton");
						const	negativeButtonElement = alertElement.querySelector(".NegativeButton");
						if (positiveButtonElement && negativeButtonElement)
						{
							positiveButtonElement.addEventListener("click", () => {
								current_news.isSubscribe = false;
								delete subscribed_list[current_news.companyName];
								subscribed_list.length--;
								alertElement.classList.remove("show");
								setPressInfo(current_deque);
							})
							negativeButtonElement.addEventListener("click", () => {
								alertElement.classList.remove("show");
							})
						}
					}
				}
			}
			else
			{
				showSnackbar();
				current_news.isSubscribe = true;
				subscribed_list[current_news.companyName] = current_news;
				subscribed_list.length++;
				setPressInfo(current_deque);
			}
		});
	}
}

/*
*외부에서 사용할 함수 다른 추가적인 함수 생성되면 추가할 예정
*/
export	function	addEvents(typenames, typeDeques, subscribed_list) {
	const	fieldNames = ["all", "broad", "it", "english", "sports", "magazine", "region"];
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
	clickTab(current_idx, typenames, typeDeques, subscribed_list);
	clickFieldTab(current_idx, typenames, typeDeques);
	clickButton(current_idx, fieldNames, typenames, typeDeques);
	clickSubscribeButton(current_idx, typenames, typeDeques, subscribed_list);
}
