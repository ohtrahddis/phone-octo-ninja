var net = require('net');
var Devices = require("../lib/device");
var Device = Devices.Device;
var Locator = require('../locater/locater.js');
var config = require('./devices')

var devices = {};
var buckets = {};
for (var device in config) {
    devices[config[device].id] = new Device(config[device].id, config[device].driver);
    buckets[config[device].id] = config[device].bucket;
}

var server = net.createServer(function (socket) {
    socket.on('data', function(data) {
        var obj = JSON.parse(data.toString('ascii'));
        var bucket;
        var x = obj.orientation.axes.y.x;
        if (x > -0.5 && x < 0.5) {
            bucket = 'front';
        } else if (x < -0.5) {
            bucket = 'left';
        } else if (x > 0.5) {
            bucket = 'right';
        }
        for (var device in buckets) {
            if (bucket == buckets[device]) {
                console.log("Tapping", device);
                (function(dev) {
                    devices[dev].tap(function(results) {
                        if (results.status == "success") {
                            console.log(dev,"tapped successfully!");
                        }
                    })
                })(device);
            }
        }
    })
});
server.listen(1337);
/*var pandora = new Devices.Device("158.130.102.25", new Device.Client.Binary(9000));
  setInterval(function() {
  pandora.action("toggleMusic", {}, function(result) {
  console.log(result);
  });
  pandora.action("barrelRollRight", {}, function(result) {
  console.log(result);
  });
  }, 3000)*/
