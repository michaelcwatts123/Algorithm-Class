'use strict';
let student = { // student object containing basic data
    major: 'CS',
    school: 'Lyle',

};

let Michael = { // Michael object containing basic data
    gender: 'Male',
    height: '6',
    eyeColor: 'Blue',
};

Michael.__proto__ = student; // binding Michael object to student 
console.log('A student object');
console.log(student);
console.log('A michael object ');
console.log(Michael);
console.log("A michael's school object after setting its __proto__ to student");
console.log(Michael.school);

