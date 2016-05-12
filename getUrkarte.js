var request = require('request');
var fs = require('fs');
var async = require('async');


var topLeft = {
    x: 1016272.4014022,
    y: 6326363.3765554
};
var bottomRight = {
    x: 1039203.5557501,
    y: 6280883.2537654
};

var q = async.queue(function (task, callback) {
    var filename = 'downloads/tile-' + task.x + 'x' + task.y + '.png';
    if(fs.existsSync(filename)){
        console.log('skipping tile');
        callback();
        return true;
    }
    var urlRequest = request(task.url).on('error', function(){
        console.error('could not download: ' + task.url);
    });
    var stream = urlRequest.pipe(fs.createWriteStream(filename));
    stream.on('finish', function () {
        callback();
    });
}, 2);


var DIFF = 76.437181;

    var yIndex = 0;
    for (var y = topLeft.y; y > bottomRight.y; y -= DIFF) {
        yIndex++;
        var xIndex = 0;
        for (var x = topLeft.x; x < bottomRight.x; x += DIFF) {
            xIndex++;
            var url = 'http://owsproxy.lgl-bw.de/owsproxy/ows/WMS_LGL-BW_HIST_FKWue_25_K?user=la_bw&password=20140404_la_bw&FORMAT=image%2Fpng&LAYERS=RDS.LY_HISTFK25_SWKOMBI&PROJECTION=EPSG%3A3857&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A3857&BBOX=' + x + ',' + y + ',' + (x + DIFF) + ',' + (y + DIFF) + '&WIDTH=256&HEIGHT=256';
            q.push({url: url, x: xIndex, y: yIndex});
        }
    }
