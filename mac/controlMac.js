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

function nextSlide(option, callback) {
  spawn('sh', ['nextSlide.sh']);
  callback({status: "success"});
}

var devices = {
    mac : {
      screenRight: screenRight,
      screenLeft: screenLeft,
      nextSlide: nextSlide
    }
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
