class WeightedWord { // class to hold letter with its weight
    constructor(letter, freq) {
        this.letter = letter;
        this.freq = freq;
    };
};
class HCode { // class to hold letter with its encoding
    constructor(letter, encoding) {
        this.letter = letter;
        this.encoding = encoding;
    }
}
let hCodes = []; // array to hold all Hcode


class MinHeap { // min heap based on array
    constructor() {
        this.hold = [];
    }
    reheapify() { // function to maintain heap property
        let comp = this.hold[this.hold.length-1]; // most recent item to bubble up
        let livesAt = this.hold.length-1; // location of item being bubbled up
        for (let i = 1; i < this.hold.length; i++) { // loop through each element of array
            if (comp.freq < this.hold[this.hold.length-i].freq) { // if freq is less of bubbled up element, swap with ith element
                let temp = this.hold[this.hold.length-i];
                this.hold[this.hold.length-i] = comp;
                this.hold[livesAt] = temp;
                livesAt = this.hold.length-i;
            }
        }
        let pos = 0;
        for (let i = 0; i < this.hold.length; i++) { // bubble down top element if need be
            if (this.hold[pos].freq > this.hold[i].freq) {
                let temp = this.hold[i];
                this.hold[i] = this.hold[(pos)];
                this.hold[(pos)] = temp;
                pos = i;
                i--;
            }
        }
    }
    addNode(Word) {
        this.hold.push(Word); // adds word to hold array

        this.reheapify(); // reheapify to maintain min heap property
    }
    getTop() { // extracts top element of min heap
        let top = this.hold[0]; // gets top element
        this.hold[0] = this.hold[this.hold.length-1];// sets newest element to top
        this.hold.splice(this.hold.length-1, 1);
        let pos = 0;
        for (let i = 0; i < this.hold.length; i++) { // bubbles down top element
            if (this.hold[pos].freq > this.hold[i].freq) {
                let temp = this.hold[i];
                this.hold[i] = this.hold[(pos)];
                this.hold[(pos)] = temp;
                pos = i;
                i--;
            }
        }
        return top;
    }
};


class Node { // node to weighted words
    constructor(a, b) {
        this.freq = a.freq + b.freq;
        this.left = a;
        this.right = b;
    };
};


encode = (node, encoding) => { // function to encode chars
    if (node.letter) { // truthy to determine if at weightedWord or node
        let a = new HCode(node.letter, encoding);
        hCodes.push(a); // pushes encoding to array
    } else {
        encode(node.left, (encoding) + "0"); // if go to the left add 0
        encode(node.right, (encoding + "1") ); // if go to the right add 1
    }
};

getHWords = () => {
    return hCodes; // return array of encoding
};
module.exports = {
    MinHeap,
    WeightedWord,
    Node,
    encode,
    HCode,
    getHWords,
};


