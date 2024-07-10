import IntervalController from "./intervalController.js"; //본인이 예전에 짰던 코드 그대로 갖다쓸 예정

const ROLLER_INTERVAL = 3 * 1000; // 5초

function rollNews(roller)
{
	roller.classList.add("rolling");
}

function mountRollerSection(element, data, delay)
{
	let dataIndex = 1;
	const roller = element.querySelector(".rollerSection");
	roller.children[0].textContent = data[0];
	roller.addEventListener("animationend", ()=>{
		dataIndex++;
		roller.classList.remove("rolling");
		roller.children[0].textContent = roller.children[1].textContent;
		roller.children[1].textContent = data[dataIndex % data.length];
	});

	const intervalController = new IntervalController(ROLLER_INTERVAL);
	document.addEventListener("visibilitychange", ()=>{
		if(document.visibilityState === "hidden") intervalController.pause();
		else intervalController.resume();
	});

	setTimeout(
		()=>{
			element.addEventListener("mouseover", ()=>intervalController.pause());
			element.addEventListener("mouseout", ()=>intervalController.resume());
			intervalController.addEventListener("interval", ()=>rollNews(roller));
			intervalController.start();
		}, delay * 1000
	);
}

export default mountRollerSection;