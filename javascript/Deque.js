export class Deque {
	/*
	*생성자
	*/
	constructor() {
		this.items = {};
		this.front = 0;
		this.rear = 0;
		this.current = 1;
	}

	/*
	*deque의 앞에 인자를 넣는 메서드
	*인자는 앞에 들어갈 값
	*/
	addFront(element)
	{
		if (this.isEmpty())
			this.addRear(element);
		else
		{
			this.front--;
			this.items[this.front] = element;
		}
	}

	/*
	*deque의 뒤에 인자를 넣는 메서드
	*인자는 뒤에 들어갈 값
	*/
	addRear(element)
	{
		this.items[this.rear] = element;
		this.rear++;
	}

	/*
	*deque의 맨 앞의 값을 제거하고 반환하는 메서드
	*/
	removeFront() {
		if (this.isEmpty())
			return (undefined);
		const	element = this.items[this.front];
		delete this.items[this.front];
		this.front++;
		if (this.isEmpty())
		{
			this.front = 0;
			this.rear = 0;
		}
		return (element);
	}

	/*
	*deque의 맨 뒤의 값을 제거하고 반환하는 메서드
	*/
	removeRear() {
		if (this.isEmpty())
			return (undefined);
		this.rear--;
		const	element = this.items[this.rear];
		delete this.items[this.rear];
		if (this.isEmpty())
		{
			this.front = 0;
			this.rear = 0;
		}
		return (element);
	}

	/*
	*deque 이 비어 있는지 확인하는 메서드
	*/
	isEmpty() {
		return (this.front === this.rear);
	}

	/*
	*deque의 맨 앞의 값을 반환하는 메서드
	*/
	peekFront() {
		if (this.isEmpty())
			return (undefined);
		return (this.items[this.front]);
	}

	/*
	*deque 의 size를 반환하는 메서드
	*/
	size() {
		return (this.rear - this.front);
	}

	/*
	*deque을 회전시키는 메서드
	*인자값을 n이라 하면
	*n이 양수일 시에는 오른쪽으로 n만큼 회전
	*n이 음수일 시에는 왼쪽으로 -n만큼 회전
	*/
	rotate(n) {
		if (this.size() === 0 || this.size() === 1)
			return ;
		n = n % this.size();
		if (n >= 0)
		{
			while (0 < n)
			{
				const	front = this.removeFront();
				this.addRear(front);
				n--;
			}
		}
		else
		{
			n = -n;
			while (0 < n)
			{
				const	rear = this.removeRear();
				this.addFront(rear);
				n--;
			}
		}
	}
}
