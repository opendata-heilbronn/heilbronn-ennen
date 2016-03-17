var gm = require('gm');

//x1: 49.158357
//y1: 9.166075
//x2: 49.102599
//y2: 9.267430
gm("downloaded.png")
    .crop(7900-895, 6800-955, 8500+733, 9500+364)
    .write('./urkarte-cutout.png', function (err) {
        if (!err) console.log(' hooray! ');
        else console.error(err);
    });