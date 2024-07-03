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
	if(factory.childNodes.length === 0) return null;
	if(factory.childNodes.length === 1) return factory.childNodes[0];
	const childNodes = [...factory.childNodes];
	for(let child of childNodes) {
		fragment.append(child);
	}
	return fragment;
}

function makePlainHTML(plains, elems)
{
	let result = plains[0];
	for(let i=0; i<elems.length; i++)
	{
		if(elems[i] instanceof Node || Array.isArray(elems[i])) result += "<placeholder></placeholder>";
		else result += `${elems[i]}`.replace("<", "&lt;").replace(">", "&gt;");
		result += plains[i+1];
	}
	return result;
}

function convertArrayToFragment(array)
{
	const frag = document.createDocumentFragment();
	for(let elem of array)
	{
		if(elem instanceof Node) frag.append(elem);
		else if(Array.isArray(elem)) {
			frag.append( convertArrayToFragment(elem) );
		}
		else {
			let textNode = new Text();
			textNode.textContent = elem;
			frag.append(textNode);
		}
	}
	return frag;
}

function domMaker(plains, ...elems)
{
	const plainHTML = makePlainHTML(plains, elems);
	const dom = parser(plainHTML);
	const holders = [...dom.querySelectorAll("placeholder")];
	const nodes = elems.filter( e=>e instanceof Node || Array.isArray(e) );
	for(let i=0; i<nodes.length; i++)
	{
		let node = nodes[i];
		if(Array.isArray(node)) node = convertArrayToFragment(node);
		holders[i].parentNode.insertBefore(node, holders[i]);
		holders[i].remove();
	}

	return dom;
}

export default domMaker;
