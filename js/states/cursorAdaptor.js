import State from "./state.js";
import PaginationCursor from "./paginationCursor.js";

// 어댑터 패턴
function CursorAdaptor(linkedList, sideEffect=null)
{
	this.cursor = new PaginationCursor(linkedList);
	this.state = new State(this.cursor.current, sideEffect);
	Object.defineProperty(this, "value", {
		get: function(){return this.state.value;}
	});
}

CursorAdaptor.prototype.moveBefore = function(delta=1)
{
	this.cursor.moveBefore(delta);
	this.state.change(this.cursor.current);
}

CursorAdaptor.prototype.moveNext = function(delta=1)
{
	this.cursor.moveNext(delta);
	this.state.change(this.cursor.current);
}

CursorAdaptor.prototype.moveTo = function(id)
{
	this.cursor.moveTo(id);
	this.state.change(this.cursor.current);
}

CursorAdaptor.prototype.moveFirst = function()
{
	this.cursor.moveFirst();
	this.state.change(this.cursor.current);
}

CursorAdaptor.prototype.changeLinkedList = function(linkedList)
{
	this.cursor.changeLinkedList(linkedList);
	this.state.change(this.cursor.current);
}

CursorAdaptor.prototype.getFirst = function()
{
	return this.cursor.getFirstKey();
}

CursorAdaptor.prototype.getLast = function()
{
	return this.cursor.getLastKey();
}

CursorAdaptor.prototype.findOffset = function(offset)
{
	return this.cursor.findOffset(offset);
}

CursorAdaptor.prototype.getPrevKey = function()
{
	return this.cursor.neighbor.prev;
}

CursorAdaptor.prototype.isOutOfList = function()
{
	return this.cursor.isOutOfList();
}

CursorAdaptor.prototype.getDataList = function(num)
{
	return this.cursor.getDataList(num);
}

CursorAdaptor.prototype.addSideEffect = function(func, key)
{
	this.state.addSideEffect(func, key);
}

CursorAdaptor.prototype.removeSideEffect = function(func)
{
	this.state.removeSideEffect(func);
}

export default CursorAdaptor;