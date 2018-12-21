class Node { // holds data about parent and name
    constructor(parents, name) {
        this.name = name;
        if (parents == 0) {
            this.parents = null;
            this.nNum = 0;
        } else {
            this.parents = parents;
            this.nNum = parents.length;
        }
    }
}
class AdjList {
    constructor() {
        this.heads = []; // queue to hold all nodes to launch
        this.memebers = []; // array to hold all memebers not ready to launch
    }
    addMemebers(h) {
        if (h.nNum == 0) {
            this.heads.push(h);
        } else {
            this.memebers.push(h);
        }
    }
    launch() { // launch
        while (this.heads.length != 0) { // loop
            let curr = this.heads.shift(); // dequeue first memeber to launch
            console.log(curr.name);
            for (let i = 0; i < this.memebers.length; i++) {
                let ind = this.memebers[i].parents.indexOf(curr);
                if (ind != -1) {
                    // if any members have curr as a parent remove curr from parent array
                    this.memebers[i].parents.splice(ind, 1);
                }
                if (this.memebers[i].parents.length == 0) {
                    // if any memebers have no parents add to queue
                    this.heads.push(this.memebers[i]);
                    this.memebers.splice(i, 1);
                }
            }
        }
    }
};
let a = new Node(0, 'a');
let c = new Node(0, 'c');
let e = new Node(0, 'e');
let b = new Node([a, c], 'b');
let d = new Node([b, e], 'd');
let g = new Node([c, d], 'g');
let i = new Node([e, g], 'i');
let h = new Node([i], 'h');
let f = new Node([e, h], 'f');
let aList = new AdjList();
aList.addMemebers(a);
aList.addMemebers(b);
aList.addMemebers(c);
aList.addMemebers(d);
aList.addMemebers(e);
aList.addMemebers(f);
aList.addMemebers(g);
aList.addMemebers(h);
aList.addMemebers(i);
aList.launch();
