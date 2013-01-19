var Devices = require("../lib/device.js");
var spawn = require('child_process').spawn;

function screenLeft() {
  spawn('sh', ['switchDeskLeft.sh']);
}

function screenRight() {
  spawn('sh', ['switchDeskRight.sh']);
}

var devices = {
    mac : {
      screenRight: screenRight,
      screenLeft: screenLeft
    }
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
