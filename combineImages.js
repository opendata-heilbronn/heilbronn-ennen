var gm = require('gm');
var fs = require('fs');

var startImg = gm("downloads/tile-24x20.png")
for (var i = 2; i <= 55; i++) {
    startImg.append("downloads/tile-24x" + i + ".png");
}
startImg.write('./combinedImg.png', function (err) {
    if (!err) console.log(' hooray! ');
});