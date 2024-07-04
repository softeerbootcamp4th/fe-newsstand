class LinkedList
{
	#map = null;
	#first = null;
	#last = null;
	constructor(array=[])
	{
		this.#map = new Map(array.map( (value,i)=>{
			let prev = array[i-1] ?? null;
			let next = array[i+1] ?? null;
			return [value, {prev, next}];
		} ));
		this.#first = array[0] ?? null;
		this.#last = array[array.length-1] ?? null;
	}
	get first()
	{
		return this.#first;
	}
	get last()
	{
		return this.#last;
	}
	get array()
	{
		return [...this];
	}
	get(value)
	{
		return this.#map.get(value) ?? null;
	}
	has(value)
	{
		return this.#map.has(value);
	}
	add(value, prev = this.#last)
	{
		if(this.has(value)) this.delete(value);

		let prevNode = this.has(prev) ? prev : null;
		let nextNode = this.has(prev) ? this.get(prev).next : this.#first;

		if(prevNode === null) this.#first = value;
		else this.#map.set(prevNode, {prev: this.get(prevNode).prev, next: value});

		this.#map.set(value, {prev:prevNode, next: nextNode});

		if(nextNode === null) this.#last = value;
		else this.#map.set(nextNode, {prev:value, next: this.get(nextNode).next});
	}
	delete(value)
	{
		if(!this.has(value)) return;
		const {prev, next} = this.get(value);

		if(prev === null) this.#first = next;
		else this.#map.set(prev, {prev: this.get(prev).prev, next});

		if(next === null) this.#last = prev;
		else this.#map.set(next, {prev, next: this.get(next).next});

		this.#map.delete(value);
	}
	findKeyAtOffset(basis, offset)
	{
		if(!this.has(basis)) return null;

		if(offset === 0) return basis;
		if(offset < 0)
		{
			let cursor = basis;
			for(let i=0; i<-offset; i++)
			{
				let before = this.get(cursor).prev;
				if(before === null) break;
				cursor = before;
			}
			return cursor;
		}
		else
		{
			let cursor = basis;
			for(let i=0; i<offset; i++)
			{
				let after = this.get(cursor).next;
				if(after === null) break;
				cursor = after;
			}
			return cursor;
		}
	}
	*[Symbol.iterator]()
	{
		let cursor = this.first;
		while(this.has(cursor))
		{
			yield cursor;
			cursor = this.get(cursor).next;
		}
	}
}

export default LinkedList;