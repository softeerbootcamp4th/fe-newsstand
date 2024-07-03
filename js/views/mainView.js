import mountLeftSelector from "./mountLeftSelector.js";
import mountRightSelector from "./mountRightSelector.js";
import html from "../domParser.js";
import ListContentComponent from "./listContentComponent.js";
import applyDiff from "../diffing.js";

function mountView(el, data)
{
	//const el = document.getElementById("newsSection");
	const subscTypeState = mountLeftSelector();
	const viewTypeState = mountRightSelector();

	viewTypeState.addSideEffect( (state)=>{
		if(state === 1) applyDiff(el, ListContentComponent("현대방송"));
		else applyDiff(el, ListContentComponent("대구지역신문"));
	} );

	el.appendChild(html`<div>Hello!</div>`);
}

export default mountView;