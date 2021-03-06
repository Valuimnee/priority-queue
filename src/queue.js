const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize=maxSize||30;
		this.heap=new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.size()===this.maxSize)
			throw Error("Can't push, queue is full!");
		this.heap.push(data, priority);
	}

	shift() {
		if(this.isEmpty())
			throw new Error("Can't shift, queue is empty!");
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
