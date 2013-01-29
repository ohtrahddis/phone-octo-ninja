var Devices = require("../lib/device.js");
var spawn = require('child_process').spawn;

var curScreen = 0;

function swipeLeft(option, callback) {
  if (curScreen != -1) {
    curScreen--;
  }
  console.log("HI");
  spawn('sh', ['switchDeskLeft.sh']);
  callback({status: "success"});
}

function swipeRight(option, callback) {
  if (curScreen != 2) {
    curScreen++;
  }
  spawn('sh', ['switchDeskRight.sh']);
  callback({status: "success"});
}

function nextSlide(option, callback) {
  spawn('sh', ['nextSlide.sh']);
  callback({status: "success"});
}

function tap(option, callback) {
  spawn('sh', ['nextSlide.sh']);
  callback({status: "success"});
}


var devices = {
    mac : {
      swipeRight: swipeRight,
      swipeLeft: swipeLeft,
      tap: tap
    }
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
