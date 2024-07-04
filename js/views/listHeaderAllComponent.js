import html from "../domParser.js";

function ListHeaderAllComponent(pressId, moveToFunc, listData, listMetaData)
{
	const index = listData.indexOf(pressId);

	const items = listMetaData.map( ({pages, offset, name, destination})=>{
		if(offset <= index && offset+pages > index) {
			return html`<div class="listItem selected" 
				style="--page-progress: ${index-offset+1}; --page-all: ${pages}" 
				data-unique-key="all-pagination-${name}" 
				data-move-destination="${destination}"
			>
				${name}
				<span class="pagination-tooltip"><span class="white">${index-offset+1}</span> / ${pages}</span>
			</div>`;
		}
		return html`<div class="listItem" data-unique-key="all-pagination-${name}" data-move-destination="${destination}">${name}</div>`;
	} );

	const dom = html`<nav class="listNav full-paged" data-unique-key="list-view-header">${items}</nav>`;

	dom.addEventListener( "click", (e)=>{
		const button = e.target.closest(".listItem");
		if(button === null) return;
		moveToFunc(button.dataset.moveDestination);
	} )

	return dom;
}

export default ListHeaderAllComponent;