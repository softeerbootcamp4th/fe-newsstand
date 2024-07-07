import db from "../rawData.js";
import html from "../domParser.js";
import SubscribeButton from "./subscribeButton.js";

function GridViewComponent(pressList, subscribeState)
{
	const dom = html`<article class="gridContent">
		${ pressList.map( pressId=>html`<div class="gridItem" data-unique-key="grid-item-${pressId}">
			<img class="gridLogo" src="${db[pressId].logo}" alt="${db[pressId].name}">
			<div class="subscribeHoverer">
				${SubscribeButton(pressId, subscribeState)}
			</div>
		</div>` ) }
	</article>`;

	return dom;
}

export default GridViewComponent;