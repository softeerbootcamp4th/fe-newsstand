function ListHeaderAllComponent(currentPageState, paginationData)
{
	const page = currentPageState.value;

	const items = paginationData.map( ({allPage, indexOffset, name})=>{
		if(indexOffset <= page && indexOffset+allPage > page) {
			return html`<div class="listItem selected" style="--page-progress: ${(page-indexOffset) / allPage}" data-unique-key="all-pagination-${name}">
				${name}
			</div>`;
		}
		return html`<div class="listItem">${name}</div>`;
	} );
	items.forEach( (e, i)=>e.addEventListener("click", ()=>{
		currentPageState.change( paginationData[i].indexOffset );
	}) );

	const dom = html`<nav class="listNav full-paged">${items}</nav>`;

	return dom;
}