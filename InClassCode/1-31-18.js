'use strict';
const printFullName = (first, middle, last) => {
    return `${first} ${middle} ${last}`;
};

function somethingElse() {
    console.log('Hello World');
};

module.exports = {
    fName: printFullName, // no Key-value pairs, the key is the key and the value is the value unless renaming the function 
    somethingElse,
};
