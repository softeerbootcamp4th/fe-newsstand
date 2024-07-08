import html from "../domParser.js";
import db from "../rawData.js";

function ListHeaderSubscribedComponent({cursor, subList}, {moveTo})
{
	const items = subList.value.map( (id)=>{
		const name = db[id].name;
		if(cursor.value === id) return html`<div class="listItem selected" 
			data-unique-key="subsc-pagination-${id}" data-move-destination="${id}">${name}
			<span class="pagination-tooltip">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z" fill="#ffffff"/>
				</svg>
			</span>
		</div>`;
		else return html`
			<div class="listItem" 
				data-unique-key="subsc-pagination-${id}" data-move-destination="${id}">${name}
			</div>
		`;
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