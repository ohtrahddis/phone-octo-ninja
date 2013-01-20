var Arduino = require("../lib/arduino.js");
var Devices = require("../lib/device.js");

var arduino = new Arduino("/dev/ttyACM0", {});

/*var app = require('express')(),
	server = require('http').createServer(app);*/

//server.listen(8000);

//SET UP

var pin = 13;
var status = false;

arduino.ready(function() {
	arduino.pin.init(pin, function() {
		arduino.pin.digitalWrite(pin, false);
		status = false;
		console.log("init done");
	});
});

function pinTap() {
	if(status == true) {
		pinOff();
	}
	else if(status == false) {
		pinOn();
	}
}

function pinOn() {
	console.log("turning on");
	arduino.pin.digitalWrite(pin, true);
	status = true;
}

function pinOff() {
	console.log("turning off");
	arduino.pin.digitalWrite(pin, false);
	status = false;
}


var arduino2 = new Arduino("/dev/ttyUSB0", {});

arduino2.ready(function() {
	arduino2.servo.init(9, function() {
		arduino2.servo.turn(0);
	});
});

status2 = false;

function servoTap() {
	if(status2 == true) {
		servoOff();
	}
	else if(status2 == false) {
		servoOn();
	}
}

function servoOn() {
	arduino2.servo.turn(180);
	status2 = true;
}

function servoOff() {
	arduino2.servo.turn(0);
	status2 = false;
}



var devices = {
    lightbulb : {
        tap : function(options, callback) {
            console.log("I WAS TAPPED");
            pinTap();
            callback({ status : 'success'})
        },
        on : function(options, callback) {
            console.log("TURN ON");
            pinOn();
            callback({ status : 'success' });
        },
        off : function(options, callback) {
        	console.log("TURN OFF");
        	pinOff();
        	callback( { status : 'success' } );
        }
    },
    servo : {
		tap : function(options, callback) {
			console.log("i was tapped");
			servoTap();
			callback({ status: 'success'})
		},
		on : function(options, callback) {
			console.log("turn on");
			servoOn();
			callback({ status: 'success'})
		},
		off : function(options, callback) {
			console.log("turn off");
			servoOff();
			callback( {status : 'success' } );
		}
	}
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);