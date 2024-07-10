import db from "../rawData.js";
import html from "../domParser.js";
import SubscribeButton from "./subscribeButton.js";

function GridViewComponent(state, reducer)
{
	const pressList = state.cursor.getDataList(24);
	const dom = html`<article class="gridContent">
		${ pressList.map( pressId=>html`<div class="gridItem" data-unique-key="grid-item-${pressId}">
			<div class="logo gridLogo">
				<img class="light" src="${db[pressId].logo.light}" alt="${db[pressId].name}" loading="lazy" >
				<img class="dark" src="${db[pressId].logo.dark}" alt="${db[pressId].name}" loading="lazy" >
			</div>
			<div class="subscribeHoverer">
				${SubscribeButton(state, reducer, pressId)}
			</div>
		</div>` ) }
	</article>`;

	return dom;
}

export default GridViewComponent;