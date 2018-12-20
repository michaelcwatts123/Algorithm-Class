let Jimp = require("jimp");
const Chance = new(require("chance"));
let color = Jimp.intToRGBA(Jimp.rgbaToInt(66, 134, 244, .5));
let hexaWhite = Jimp.rgbaToInt(255, 255, 255, 1);
let hexaBlack = Jimp.rgbaToInt(0, 0, 0, 0);
Jimp.read("./bact2.png").then(function(image) { // load in image
    let img2 = image.clone();
    let colorHexA = (img2.getPixelColor(0, 0)); // set 0,0 pixel to be background
    img2.scan(0, 0, img2.bitmap.width, img2.bitmap.height, function(x, y, idx) {
        let colorHexB = (img2.getPixelColor(x, y));
        if (Math.abs(colorHexA - colorHexB) < Math.pow(2500, 2.75)) { // compare each pixel to background to see if its within tolerance
            img2.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 0), x, y); // if so color it black
        } else {
            img2.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 1), x, y); // otherwise color it white
        }
    });
    img2.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 0), 0, 0);
    img2.write("./sepImg2.jpg");
    img3 = img2.clone(); // clone black picture with white objects
    img3.scan(0, 0, img3.bitmap.width, img3.bitmap.height, function(x, y, idx) {
        if ((img3.getPixelColor(x, y)) == hexaWhite) { // if an object is white color it
            if (img3.getPixelColor(x, y - 1) != hexaWhite && img3.getPixelColor(x, y - 1) != hexaBlack) {
                img3.setPixelColor(img3.getPixelColor(x, y - 1), x, y);
            } else {
                img3.setPixelColor(Jimp.rgbaToInt(color.r, color.g, color.b, color.a), x, y);
            }
        } else { // else assign a new color
            color = Jimp.intToRGBA(Jimp.rgbaToInt(Chance.integer({
                min: 0,
                max: 255,
            }), Chance.integer({
                min: 0,
                max: 255,
            }), Chance.integer({
                min: 0,
                max: 255,
            }), 1));
        }
    });
    img3.write("./coloredSep.jpg");
    img3.scan(0, 0, img3.bitmap.width, img3.bitmap.height, function(x, y, idx) {
        let currC = img3.getPixelColor(x, y);
        if (currC != hexaBlack) { // if a pixel is not black color all surronding pixels the same color
            if (img3.getPixelColor(x - 1, y - 1) != hexaBlack) {
                img3.setPixelColor(currC, x - 1, y - 1);
            }
            if (img3.getPixelColor(x, y - 1) != hexaBlack) {
                img3.setPixelColor(currC, x, y - 1);
            }
            if (img3.getPixelColor(x + 1, y - 1) != hexaBlack) {
                img3.setPixelColor(currC, x + 1, y - 1);
            }

            if (img3.getPixelColor(x - 1, y) != hexaBlack) {
                img3.setPixelColor(currC, x - 1, y);
            }
            if (img3.getPixelColor(x, y) != hexaBlack) {
                img3.setPixelColor(currC, x, y);
            }
            if (img3.getPixelColor(x + 1, y) != hexaBlack) {
                img3.setPixelColor(currC, x + 1, y);
            }

            if (img3.getPixelColor(x - 1, y + 1) != hexaBlack) {
                img3.setPixelColor(currC, x - 1, y + 1);
            }
            if (img3.getPixelColor(x, y + 1) != hexaBlack) {
                img3.setPixelColor(currC, x, y + 1);
            }
            if (img3.getPixelColor(x + 1, y + 1) != hexaBlack) {
                img3.setPixelColor(currC, x + 1, y + 1);
            }
        }
    });
    img3.write("./coloredSep.jpg");
}).catch(function(err) {
    console.log(err);
});
