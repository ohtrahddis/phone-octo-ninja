var Arduino = require("../lib/arduino.js");
var Devices = require("../lib/device.js");

var arduino = new Arduino("/dev/ttyACM0", {});

/*var app = require('express')(),
	server = require('http').createServer(app);*/

//server.listen(8000);

//SET UP
var remote = new Devices.Client.Remote(devices);
remote.listen(8080);

var pin = 13;
var status = false;

arduino.ready(function() {
	arduino.pin.init(pin, function() {
		arduino.pin.digitalWrite(pin, false);
	});
});

var devices = {
    arduino : {
        tap : function(options, callback) {
            console.log("I WAS TAPPED");
            if(status == true) {
				arduino.pin.init(pin, function() {
					arduino.pin.digitalWrite(pin, false);
				});
				status = false;
			}
			else if(status == false) {
				arduino.pin.init(pin, function() {
					arduino.pin.digitalWrite(pin, true);
				});
				status = true;
			}
            callback({ status : 'success'})
        },
        on : function(options, callback) {
            console.log(arguments);
            arduino.pin.init(pin, function() {
				arduino.pin.digitalWrite(pin, true);
			});
			status = true;
            callback({ status : 'success' });
        }
    }
}