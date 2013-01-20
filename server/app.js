var net = require('net');
var Devices = require("../lib/device");
var Device = Devices.Device;
var Locator = require('../locater/locater.js');
var config = require('./devices')

var devices = {};
var buckets = {};
var gestures = {};
for (var device in config) {
    gestures[config[device].id] = config[device].mappings;
    devices[config[device].id] = new Device(config[device].id, config[device].driver);
    if (!buckets[config[device].bucket])
        buckets[config[device].bucket] = []
    buckets[config[device].bucket].push(config[device])
}
console.log(gestures)
console.log(buckets);

var server = net.createServer(function (socket) {
    socket.on('data', function(data) {
        var obj = JSON.parse(data.toString('ascii'));
        var event = obj.event;
        var bucket;
        var x = obj.orientation.axes.y.x;
        if (x > -0.3 && x < 0.7) {
            bucket = 'front';
        } else if (x < -0.3) {
            bucket = 'left';
        } else if (x > 0.7) {
            bucket = 'right';
        }
        console.log(event, bucket)
        if (buckets[bucket]) {
            if (buckets[bucket].length > 1)  {
                device = Locator.findDevice(buckets[bucket], obj.touch.objects, obj.touch.touched, obj.orientation);
                console.log("FOUND DEVICE:", device)
            } else {
                device = buckets[bucket][0].id
            }
            (function(dev) {
                console.log(event, dev);
                if (event == "tap") {
                    devices[dev].tap(function(results) {
                        if (results.status == "success") {
                            console.log(dev,"tapped successfully!");
                        }
                    })
                } else {
                    console.log(gestures[dev][event], dev, event);
                    if (gestures[dev][event]) {
                        devices[dev].action(gestures[dev][event], {}, function(results) {
                            console.log(results);
                            if (results.status == "success") {
                                console.log(dev,event, "successfully!");
                            }
                        })
                    }
                }
            })(device);
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
