import db from "../rawData.js";
import html from "../domParser.js";

function GridViewComponent(pressList)
{
	const dom = html`<article class="gridContent">
		${ pressList.map( pressId=>html`<div class="gridItem" data-unique-key="grid-item-${pressId}">
			<img class="gridLogo" src="${db[pressId].logo}" alt="${db[pressId].name}">
			<div class="subscribeHoverer">
				<button class="subscribeButton" data-force-replace="true">
					<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="inherit"/>
					</svg>
				구독하기</button>
			</div>
		</div>` ) }
	</article>`;

	return dom;
}

export default GridViewComponent;