import mountLeftSelector from "./mountLeftSelector.js";
import mountRightSelector from "./mountRightSelector.js";
import html from "../domParser.js";
import ListContentComponent from "./listContentComponent.js";
import ListHeaderAllComponent from "./listHeaderAllComponent.js";
import GridViewComponent from "./gridViewComponent.js";
import applyDiff from "../diffing.js";

function ListComponent(state, reducer, fullList, metadata)
{
	const pressId = state.cursor.value;

	if(pressId === null) return html`<div>없어요 구독한게</div>`;

	// const pressId = paginationState.value === 1 ? "현대방송" : "대구지역신문";
	// let header = ListHeaderAllComponent(paginationState, [{allPage:5, indexOffset:0, name:"종합"}, {allPage:3, indexOffset:5, name:"합성"}]);
	// return html`${header}${ListContentComponent(pressId)}`;

	const header = ListHeaderAllComponent(pressId, reducer.moveTo, fullList, metadata);
	const content = ListContentComponent(pressId, state.subList);

	return html`${header}${content}`
}

function mountView(state, reducer, fullList, metadata)
{
	console.log(fullList, metadata);
	const el = document.getElementById("newsSection");

	function render(current)
	{
		if(state.viewType.value === "grid") applyDiff(el, GridViewComponent(state.cursor.getDataList(24)));
		else applyDiff(el, ListComponent(state, reducer, fullList, metadata));
	}

	state.viewType.addSideEffect(render, "viewType");
	state.cursor.addSideEffect(render, "cursor");
}

export default mountView;