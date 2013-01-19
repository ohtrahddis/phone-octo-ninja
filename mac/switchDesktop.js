var Devices = require("../lib/device.js");
var spawn = require('child_process').spawn;

function screenLeft(option, callback) {
  spawn('sh', ['switchDeskLeft.sh']);
  callback({status: "success"});
  
}

function screenRight(option, callback) {
  spawn('sh', ['switchDeskRight.sh']);
  callback({status: "success"});
}

var devices = {
    mac : {
      screenRight: screenRight,
      screenLeft: screenLeft
    }
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
