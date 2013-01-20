var Devices = require("../lib/device.js");
var spawn = require('child_process').spawn;

function call(option, callback) {
  spawn('sh', ['call.sh']);
  callback({status: "success"});
}

function text(option, callback) {
  spawn('sh', ['text.sh']);
  callback({status: "success"});
}

var devices = {
    twilio : {
      call: call,
      text: text
    }
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
