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

function tap() {
	if(status == true) {
		off();
	}
	else if(status == false) {
		on();
	}
}

function on() {
	console.log("turning on");
	arduino.pin.digitalWrite(pin, true);
	status = true;
}

function off() {
	console.log("turning off");
	arduino.pin.digitalWrite(pin, false);
	status = false;
}

var devices = {
    lightbulb : {
        tap : function(options, callback) {
            console.log("I WAS TAPPED");
            tap();
            callback({ status : 'success'})
        },
        on : function(options, callback) {
            console.log("TURN ON");
            on();
            callback({ status : 'success' });
        },
        off : function(options, callback) {
        	console.log("TURN OFF");
        	off()
        	callback( { status : 'success' } );
        }
    }
}


var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);