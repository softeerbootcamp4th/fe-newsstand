import { getTodaysDate } from "./getDate.js";
import {addEvents} from "./events.js";
import {initData, initNewsList} from "./initData.js";
import {Deque} from "./Deque.js";

document.addEventListener("DOMContentLoaded", () => {
	const	typenames = ["종합/경제", "방송/통신", "영자지", "IT", "스포츠/연예", "매거진/전문지", "지역"];
	const	typeDeques = {};
	fetch("../data.json")
		.then(response => {
			if (!response.ok) {
				throw new Error("not ok " + response.statusText);
			}
			return response.json();
		})
		.then(data => {
			initData(data, typeDeques);
			initNewsList(typenames, typeDeques);
			getTodaysDate();
			addEvents(typenames, typeDeques);
			console.log(typeDeques[typenames[0]].peekFront());
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
});
