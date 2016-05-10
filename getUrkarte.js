var request = require('request');
var fs = require('fs');
var async = require('async');


var topLeft = {
    x: 1038362.7467112045,
    y: 6285163.735994476
};
var bottomRight = {
    x: 1039203.5557501,
    y: 6280883.2537654
};

var q = async.queue(function (task, callback) {
    var stream = request(task.url).pipe(fs.createWriteStream('downloads/tile-' + task.x + 'x' + task.y + '.png'));
    stream.on('finish', function () {
        console.log('finished downloading ' + task.url);
        
        callback();
    });
}, 2);


/*
http://owsproxy.lgl-bw.de/owsproxy/ows/WMS_LGL-BW_HIST_FKWue_25_K?user=la_bw&password=20140404_la_bw&FORMAT=image%2Fpng&LAYERS=RDS.LY_HISTFK25_SWKOMBI&PROJECTION=EPSG%3A3857&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A3857&BBOX=1021011.5066341,6299992.5490553,1021087.9438152,6300068.9862365&WIDTH=256&HEIGHT=256
*/
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
