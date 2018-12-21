let Jimp = require("jimp");

Jimp.read("./810147810.jpg").then(function(image) { // load in the image
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
       let colorInt = image.getPixelColor(x, y); // extract the color at an x y location
       let colorHex = Jimp.intToRGBA(colorInt); // convert to RGB


        let newImg = (colorHex.r+colorHex.g+colorHex.b)/3; // average out RGB values
    colorHex.r = newImg; // assign new averaged value to R G B
    colorHex.g = newImg;
    colorHex.b = newImg;

       newColor = Jimp.rgbaToInt(colorHex.r, colorHex.g, colorHex.b, colorHex.a);
       image.setPixelColor(newColor, x, y);// recolor pixle
    });
    image.write("./blurredImage.jpg"); // save new greyscale image
}).catch(function(err) {
    console.log(err);
});

