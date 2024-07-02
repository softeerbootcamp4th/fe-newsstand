import mountLeftSelector from "./mountLeftSelector.js";
import mountRightSelector from "./mountRightSelector.js";
import html from "../domParser.js";

function removeChildren(el)
{
	for(let child of el.children)
	{
		el.removeChild(child);
	}
}

function mountView(el, data)
{
	//const el = document.getElementById("newsSection");
	const subscTypeState = mountLeftSelector();
	const viewTypeState = mountRightSelector();

	viewTypeState.addSideEffect( (state)=>{
		removeChildren(el);
		if(state === 1) el.appendChild(html`<div>Hello!</div>`);
		else el.appendChild(html`<div>List view!</div>`);
	} );

	el.appendChild(html`<div>Hello!</div>`);
}

export default mountView;