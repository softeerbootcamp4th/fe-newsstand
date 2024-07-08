import { getTodaysDate } from "./getDate.js";
import {initEvent} from "./initEvent.js";
import {initData} from "./initData.js";
import {Deque} from "./Deque.js";

document.addEventListener("DOMContentLoaded", () => {
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
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
		console.log(typeDeques["IT"]);
	initEvent();
	getTodaysDate();
});
