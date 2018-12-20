const encode = require('../Project2/text-processor');
const util = require('../Project2/min-heap');
const fs = require('fs');
while (encode.words.hold.length > 1) { // keeps popping of min heap till it consist of 1 node
    let a = encode.words.getTop();
    let b = encode.words.getTop();
    let c = new util.Node(b, a);
    encode.words.addNode(c);
}
let memoized = [];
a = encode.words.getTop();
let he = "";
util.encode(a, he); // creates array of encoded characters
let hWords = util.getHWords();
let w = fs.readFileSync('../Project2/uncompressed.txt', 'utf-8' );
for (let i = 0; i < w.length; i++) { // cycles through text of document
    if (memoized[w[i]]) { // checks if letter has already been looked up
        fs.appendFileSync('compressed.txt', memoized[w[i]]); // if so writes to new file
        fs.appendFileSync('compressed.txt', ' ');
        continue;
    }
    for (let j = 0; j < hWords.length; j++) {
        if (w[i] == hWords[j].letter) { // else looks it up and writes it to file
            fs.appendFileSync('compressed.txt', hWords[j].encoding);
            fs.appendFileSync('compressed.txt', ' ');
            memoized[w[i]] = hWords[j].encoding;
        }
    }
}
const myJSON = JSON.stringify(a); // stringify tree array and write it to the file
fs.appendFileSync('compressed.txt', '\n');
fs.appendFileSync('compressed.txt', 'TREE\n');
fs.appendFileSync('compressed.txt', myJSON);
