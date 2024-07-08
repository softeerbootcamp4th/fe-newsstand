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
		else if(elems[i] !== null) result += `${elems[i]}`.replace("<", "&lt;").replace(">", "&gt;");
		result += plains[i+1];
	}
	result.replace(/\>\s+\</, "><");
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

function removeEmptyTextNodes(element) {
  // Check if the element has child nodes
  if (element.hasChildNodes()) {
    for (let childNode of element.childNodes) {
      // Check if the child node is a Text node
      if (childNode.nodeType === Node.TEXT_NODE) {
        // Check if the text content is only whitespace
        if (childNode.textContent.trim() === '') {
          // Remove the empty Text node
          element.removeChild(childNode);
        } else {
          // Recursively check child nodes of the Text node
          removeEmptyTextNodes(childNode);
        }
      } else {
        // Recursively check child nodes of the current element
        removeEmptyTextNodes(childNode);
      }
    }
  }
  return element;
}

function domMaker(plains, ...elems)
{
	const plainHTML = makePlainHTML(plains, elems);
	const dom = parser(plainHTML);
	const holders = [...dom.querySelectorAll("placeholder")];
	const nodes = elems.filter( e=>e instanceof Node || Array.isArray(e) );

	if(dom.tagName === "PLACEHOLDER") return nodes[0];

	for(let i=0; i<nodes.length; i++)
	{
		let node = nodes[i];
		if(Array.isArray(node)) node = convertArrayToFragment(node);

		holders[i].parentNode.insertBefore(node, holders[i]);
		holders[i].remove();
	}

	return removeEmptyTextNodes(dom);
}

export default domMaker;
