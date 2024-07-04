import mountLeftSelector from "./mountLeftSelector.js";
import mountRightSelector from "./mountRightSelector.js";
import html from "../domParser.js";
import ListContentComponent from "./listContentComponent.js";
//import ListHeaderAllComponent from "./listHeaderAllComponent.js";
import applyDiff from "../diffing.js";

function ListComponent(pressId)
{
	// const pressId = paginationState.value === 1 ? "현대방송" : "대구지역신문";
	// let header = ListHeaderAllComponent(paginationState, [{allPage:5, indexOffset:0, name:"종합"}, {allPage:3, indexOffset:5, name:"합성"}]);
	// return html`${header}${ListContentComponent(pressId)}`;
	return ListContentComponent(pressId);
}

function mountView(state, reducer, metadata)
{
	const el = document.getElementById("newsSection");

	function render()
	{
		if(state.viewType.value === "grid") applyDiff(el, html`<div>Grid View</div>`);
		else applyDiff(el, ListComponent(state.cursor.state.value));
	}

	state.viewType.addSideEffect(render);
	state.cursor.addSideEffect(render);
}

export default mountView;