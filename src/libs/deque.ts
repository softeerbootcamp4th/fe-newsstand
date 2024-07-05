class Node<T> {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
export class Deque<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  pushFront(value: T) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head!.prev = node;
      this.head = node;
    }
    this.length += 1;
  }

  pushBack(value: T | T[]) {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        this.pushBack(v);
      });
      return;
    }
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  popFront() {
    if (this.length === 0) {
      return null;
    }
    const value = this.head!.value;
    this.head = this.head!.next;
    if (this.head !== null) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length -= 1;
    return value;
  }

  popBack() {
    if (this.length === 0) {
      return null;
    }
    const value = this.tail!.value;
    this.tail = this.tail!.prev;
    if (this.tail !== null) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length -= 1;
    return value;
  }

  getFront() {
    return this.head?.value ?? null;
  }

  getBack() {
    return this.tail?.value ?? null;
  }

  getSize() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}
