function parser(str)
{
	const factory = document.createElement("div");
	const fragment = document.createDocumentFragment();
	let innerString = str;

	// bypass trusted type policy (using inner parser)
	// this is safe, because we expose only domMaker, not parser function
	if(trustedTypes !== undefined)
	{
		const policy = trustedTypes.createPolicy("unsafePolicy", {createHTML: str=>str});
		innerString = policy.createHTML(str);
	}
	
	factory.innerHTML = innerString;
	if(factory.children.length === 0) return null;
	if(factory.children.length === 1) return factory.children[0];
	for(let child of factory.children) {
		fragment.appendChild(child);
	}
	return fragment;
}

function domMaker(plains, ...elems)
{
	const plainHTML = plains.join("<placeholder></placeholder>");
	const dom = parser(plainHTML);
	const holders = dom.querySelectorAll("placeholder");
	for(let i=0; i<holders.length; i++)
	{
		let elem = elems[i];
		if(!(elems[i] instanceof Node)) {
			elem = new Text();
			elem.textContent = elems[i];
		}
		dom.insertBefore(elem, holders[i]);
		holders[i].remove();
	}

	return dom;
}

export default domMaker;
