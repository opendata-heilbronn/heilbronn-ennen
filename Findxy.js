var gm = require('gm');
var fs = require('fs');

var maxX = 0, maxY = 0;

var p = "./tiles/"

// Find the maximal value of x-axis and y-axis, extracting them from the tiles files name
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.filter(function (file) {
        return fs.existsSync(p + file);
    }).forEach(function (file) {
        //console.log("%s (%s)", file);
        var myRegExp = /^tile-[1-9]+x[1-9]+.png$/i;
        var allNumbers = /[0-9]+/g;
        if (file.match(myRegExp)) {
            numbers = file.match(allNumbers);
            maxX = Math.max(maxX, numbers[0]);
            maxY = Math.max(maxY, numbers[1]);
        }
    });
    console.log(maxX);
    console.log(maxY);
});

// Result maxX = 299, maxY = 596



