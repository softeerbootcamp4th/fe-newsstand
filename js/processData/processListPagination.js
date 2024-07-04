function generatePaginationGroup(rawData)
{
	const categories = ["general", "broadcast", "it", "youngjaji", "sport", "magagine", "local"];
	
	const groupedPressList = Array.from(categories, ()=>[]);
	const copiedRawData = Object.entries(rawData).map( ([key, value])=>({key, name: value.name, category: value.category}) );

	for(let eachData of copiedRawData)
	{
		let groupIndex = categories.indexOf(eachData.category);
		groupedPressList[groupIndex].push(eachData);
	}
	groupedPressList.forEach( (eachGroup)=>eachGroup.sort( (a,b)=>a.name - b.name ) );

	return groupedPressList;
}

function generatePaginationMetadata(groupedPressList)
{
	const categoryName = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

	const metadata = [];
	let sum = 0;
	for(let i=0; i<categoryName.length; i++)
	{
		let pages = groupedPressList[i].length;
		if(pages === 0) continue;

		let offset = sum;
		sum += groupedPressList[i].length;
		metadata.push( { pages, offset, name: categoryName[i], destination: groupedPressList[i][0]?.key ?? null } );
	}
	return metadata;
}


function processListPagination(rawData)
{
	const group = generatePaginationGroup(rawData);
	const metadata = generatePaginationMetadata(group);
	return {
		list: group.flat(Infinity).map( ({key})=>key ),
		metadata
	};
}

export default processListPagination;