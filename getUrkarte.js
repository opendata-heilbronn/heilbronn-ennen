var request = require('request');
var fs = require('fs');
var async = require('async');

var pattern = /stadtheilbronn=#([^;]+)/;

var topLeft = {
    x: 3502638,
    y: 5451398
};
var bottomRight = {
    x: 3522119,
    y: 5438805
};

var q = async.queue(function (task, callback) {
    var stream = request(task.url).pipe(fs.createWriteStream('downloads/tile-' + task.x + 'x' + task.y + '.png'));
    stream.on('finish', function () {
        console.log('finished downloading ' + task.url);
        setTimeout(function () {
            callback();
        }, 1000);
    });
}, 2);

request('https://www.gisserver.de/heilbronn/infopage?vname=Geoportal&type=ViewerGtiTheme&name=UFK25', function (error, response) {
    var cookie = response.headers['set-cookie'][0];
    var sessionId = pattern.exec(cookie)[1];

    var yIndex = 0;
    for (var y = topLeft.y; y > bottomRight.y; y -= 232) {
        yIndex++;
        var xIndex = 0;
        for (var x = topLeft.x; x < bottomRight.x; x += 232) {
            xIndex++;
            var url = 'https://www.gisserver.de/heilbronn/stdmap?type=png&themes=UFK25&width=500&height=500&scale=660&win=31467,' + x + ',' + y + ',' + topLeft.x + ',' + topLeft.y + '&SessionId=' + sessionId;
            q.push({url: url, x: xIndex, y: yIndex});
        }
    }
});