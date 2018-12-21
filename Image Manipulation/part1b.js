let Jimp = require("jimp");

Jimp.read("./810147810.jpg").then(function(image) { // load in image
    let newImg = image.clone();
    newImg.scan(0, 0, newImg.bitmap.width, newImg.bitmap.height, function(x, y, idx) {
        let cMatrix = new Array(3);
        for (let i = 0; i < 4; i++) {
            cMatrix[i] = new Array(3);
          }
          // create matrix of pixels centered on pixel and x, y
        cMatrix [0][0] = Jimp.intToRGBA(newImg.getPixelColor(x-1, y+1));
        cMatrix [0][1] = Jimp.intToRGBA(newImg.getPixelColor(x, y+1));
        cMatrix [0][2] = Jimp.intToRGBA(newImg.getPixelColor(x+1, y+1));

        cMatrix [1][0] = Jimp.intToRGBA(newImg.getPixelColor(x-1, y));
        cMatrix [1][1] = Jimp.intToRGBA(newImg.getPixelColor(x, y));
        cMatrix [1][2] = Jimp.intToRGBA(newImg.getPixelColor(x+1, y));

        cMatrix [2][0] = Jimp.intToRGBA(newImg.getPixelColor(x-1, y-1));
        cMatrix [2][1] = Jimp.intToRGBA(newImg.getPixelColor(x, y-1));
        cMatrix [2][2] = Jimp.intToRGBA(newImg.getPixelColor(x+1, y-1));
        let newRed = 0;
        let newBlue = 0;
        let newGreen = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newRed += cMatrix[i][j].r; // sum up all r values
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newBlue += cMatrix[i][j].b; // sum up all b values
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newGreen += cMatrix[i][j].g;// sum up all g values
            }
        }
        let newColor = Jimp.rgbaToInt(newRed/9, newGreen/9, newBlue/9, cMatrix[1][1].a); // assign new value as average of summed up values
        newImg.setPixelColor(newColor, x, y);
    });
    newImg.write("./blurredImage.jpg");
    let newImg2 = newImg.clone();
    newImg2.scan(0, 0, newImg.bitmap.width, newImg.bitmap.height, function(x, y, idx) {
        let cMatrix = new Array(3);
        for (let i = 0; i < 4; i++) {
            cMatrix[i] = new Array(3);
          }
          // create matrix of pixels centered on pixel and x, y
        cMatrix [0][0] = Jimp.intToRGBA(newImg2.getPixelColor(x-1, y+1));
        cMatrix [0][1] = Jimp.intToRGBA(newImg2.getPixelColor(x, y+1));
        cMatrix [0][2] = Jimp.intToRGBA(newImg2.getPixelColor(x+1, y+1));

        cMatrix [1][0] = Jimp.intToRGBA(newImg2.getPixelColor(x-1, y));
        cMatrix [1][1] = Jimp.intToRGBA(newImg2.getPixelColor(x, y));
        cMatrix [1][2] = Jimp.intToRGBA(newImg2.getPixelColor(x+1, y));

        cMatrix [2][0] = Jimp.intToRGBA(newImg2.getPixelColor(x-1, y-1));
        cMatrix [2][1] = Jimp.intToRGBA(newImg2.getPixelColor(x, y-1));
        cMatrix [2][2] = Jimp.intToRGBA(newImg2.getPixelColor(x+1, y-1));
        let newColor = {};
        // apply sharpen matrix transform to pixel matrix
        newColor.r = ((-1 * cMatrix[0][1].r) + (-1 * cMatrix[1][0].r) + (5 * cMatrix[1][1].r) + (-1 * cMatrix[1][2].r) + (-1 * cMatrix[2][1].r)*(1/9));
        newColor.b = ((-1 * cMatrix[0][1].b) + (-1 * cMatrix[1][0].b) + (5 * cMatrix[1][1].b) + (-1 * cMatrix[1][2].b) + (-1 * cMatrix[2][1].b)*(1/9));
        newColor.g = ((-1 * cMatrix[0][1].g) + (-1 * cMatrix[1][0].g) + (5 * cMatrix[1][1].g) + (-1 * cMatrix[1][2].g) + (-1 * cMatrix[2][1].g)*(1/9));
        newColor.a = ((-1 * cMatrix[0][1].a) + (-1 * cMatrix[1][0].a) + (5 * cMatrix[1][1].a) + (-1 * cMatrix[1][2].a) + (-1 * cMatrix[2][1].a)*(1/9));
        let newHex = (newColor);
        // rebound the RGB values
        if (newHex.r < 0) {
            newHex.r = 0;
        }
        if (newHex.r > 255) {
            newHex.r = 255;
        }
        if (newHex.g < 0) {
            newHex.g = 0;
        }
        if (newHex.g > 255) {
            newHex.g = 255;
        }
        if (newHex.b < 0) {
            newHex.b = 0;
        }
        if (newHex.b > 255) {
            newHex.b = 255;
        }
        if (newHex.a < 0) {
            newHex.a = 0;
        }
        if (newHex.a > 255) {
            newHex.a = 255;
        }
        newImg2.setPixelColor(Jimp.rgbaToInt(newHex.r, newHex.g, newHex.b, newHex.a), x, y);
    });
    newImg2.write("./sharpImage.jpg"); // write to new image
}).catch(function(err) {
    console.log(err);
});

