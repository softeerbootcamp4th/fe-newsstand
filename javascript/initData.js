import {Deque} from "./Deque.js";
import {setFieldTab, setPressInfo, setMain, setSub} from "./setData.js";

/*
* 외부에서 data를 받아와 typeDeques에 뉴스 타입별로 deque 생성 및 저장
*/
export	function	initData(data, typeDeques) {
	data.forEach(item => {
		const	type = item.type;

		if (!typeDeques[type]) {
			typeDeques[type] = new Deque();
		}

		item.company.forEach(company => {
			typeDeques[type].addRear(company);
		});
	});
}

/*
* 생성된 deque으로 미리 뉴스 세팅
*/
export	function	initNewsList(typeDeques, typename) {
	setFieldTab("all", typeDeques[typename[0]]);
	setFieldTab("broad", typeDeques[typename[1]]);
	setFieldTab("it", typeDeques[typename[2]]);
	setFieldTab("english", typeDeques[typename[3]]);
	setFieldTab("sports", typeDeques[typename[4]]);
	setFieldTab("magazine", typeDeques[typename[5]]);
	setFieldTab("region", typeDeques[typename[6]]);
	setPressInfo(typeDeques[typename[0]]);
	setMain(typeDeques[typename[0]]);
	setSub(typeDeques[typename[0]]);
}
