'use strict';

const x = [];
x[0] = 3;
x[1] = 4;
x[2] = 5;
x[10] = 2;
x.push(50);
// can do similar with objects
const obj = {};
obj[0] = 3;
obj[1] = 2;
obj[2] = 1;
console.log(x);
/*
const logger = (a) => {
    const y = a + 5;
    console.log(y);
};
x.forEach(logger);
*/
// More function goodies

function human(name) {
    const greeting = `My name is ${name}`;
    return function() {
        console.log(greeting);
    };
}
const result = human('Chris');
// result();

function node(payload, nextNode = null) {
    let data = payload;
    let next = nextNode;

    return {
        getData() {
            return data;
        },
        setData(payload) {
            data = payload;
        },
        getNext() {
            return next;
        },
        setNext(nextNode) {
            next = nextNode;
        },
        printList() {
            console.log(data);
            let curr = next;
            while (curr !== null) {
                console.log(curr.getData());
                curr = curr.getNext();
            }
        },
    };
};
const node1 = node(10);
// console.log(node1.getData());
const node2 = node(20);
node1.setNext(node2);
console.log(node1.printList());
