import State from "./state.js";

// 어댑터 패턴
function LinkedListAdaptor(linkedList, sideEffect=null)
{
	this.linkedList = linkedList;
	this.state = new State(linkedList.array, sideEffect);
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

LinkedListAdaptor.prototype.change = function(newLinkedList)
{
	this.linkedList = newLinkedList;
	this.state.change(this.linkedList.array);
}

LinkedListAdaptor.prototype.addSideEffect = function(func)
{
	this.state.addSideEffect(func);
}

LinkedListAdaptor.prototype.removeSideEffect = function(func)
{
	this.state.removeSideEffect(func);
}

export default LinkedListAdaptor;