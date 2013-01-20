
var Arduino = require("../lib/arduino.js");
var Devices = require("../lib/device.js");

var arduino = new Arduino("/dev/ttyUSB0", {});

arduino.ready(function() {
	arduino.servo.init(9, function() {
		arduino.servo.turn(0);
	});
});

status = false;

function tap() {
	if(status == true) {
		off();
	}
	else if(status == false) {
		on();
	}
}

function on() {
	arduino.servo.turn(180);
	status = true;
}

function off() {
	arduino.servo.turn(0);
	status = false;
}

var devices = {
	servo : {
		tap : function(options, callback) {
			console.log("i was tapped");
			tap();
			callback({ status: 'success'})
		},
		on : function(options, callback) {
			console.log("turn on");
			on();
			callback({ status: 'success'})
		},
		off : function(options, callback) {
			console.log("turn off");
			off();
			callback( {status : 'success' } );
		}
	}
}

var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);