/**
 * Adds two numbers together.
 * @param {any} data The first number.
 * @param {Node} next The second number.
 */
function Node(data, next = null) {
    // These are public data and do not need getters or setters
    this.data = data;
    this.next = next;
}
/**
 * Adds two numbers together.
 * @param {any} data The first number.
 * @param {Node} next The second number.
 */
function LinkedList() {
    this.head = null;

    this.addNode = function(data) {
        if (this.head === null) {
            this.head - new Node(data);
            this.head = new Node(data);
            return;
        }

        let curr = this.head;
        while (curr.next !== null) {
            curr = curr.next;
        }
        curr.next = new Node(data);
    };
    this.print = function() {
        let curr = this.head;
        while (curr !== null) {
            console.log(curr.data);
            curr = curr.next;
        }
    };
    this.forEach = function(func) {
        let curr = this.head;
        while (curr !== null) {
            func(curr.data);
            curr = curr.next;
        }
    };
}
const myList = new LinkedList();
myList.addNode(30);
myList.addNode('Michael');
myList.addNode({name: 'Me'});
myList.print();
myList.forEach((element) => console.log(element));
myList.forEach((element) => {
    let value = element.toString();
    console.log(value);
});

