let myData = [];
const fs = require('fs');

let flights = fs.readFileSync('../Project_1/airline_map.json', 'utf-8' );
myData = JSON.parse(flights); // loads in json data to array
function mergeSort(dataToSort) { // merge sort
    if (dataToSort.length === 1) {
        return dataToSort; // if data is subdivided enough return
      }

      const mid = dataToSort.length / 2; // otherwise keep dividing
      const l = dataToSort.slice(0, mid);
      const r = dataToSort.slice(mid);

      return merge(mergeSort(l), mergeSort(r)); // call sort on divided data
}
function merge(l, r) {
    let result = [];

    while (l.length && r.length) { // truthy to keep cycling
      if (l[0].y < r[0].y) {
        result.push(l.shift());
      } else {
        result.push(r.shift());
      }
    }
    return result.concat(l.slice()).concat(r.slice()); // return results of sort
  }

myData = mergeSort(myData);


function distance(plane1, plane2, minDistance) { // checks the distance between two pairs by the distance formula
    distanceX = plane1.x - plane2.x;
    distanceX = Math.pow(distanceX, 2);
    distanceY = plane1.y - plane2.y;
    distanceY = Math.pow(distanceY, 2);
    if (distanceY > Math.pow(minDistance, 2)) {
        return -1;
    }
    finDistance = distanceX + distanceY;
    finDistance = Math.sqrt(finDistance);
    return finDistance;
};

let pair = { // holds the closest pair
    length: 999999,
};
for (i = 0; i < myData.length; i++) { // cycles through each item in the array checking distances
    let planeA = myData[i];

    for (j = i; j < myData.length; j++) {
        let lengthCheck = distance(planeA, myData[j], pair.length);
        if (lengthCheck === 0) { // ignores pair if both points are the same
            continue;
        }
        if (lengthCheck == -1) { // if delta y is larger than min distance breaks
            break;
        }
        if (lengthCheck < pair.length) { // if closest pair stores it in pair
            pair.length = lengthCheck;
            pair.planeB = myData[j];
            pair.planeA = planeA;
        }
    }
}
console.log(pair);
