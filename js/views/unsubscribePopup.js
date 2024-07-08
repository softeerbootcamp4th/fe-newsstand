import db from "../rawData.js";
import applyDiff from "../diffing.js";
import html from "../domParser.js";

const subscribeEl = document.getElementById("unsubscribePopup");
const descriptionEl = subscribeEl.querySelector(".modalDescription");
const confirmButtonEl = subscribeEl.querySelector(".confirmButton");
const cancelButtonEl = subscribeEl.querySelector(".cancelButton");
const backdropEl = subscribeEl.querySelector(".modalBackdrop");

function getJosa(string, batchim, noBatchim)
{
	const last = string[string.length - 1];
	if(last >= "가" && last <= "힣")
	{
		return (last.charCodeAt(0)-44032) % 28 ? batchim : noBatchim;
	}
	if(last >= "a" && last <= "z") return "aeiou".includes(last) ? noBatchim : batchim;
	if(last >= "A" && last <= "Z") return "AEIOU".includes(last) ? noBatchim : batchim;
	return noBatchim;
}

function changeUnsubDescription(pressId)
{
	const {name} = db[pressId];
	const josa = getJosa(name, "을", "를");
	applyDiff(descriptionEl, html`<span class="black">${name}</span>${josa}<br/>구독 해지하시겠습니까?`);
}

function unsubscribePopup(pressId, callback)
{
	function cleanupPopup()
	{
		confirmButtonEl.removeEventListener("click", confirm);
		cancelButtonEl.removeEventListener("click", cleanupPopup);
		backdropEl.removeEventListener("click", cleanupPopup);
		subscribeEl.classList.remove("active");
	}
	function confirm()
	{
		callback(pressId);
		cleanupPopup();
	}

	subscribeEl.classList.add("active");
	changeUnsubDescription(pressId);
	confirmButtonEl.addEventListener("click", confirm);
	cancelButtonEl.addEventListener("click", cleanupPopup);
	backdropEl.addEventListener("click", cleanupPopup);
}

export default unsubscribePopup;