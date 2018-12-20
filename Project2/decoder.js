const fs = require('fs');
const assert = require('assert');
let w = fs.readFileSync('../Project2/compressed.txt', 'utf-8' );
const delimit = w.indexOf("TREE\n"); // to detect the tree
let tree = w.substring(delimit+5, w.length); // ignores TREE but extracts rest of tree
let encoded = w.substr(0, delimit); // detects encoded chars
myTree = JSON.parse(tree); // turns tree from file back into usable tree
let dWords = [];
let words = encoded.split(' ');
let decoded = "";
decode = (word) => { // function to decode encoded text back to regular
    if (dWords[word]) { // if it has already been looked up use its value
        decoded = decoded + dWords[word];
        return;
    }
    let curr = myTree;
    for (let i = 0; i < word.length; i++) { // else look it up in tree and save its value
        if (word[i] == '0') {
            curr = curr.left;
        }
        if (word[i] == '1') {
            curr = curr.right;
        }
    }
    dWords[word] = curr.letter;
    decoded = decoded + dWords[word];
};
for (let i = 0; i < words.length-1; i++) {
    decode(words[i]);
}

let w2 = fs.readFileSync('../Project2/uncompressed.txt', 'utf-8' );

assert.equal(w2, decoded); // checks that decoded text equals encoded text, otherwise errors

