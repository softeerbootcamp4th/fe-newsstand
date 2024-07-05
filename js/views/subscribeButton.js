import html from "../domParser.js";

const addIcon = html`<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
	<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="inherit"/>
</svg>`;
const deleteIcon = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z" fill="#14212B"/>
</svg>`;

function SubscribeButton(pressId, subList)
{
	const dom = html`<button class="subscribeButton" data-force-replace="true" data-unique-key="subscribe-button-${pressId}">
		${!subList.has(pressId) ? addIcon : deleteIcon}${!subList.has(pressId) ? "구독하기" : ""}
	</button>`

	dom.addEventListener( "click", ()=>{
		if(!subList.has(pressId)) subList.add(pressId);
		else subList.delete(pressId);
		// subscribePopup(pressId);
	} );

	return dom;
}

export default SubscribeButton;