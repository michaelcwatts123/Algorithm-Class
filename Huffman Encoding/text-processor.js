const util = require('../Project2/min-heap');
const fs = require('fs');
const assert = require('assert');
let myWords = [];
let words = new util.MinHeap();


let w = fs.readFileSync('../Project2/uncompressed.txt', 'utf-8' );
myLetters = w;
for (let i = 0; i < w.length; i++) { // goes through each letter in text
    let letter = w[i];
    let flag = true;
    for (let j = 0; j < myWords.length; j++) { // if letter has been encountered increment weight by 1
        if (letter == myWords[j].letter) {
            myWords[j].freq++;
            flag = false;
            break;
        }
    }
    if (flag) { // else save letter and set weight to 1
        let newLetter = new util.WeightedWord(letter, 1);
        myWords.push(newLetter);
    }
}
for (let i = 0; i < myWords.length; i++) {
    words.addNode(myWords[i]);
}

for (let i = 0; i <myWords.length-1; i++) {
    assert(words.hold[i].freq <= words.hold[i+1].freq); // ensures min heap property maintained
}
console.log(words);
module.exports = {
    words,
};


