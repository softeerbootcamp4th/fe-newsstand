import IntervalController from "./roller/intervalController.js"; //본인이 예전에 짰던 코드 그대로 갖다쓸 예정

const ROLLER_INTERVAL = 5 * 1000; // 5초

function rollNews(roller)
{
	roller.className.add("rolling");
}

function mountRollerSection(element, data)
{
	let dataIndex = 1;
	const roller = element.querySelector(".rollerSection");
	roller.children[0].textContent = data[0];
	roller.addEventListener("animationend", ()=>{
		dataIndex++;
		roller.className.remove("rolling");
		roller.children[0].textContent = roller.children[1].textContent;
		roller.children[1].textContent = data[dataIndex % data.length];
	});

	const intervalController = new IntervalController(ROLLER_INTERVAL);
	element.addEventListener("mouseover", ()=>intervalController.pause());
	element.addEventListener("mouseout", ()=>intervalController.resume());
	intervalController.addEventListener("interval", ()=>rollNews(element));
}

export default mountRollerSection;