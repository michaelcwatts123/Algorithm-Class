const random = new (require('chance'));
const fs = require('fs');
words = '';
for (i = 0; i < 30000; i++) {
    let word = random.string({pool: 'abcdefghijklmnopqrstuvwxyz!?.,'}); // generates random char from pool of characters of a random length
    words = words + ' ' + word;
}
fs.writeFileSync('uncompressed.txt', words); // writes words to file
