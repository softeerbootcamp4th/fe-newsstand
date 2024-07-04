class PaginationCursor
{
	constructor(linkedList = null)
	{
		this.attachedLinkedList = null;
		this.current = null;
		if(linkedList !== null) this.changeLinkedList(linkedList);
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
		for(let i=0; i<delta; i++)
		{
			let before = this.attachedLinkedList.get(this.current).prev;
			if(before === null) return;
			this.current = before;
		}
		return this.current;
	}
	moveNext(delta = 1)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		for(let i=0; i<delta; i++)
		{
			let after = this.attachedLinkedList.get(this.current).next;
			if(after === null) return;
			this.current = after;
		}
		return this.current;
	}
	moveTo(id)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		if(this.attachedLinkedList.has(id)) this.current = id;
		else this.current = this.attachedLinkedList.first;
		return this.current;
	}
	*getDataIterator(num)
	{
		if(this.attachedLinkedList === null) throw new Error("There is no attached Linked List!");
		let cursor = this.current;
		for(let i=0; i<num; i++)
		{
			yield cursor;
			let after = this.attachedLinkedList.get(cursor).next;
			if(after === null) return;
			cursor = after;
		}
	}
	getDataList(num)
	{
		return [...this.getDataIterator(num)];
	}
}

export default PaginationCursor;