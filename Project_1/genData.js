const random = new (require('chance'));
const fs = require('fs');
class Plane { // holds all the information on each plane
    constructor(dataX, dataY, namePlane, dir) {
    this.x = dataX;
    this.y = dataY;
    this.name = namePlane;
    this.dir = dir;
    };
};
const sampleX = random.n(random.floating, 100, {min: -10, max: 10, fixed: 4}); // generates plane's x coordinate
const sampleY = random.n(random.floating, 100, {min: -10, max: 10, fixed: 4}); // generates plane's y coordinate
const namespt1 = random.n(random.string, 100, {length: 2, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'}); // generates plane's letter name
const namespt2 = random.n(random.integer, 100, {min: 100, max: 999}); // generates plane's number name
const dir = random.n(random.floating, 100, {min: 0, max: 360, fixed: 4});
const genData = (data1, data2, nameData1, nameData2) => { // generates plane objects
    sampleData = [];
    for (let i = 0; i < data1.length; i++) {
        let name = nameData1[i] + nameData2[i];
        sampleData[i] = new Plane(data1[i], data2[i], name, dir[i]);
    }
    return sampleData;
};
let a = genData(sampleX, sampleY, namespt1, namespt2);
const myJSON = JSON.stringify(a); // turns data into json format
fs.writeFileSync('airline_map.json', myJSON); // write json data to file


