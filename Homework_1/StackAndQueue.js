'use strict';
const util = require('./LinkedListClass');

class Stack { // stack class
    constructor() { // constructor for empty stack
        this.myList = new util.LinkedList(); // creates empty list
    }
    push(data) { // push just adds node to end of list
        this.myList.addNode(data);
    }
    pop() { // pop removes node from end of list and returns it 
        if (this.myList.head === null) { // if list is empty do nothing 
            return;
        } else {
            this.myList.curr = this.myList.head;
            this.myList.previous = null;
            while (this.myList.curr.next !== null) { // iteratrs to end of list 
                this.myList.previous = this.myList.curr;
                this.myList.curr = this.myList.curr.next;
            }
            if (this.myList.previous !== null) { // if there is an element before 
            this.myList.previous.next = null; // set that elements next to null
            }
            return this.myList.curr.data;
        }
    }
    print() { // print the contents of the list
        this.myList.print();
    }
}
class Queue {
    constructor() { // constructor creates empty linked list
        this.myList = new util.LinkedList();
    }
    enqueue(data) { // enqueue adds node to list
        this.myList.addNode(data);
    }
    dequeue() { // returns first node of list 
        if (this.myList.head === null) { // if list is empty return null
            return;
        } else { // return the head and set head to next element
            this.myList.curr = this.myList.head;
            this.myList.head = this.myList.head.next;
            return this.myList.curr.data;
        }
    }
    print() { // prints the contents of the list
        this.myList.print();
    }
}
const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(5);
myStack.push(6);
myStack.push(7);
console.log('Stack prior to pop');
myStack.print();
console.log('Stack popped empty');
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());

const myQueue = new Queue();
myQueue.enqueue(13);
myQueue.enqueue(11);
myQueue.enqueue(12);
myQueue.enqueue(8);
myQueue.enqueue(9);
myQueue.enqueue(10);
console.log('Queue prior to dequeue');
myQueue.print();
console.log('Queue dequeued empty');
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());

