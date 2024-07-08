import db from "../rawData.js";
import html from "../domParser.js";
import SubscribeButton from "./subscribeButton.js";

function GridViewComponent(state, reducer)
{
	const pressList = state.cursor.getDataList(24);
	const dom = html`<article class="gridContent">
		${ pressList.map( pressId=>html`<div class="gridItem" data-unique-key="grid-item-${pressId}">
			<img class="gridLogo" src="${db[pressId].logo}" alt="${db[pressId].name}">
			<div class="subscribeHoverer">
				${SubscribeButton(state, reducer, pressId)}
			</div>
		</div>` ) }
	</article>`;

	return dom;
}

export default GridViewComponent;