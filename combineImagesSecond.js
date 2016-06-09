var gm = require('gm');
var fs = require('fs');
var async = require('async');
// Use of GraphicsMagick 
var finalImg = gm("./combinedImg1.png");

var count = 0;

var q = async.queue(function (task, callback) {
    console.log('execute async queue');
    //console.log('task.y=' + task.y);
    var path = "./combinedImg" + task.i + ".png";
    // Append a set of images, only if tile exists
    if (fs.existsSync(path)) {
        finalImg.append(path).append(true);
    }
    setTimeout(function () {
        console.log('after callback');
        callback();
    }, 300)
    count++;
    console.log(count);
}, 1);


for (var i = 2; i <= 299; i++) {
    q.push({i: i});
}


q.drain = function () {
    finalImg.write('./combinedImgBig.png', function (err) {
        if (!err)
            console.log(' hooray!');
    });
}

