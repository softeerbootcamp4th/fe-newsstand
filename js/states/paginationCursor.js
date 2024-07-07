class PaginationCursor
{
	constructor(linkedList = null)
	{
		this.attachedLinkedList = null;
		this._current = null;
		this.neighbor = {prev: null, next: null};
		if(linkedList !== null) this.changeLinkedList(linkedList);
	}
	get current()
	{
		return this._current;
	}
	set current(value)
	{
		this._current = value;
		this.neighbor = this.attachedLinkedList.get(value) ?? {prev: null, next: null};
	}
	changeLinkedList(linkedList)
	{
		this.attachedLinkedList = linkedList;
		if(!this.attachedLinkedList.has(this.current))
		{
			this.current = this.attachedLinkedList.first;
		}
	}
	moveBefore(delta = 1)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		if(this.isOutOfList()) this.current = this.attachedLinkedList.findKeyAtOffset(this.neighbor.prev, -delta+1);
		else this.current = this.attachedLinkedList.findKeyAtOffset(this.current, -delta);

		return this.current;
	}
	moveNext(delta = 1)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		if(this.isOutOfList()) this.current = this.attachedLinkedList.findKeyAtOffset(this.neighbor.next, delta-1);
		else this.current = this.attachedLinkedList.findKeyAtOffset(this.current, delta);

		return this.current;
	}
	moveTo(id)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		if(this.attachedLinkedList.has(id)) this.current = id;
		else this.current = this.attachedLinkedList.first;
		return this.current;
	}
	moveFirst()
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		this.current = this.attachedLinkedList.first;
		return this.current;
	}
	*getDataIterator(num, offset=0)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		let cursor = this.attachedLinkedList.has(this.current) ? this.current : this.neighbor.next;
		if(cursor === null) return;
		for(let i=0; i<num; i++)
		{
			yield cursor;
			let after = this.attachedLinkedList.get(cursor).next;
			if(after === null) return;
			cursor = after;
		}
	}
	getDataList(num, offset)
	{
		return [...this.getDataIterator(num, offset)];
	}
	getFirstKey()
	{
		return this.attachedLinkedList.first;
	}
	getLastKey()
	{
		return this.attachedLinkedList.last;
	}
	findOffset(offset)
	{
		let cursor = this.isOutOfList() ? this.neighbor.next : this.current;
		return this.attachedLinkedList.findKeyAtOffsetNoOverflow(cursor, offset);
	}
	isOutOfList()
	{
		return !this.attachedLinkedList.has(this.current);
	}
}

export default PaginationCursor;