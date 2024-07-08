import html from "../domParser.js";
import db from "../rawData.js";

function ListHeaderSubscribedComponent({cursor, subList}, {moveTo})
{
	const items = subList.value.map( (id)=>{
		const name = db[id].name;
		return html`<div class="listItem ${id === cursor.value ? "selected" : ""}" 
		data-unique-key="subsc-pagination-${id}" data-move-destination="${id}">${name}</div>`;
	} );

	const dom = html`<nav class="listNav full-paged" data-unique-key="list-view-header">${items}</nav>`;

	dom.addEventListener( "click", (e)=>{
		const button = e.target.closest(".listItem");
		if(button === null) return;
		moveTo(button.dataset.moveDestination);
	} )

	return dom;
}

export default ListHeaderSubscribedComponent;