import mountLeftSelector from "./mountLeftSelector.js";
import mountRightSelector from "./mountRightSelector.js";
import html from "../domParser.js";
import ListContentComponent from "./listContentComponent.js";
import ListHeaderAllComponent from "./listHeaderAllComponent.js";
import ListHeaderSubscribedComponent from "./listHeaderSubscribedComponent.js";
import GridViewComponent from "./gridViewComponent.js";
import applyDiff from "../diffing.js";

function ListComponent(state, reducer, fullList, metadata)
{
	const pressId = state.cursor.value;

	const header = state.subFilter.value ? ListHeaderSubscribedComponent(state, reducer) : 
		ListHeaderAllComponent(state, reducer, fullList, metadata);
	const content = pressId === null ? null : ListContentComponent(state, reducer);

	return html`${header}${content}`;
}

function mountView(state, reducer, fullList, metadata)
{
	const el = document.getElementById("newsSection");

	function render(current)
	{
		if(state.viewType.value === "grid") applyDiff(el, GridViewComponent(state, reducer));
		else applyDiff(el, ListComponent(state, reducer, fullList, metadata));
	}

	state.subFilter.addSideEffect(render, "subFilter");
	state.subList.addSideEffect(render, "subList");
	state.viewType.addSideEffect(render, "viewType");
	state.cursor.addSideEffect(render, "cursor");
}

export default mountView;