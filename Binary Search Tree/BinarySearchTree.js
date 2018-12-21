'use strict';
class Node { // Node to hold data
    constructor(data, key, lNode = null, rNode = null) {
        this.data = data;
        this.key = key;
        this.pair = {
            key: data,
        };
        this.lNode = lNode;
        this.rNode = rNode;
    }
}
class BinarySearchTree {
    constructor() { // constructor points head to null
        this.head = null;
    }
    addNode(data, key) {
        if (this.head === null) { // if tree empty set head to node
            this.head = new Node(data, key);
            return;
        } else { // else iterate down nodes
            this.curr = this.head;
            while (this.curr !== null) {
                if (this.curr.data < data) { // right if greater than current data
                   this.prior = this.curr;
                   this.curr = this.curr.rNode;
                   continue;
                }
                if (this.curr.data > data) { // left otherwise
                    this.prior = this.curr;
                    this.curr = this.curr.lNode;
                    continue;
                 }
            }
            if (this.prior.data > data) { // if statements determine if add to left or right node
                this.prior.lNode = new Node(data, key);
            }
            if (this.prior.data < data) {
                this.prior.rNode = new Node(data, key);
            }
            // this.curr = new Node(data, key);
        }
    }
    printHead() { // prints head of list
        console.log(this.head);
    }
    inO() { // calls recursive trace
        this.inOrder(this.head);
    }
    preO() { // calls recursive trace
        this.preOrder(this.head);
    }
    postO() { // calls recursive trace
        this.postOrder(this.head);
    }
    inOrder(postion) { // cycles through left nodes prints then right
        if (postion.lNode !== null) {
            let a = postion.lNode;
            this.inOrder(a);
        }
        console.log(postion.data);
        if (postion.rNode !==null) {
            let a = postion.rNode;
            this.inOrder(a);
        }
    }
    preOrder(postion) { // prints cycles through left nodes  then right
        console.log(postion.data);
        if (postion.lNode !== null) {
            let a = postion.lNode;
            this.preOrder(a);
        }

        if (postion.rNode !==null) {
            let a = postion.rNode;
            this.preOrder(a);
        }
    }
    postOrder(postion) { //  cycles through left nodes then right  then prints
        if (postion.lNode !== null) {
            let a = postion.lNode;
            this.postOrder(a);
        }

        if (postion.rNode !==null) {
            let a = postion.rNode;
            this.postOrder(a);
        }
        console.log(postion.data);
    }
    s(k) { // calls recursive search
         this.search(k, this.head);
    }
    search(k, postion) { // cycles through left and right branches searching for a key
        if (postion.key === k) {
            console.log(postion.data);
            return postion.data;
        }
        if (postion.lNode !== null) {
            let a = postion.lNode;
            this.search(k, a);
        }

        if (postion.rNode !==null) {
            let a = postion.rNode;
            this.search(k, a);
        }
    }
}
// output
let tree = new BinarySearchTree();
tree.addNode(4, 'four');
tree.addNode(6, 'six');
tree.addNode(2, 'two');
tree.addNode(3, 'three');
tree.addNode(1, 'one');
tree.addNode(5, 'five');
tree.addNode(7, 'seven');
console.log('Inorder');
tree.inO();
console.log('Preorder');
tree.preO();
console.log('Postorder');
tree.postO();
console.log('Searching for key five');
tree.s('five');
console.log('Searching for key four');
tree.s('four');
console.log('Searching for key two');
tree.s('two');


