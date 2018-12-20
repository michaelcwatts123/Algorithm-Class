let myData = [];
const fs = require('fs');

let flights = fs.readFileSync('../Project_1/airline_map.json', 'utf-8' );
myData = JSON.parse(flights); // loads in json data to array
function pairCheck(plane1, plane2) { // checks the distance between two pairs
    distanceX = plane1.x - plane2.x;
    distanceX = Math.pow(distanceX, 2);
    distanceY = plane1.y - plane2.y;
    distanceY = Math.pow(distanceY, 2);
    finDistance = distanceX + distanceY;
    finDistance = Math.sqrt(finDistance);
    return finDistance;
}
let pair = {
    length: 999999,
};
for (i = 0; i < myData.length; i++) { // cycles through each item in the array checking distances
    let planeA = myData[i];

    for (j = 0; j < myData.length; j++) {
        let lengthCheck = pairCheck(planeA, myData[j]);
        if (lengthCheck === 0) { // ignores pair if both points are the same
            continue;
        }
        if (lengthCheck < pair.length) {
            pair.length = lengthCheck;
            pair.planeB = myData[j];
            pair.planeA = planeA;
        }
    }
}
console.log(pair); // logs out closest found pair

