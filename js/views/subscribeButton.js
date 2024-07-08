import html from "../domParser.js";
import applyDiff from "../diffing.js";

function SubscribeButtonInner(isSubbed)
{
	const addIcon = html`<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
		<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="inherit"/>
	</svg>`;
	const deleteIcon = html`<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z" fill="inherit"/>
	</svg>`;
	if(!isSubbed) return html`${addIcon}<span>구독하기</span>`;
	return deleteIcon;
}

function SubscribeButton({cursor, subList}, {addToSubscription, removeFromSubscription}, pressId=cursor.value)
{
	const prevCache = pressId === cursor.value ? cursor.findOffset(-1) : undefined;
	const dom = html`<button class="subscribeButton" data-force-replace="true" data-unique-key="subscribe-button-${pressId}">
		${SubscribeButtonInner(subList.has(pressId))}
	</button>`

	dom.addEventListener( "click", ()=>{
		if(!subList.has(pressId)) addToSubscription(pressId, prevCache);
		else removeFromSubscription(pressId);
	} );

	return dom;
}

export default SubscribeButton;