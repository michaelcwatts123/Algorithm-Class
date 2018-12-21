'use strict';

class Node { // Node class to hold data
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList { // LinkedList class
    constructor() { // constructor sets head of list to null
        this.head = null;
    }
    addNode(data) {
        if (this.head === null) { // if list is empty set head to new node
            this.head = new Node(data);

            return;
          }

          let curr = this.head;
          while (curr.next !== null) { // else iterate to end of list
            curr = curr.next;
          }
          curr.next = new Node(data); // set end of list's next to new node
    }
    map(func) {
        let curr = this.head;
        const list2 = new LinkedList(); // create new LinkedList to hold altered list
    while (curr !== null) { // iterate through each node
      let x = (func(curr.data)); // hold alterned node data
      list2.addNode(x); // add new node to new list

      curr = curr.next;
    }

    return list2; // return new list
    };

    forEach(func) {
        let curr = this.head;
        while (curr !== null) { // iterates over each element
          func(curr.data); // applies function to each element
          curr = curr.next;
        }
      };
      print() { // print entire list
        let curr = this.head;
        while (curr !== null) {
          console.log(curr.data);
          curr = curr.next;
        }
      };
}
const myList = new LinkedList();
myList.addNode(30);
myList.addNode(40);
myList.addNode(50);
function double(x) {
    return x * 2;
}

myList.print();
console.log("After double function is mapped on list:");
myList.map(double).print();


module.exports = {
    LinkedList,
    Node,
};
