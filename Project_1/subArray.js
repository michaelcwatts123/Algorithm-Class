let myData = [];
const fs = require('fs');

let flights = fs.readFileSync('../Project_1/airline_map.json', 'utf-8');
myData = JSON.parse(flights); // loads in json data to array
function mergeSort(dataToSort) { // merege sort
    if (dataToSort.length === 1) { // if subarray is small enough return it
        return dataToSort;
    }

    const mid = dataToSort.length / 2; // else keep divding
    const l = dataToSort.slice(0, mid);
    const r = dataToSort.slice(mid);

    return merge(mergeSort(l), mergeSort(r)); // call merge on divided array
}

function merge(l, r) {
    let result = [];

    while (l.length && r.length) { // truthy to cycle through array
        if (l[0].y < r[0].y) {
            result.push(l.shift());
        } else {
            result.push(r.shift());
        }
    }
    return result.concat(l.slice()).concat(r.slice()); // return sorted array
}

myData = mergeSort(myData);

function pairCheck(plane1, plane2) { // checks the distance between two pairs
    distanceX = plane1.x - plane2.x;
    distanceX = Math.pow(distanceX, 2);
    distanceY = plane1.y - plane2.y;
    distanceY = Math.pow(distanceY, 2);
    finDistance = distanceX + distanceY;
    finDistance = Math.sqrt(finDistance);
    return finDistance;
}
let pair = {};

function reCurr(data) {
    if (data.length <= 3) { // if data subdivided small enough return
        return data;
    }
    // else keep subdividing
    const mid = Math.floor((data.length / 2) - 1);
    const l = data.slice(0, mid);
    const r = data.slice(mid);

    return solve(reCurr(l), reCurr(r));
}

function solve(l, r) {
    d1 = {
        length: 99999999,
    };
    d2 = {
        length: 99999999,
    };
    d3 = {
        length: 99999999,
    };
    for (i = 0; i < l.length; i++) { // cycles through each item in the array checking distances
        let planeA = l[i];

        for (j = 0; j < l.length; j++) {
            let lengthCheck = pairCheck(planeA, l[j]);
            if (lengthCheck === 0) { // ignores pair if both points are the same
                continue;
            }
            if (lengthCheck < d1.length) {
                d1.length = lengthCheck;
                d1.planeB = l[j];
                d1.planeA = planeA;
            }
        }
    }
    for (i = 0; i < r.length; i++) { // cycles through each item in the array checking distances
        let planeA = r[i];

        for (j = 0; j < r.length; j++) {
            let lengthCheck = pairCheck(planeA, r[j]);
            if (lengthCheck === 0) { // ignores pair if both points are the same
                continue;
            }
            if (lengthCheck < d2.length) {
                d2.length = lengthCheck;
                d2.planeB = r[j];
                d2.planeA = planeA;
            }
        }
    }
    holding = []; // checks for pairs in between l and r
    if (d1.length < d2.length) {
        holding.push(l[l.length - 1]);
        for (i = 0; i < r.length; i++) {
            if (Math.abs(r[i].x) < Math.abs(l[l.length - 1] + d1.length)) {
                holding.push(r[i]);
            }
        }
    } else {
        holding.push(r[r.length - 1]);
        for (i = 0; i < l.length; i++) {
            if (Math.abs(l[i].x) < Math.abs(r[r.length - 1] + d2.length)) {
                holding.push(l[i]);
            }
        }
    }
    for (i = 0; i < holding.length; i++) { // cycles through each item in the array checking distances
        if (holding.length === 1) {
            break;
        }
        let planeA = r[i];

        for (j = 0; j < holding.length; j++) {
            let lengthCheck = pairCheck(planeA, holding[j]);
            if (lengthCheck === 0) { // ignores pair if both points are the same
                continue;
            }
            if (lengthCheck < d3.length) {
                d3.length = lengthCheck;
                d3.planeB = holding[j];
                d3.planeA = planeA;
            }
        }
    }
    min = d1;
    if (d2.length < min.length) {
        min = d2;
    }
    if (d3.length < min.length) {
        min = d3;
    }
    return [min.planeA, min.planeB]; // returns cloest pair out of data
}
pair = reCurr(myData);
let distance = pairCheck(pair[0], pair[1]);
console.log(pair);
console.log(distance);

let collide = (planeA, planeB) => {
    let deg = Math.PI / 180;
    let rad = 180 / Math.PI;
    // correction for new axis
    let degCorrection = (360 - planeA.dir) + planeB.dir;
    let correctedX = planeA.x - planeB.x;
    let correctedY = planeA.y - planeB.y;
    let x2 = correctedX;
    // determining direction to determine next point
    if (degCorrection >= 0 && degCorrection <= 180) {
        x2 += 1;
    } else {
        x2 -= 1;
    }
    // trig identitiy
    let y2 = x2 / (rad * Math.atan(degCorrection * deg));
    let slope = (y2 - correctedY) / (x2 - correctedX);
    let intersecpt = (-1 * slope * x2) + y2;
    if (intersecpt >= 0) {
        console.log('The planes intersect');
    } else {
        console.log('The planes do not intersect');
    }
};
collide(pair[0], pair[1]);