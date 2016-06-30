var gm = require('gm');
var fs = require('fs');
var async = require('async');
// Use of GraphicsMagick 

var count = 1;

var q1 = async.queue(function (task, callback) {
    console.log('execute async queue ' + task.i);

    var path = "./combinedImg" + task.i + ".png";
    console.log('path ' + path);
    if (fs.existsSync('./combinedImgFinal.png')) {
        var finalImg = gm('./combinedImgFinal.png');
        console.log('finalImg');
    } else {
        var finalImg = gm("./combinedImg1.png");
        console.log('combined Img1');
    }

    if (fs.existsSync(path)) {
        finalImg.append(path).append(true);
    }

    // Append a set of images, only if tile exists

    setTimeout(function () {
        console.log('after callback 1');
        var startTime = new Date();
        finalImg.write('./combinedImgFinal.png', function (err) {
            if (!err) {
                console.log(' hooray! ' + task.i);
                var endTime = new Date();
                console.log((endTime - startTime)/1000);
                callback();
            }
        });
    }, 1000)
    count++;
    console.log(count);
}, 1);


for (var i = 2; i <= 10; i++) {
    q1.push({i: i});
}

/*
 q.drain = function () {
 finalImg.write('./combinedImgFinal.png', function (err) {
 if (!err)
 console.log(' hooray!');
 });
 }
 
 */