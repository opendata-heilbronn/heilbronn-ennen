var gm = require('gm');
var fs = require('fs');
var async = require('async');

var startImg = [];
for (var i = 1; i <= 299; i++) {
    startImg[i] = gm("./tiles/tile-" + i + "x1.png");
}

var count = 0;

var q = async.queue(function (task, callback) {
    console.log('execute async queue');
    console.log('task=' + task);

    var path = "./tiles/tile-" + task.i + "x" + task.y + ".png";
    // Append a set of images, only if tile exists
    if (fs.existsSync(path)) {
        startImg[task.i].append(path);
    }

    setTimeout(function () {
        console.log('after callback');
        callback();
    }, 300)
    count++;
    console.log(count);
}, 1);

for (var i = 1; i <= 299; i++) { // width: 299 blocks
    for (var y = 2; y <= 596; y++) { // height: 596 blocks
        q.push({i: i, y: y});
    }
}

// Create the image file
q.drain = function () {

    for (var i = 1; i <= 299; i++) { 
        startImg[i].write('./combinedImg' + i + '.png', function (err) {
            if (!err)
                console.log(' hooray' + i + '!');
        });
    }
}

