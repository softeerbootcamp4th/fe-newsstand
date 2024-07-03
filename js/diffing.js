// 순회용으로 사용되는 uniqueKey - node를 반환합니다.
function makeUniqueKeyMap(children, reversed = false)
{
	const map = new Map();
	let unsetNodeIndex = 0;
	let unsetTextIndex = 0;
	let unsetOtherIndex = 0;
	for(let i=0; i<children.length; i++)
	{
		let child = children[i];
		let uniqueKey;
		if(child.nodeType === Node.TEXT_NODE) uniqueKey = `__text__${unsetTextIndex++}`;
		else if(child.nodeType === Node.ELEMENT_NODE) uniqueKey = child.dataset.uniqueKey ?? `__unset__${unsetNodeIndex++}`;
		else uniqueKey = `__misc__${unsetOtherIndex++}`;

		if(reversed) map.set(child, uniqueKey);
		else map.set(uniqueKey, child);
	}
	return map;
}

function makeRelativeNodePositionMap(children)
{
	const length = children.length;

	// 이전 노드의 유니크 키 - 새 노드의 다음위치 유니크키 맵을 생성합니다.
	const map = makeUniqueKeyMap(children, true);
	const nodeNextMap = new Map();
	
	for(let i=0; i<length; i++)
	{
		let uniqueKey = map.get(children[i]);
		let nextUniqueKey = map.get(children[i+1]) ?? null;
		nodeNextMap.set(uniqueKey, nextUniqueKey);
	}

	return nodeNextMap;
}

function replaceTo(oldDom, newDom)
{
	const parent = oldDom.parentNode;
	parent.insertBefore(newDom, oldDom);
	parent.removeChild(oldDom);
}

function applyDiffAttributes(targetDom, newDom)
{
	// check attributes
	let oldAttr = targetDom.attributes;
	let newAttr = newDom.attributes;
	for(let i=0; i<oldAttr.length; i++)
	{
		let attr = oldAttr[i].name;
		if(!newDom.hasAttribute(attr)) {
			targetDom.removeAttribute(attr);
		}
	}
	for(let i=0; i<newAttr.length; i++)
	{
		let attr = newAttr[i].name;
		let oldAttrValue = targetDom.getAttribute(attr);
		let newAttrValue = newDom.getAttribute(attr);
		if(oldAttrValue !== newAttrValue) targetDom.setAttribute(attr, newDom.getAttribute(attr));
	}
}

function applyDiffChildren(targetDom, childList)
{
	// 자식의 상대적 위치를 저장하는 별도의 맵을 만듭니다.
	const oldNodeNextMap = makeRelativeNodePositionMap(targetDom.childNodes);
	const newNodeNextMap = makeRelativeNodePositionMap(childList);

	// 유니크 키 맵을 만듭니다. 순회에 용이하기 위함
	const oldNodeKeyMap = makeUniqueKeyMap(targetDom.childNodes);
	const newNodeKeyMap = makeUniqueKeyMap(childList);

	// 기존 dom의 자식의 상대적인 위치를 변경합니다.
	for(let [uniqueKey, child] of oldNodeKeyMap)
	{
		if(!newNodeNextMap.has(uniqueKey)) targetDom.removeChild(child);
		else if(oldNodeNextMap.get(uniqueKey) !== newNodeNextMap.get(uniqueKey) ){
			const nextNode = oldNodeKeyMap.get(newNodeNextMap.get(uniqueKey)) ?? null;
			targetDom.insertBefore(child, nextNode);
		}
	}

	// 변경된 위치에 대해, 새 것으로 변경합니다.
	for(let [uniqueKey, child] of newNodeKeyMap)
	{
		// 동일한 key가 존재하면
		if(oldNodeKeyMap.has(uniqueKey)) _applyDiff(oldNodeKeyMap.get(uniqueKey), child);
		// key가 없다면(새로 끼워넣어야함)
		else {
			const nextNode = oldNodeKeyMap.get(newNodeNextMap.get(uniqueKey)) ?? null;
			targetDom.insertBefore(child, nextNode);
		}
	}
}

function _applyDiff(oldDom, newDom)
{
	// 노드 타입이 다르면 다른태그로 간주해서 아예 날려버린다.
	if(oldDom.nodeType !== newDom.nodeType) {
		replaceTo(oldDom, newDom);
		return;
	}
	// 노드타입이 텍스트 노드면 텍스트 컨텐츠를 변경.
	if(newDom.nodeType === Node.TEXT_NODE) {
		if(oldDom.textContent !== newDom.textContent) oldDom.textContent = newDom.textContent;
		return;
	}
	// 노드타입이 엘리먼트 노드가 아니거나 엘리먼트 노드인데 태그명이 다르면 아예 날려버린다.
	if(newDom.nodeType !== Node.ELEMENT_NODE || oldDom.tagName !== newDom.tagName) {
		replaceTo(oldDom, newDom);
		return;
	}
	
	// 그 외의 경우(노드타입이 같고 태그명도 같다면, 속성을 변경하고 children을 변경한다.)
	if(newDom.dataset.forceReplace) {
		replaceTo(oldDom, newDom);
		return;
	}
	else applyDiffAttributes(oldDom, newDom);
	applyDiffChildren(oldDom, newDom.childNodes);
}

function applyDiff(root, target)
{
	if(root.children.length === 0) {
		root.appendChild(target);
		return;
	}
	if(target instanceof DocumentFragment) {
		applyDiffChildren(root, target.childNodes);
	}
	else if(root.children.length > 1) {
		applyDiffChildren(root, [target]);
	}
	else _applyDiff(root.firstChild, target);
}

export default applyDiff;