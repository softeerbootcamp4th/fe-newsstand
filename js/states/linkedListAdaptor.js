import State from "./state.js";

// 어댑터 패턴
function LinkedListAdaptor(linkedList, sideEffect=null)
{
	this.linkedList = linkedList;
	this.state = new State(linkedList.array, sideEffect);
	Object.defineProperty(this, "value", {
		get: function(){return this.state.value;}
	});
}

LinkedListAdaptor.prototype.add = function(value, prev)
{
	this.linkedList.add(value, prev);
	this.state.change(this.linkedList.array);
}

LinkedListAdaptor.prototype.delete = function(value)
{
	this.linkedList.delete(value);
	this.state.change(this.linkedList.array);
}

LinkedListAdaptor.prototype.getPrev = function(value)
{
	return this.linkedList.get(value)?.prev;
}

LinkedListAdaptor.prototype.has = function(value)
{
	return this.linkedList.has(value);
}

LinkedListAdaptor.prototype.change = function(newLinkedList)
{
	this.linkedList = newLinkedList;
	this.state.change(this.linkedList.array);
}

LinkedListAdaptor.prototype.addSideEffect = function(func, key)
{
	this.state.addSideEffect(func, key);
}

LinkedListAdaptor.prototype.removeSideEffect = function(func)
{
	this.state.removeSideEffect(func);
}

export default LinkedListAdaptor;