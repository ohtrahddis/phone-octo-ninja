var Devices = require("../lib/device");
var pandora = new Devices.Device("158.130.102.25", new Device.Client.Binary(9000));
setInterval(function() {
    pandora.action("toggleMusic", {}, function(result) {
        console.log(result);
    });
    pandora.action("barrelRollRight", {}, function(result) {
        console.log(result);
    });
}, 3000)
