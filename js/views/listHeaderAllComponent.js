import html from "../domParser.js";
import mountDraggable from "../draggable/mountDraggable.js";

function ListHeaderAllComponent({cursor}, {moveTo}, listData, listMetaData)
{
	const index = listData.indexOf(cursor.value);

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

	mountDraggable(dom);
	dom.addEventListener( "click", (e)=>{
		const button = e.target.closest(".listItem");
		if(button === null) return;
		moveTo(button.dataset.moveDestination);
	} )

	return dom;
}

export default ListHeaderAllComponent;