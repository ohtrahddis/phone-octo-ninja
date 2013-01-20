
var Arduino = require("../lib/arduino.js");
var Devices = require("../lib/device.js");

var arduino = new Arduino("COM5", {});

arduino.ready(function() {
	arduino.serco.init(9, function() {
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
	arduino.servo.init(9, function() {
		arduino.servo.turn(180);
	});
	status = false;
}

function off() {
	arduino.servo.init(9, function() {
		arduino.servo.turn(0);
	});
	status = true;
}

var devices = {
	arduino : {
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
			off()
			callback( {status : 'success' } );
		}
	}
}

var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
