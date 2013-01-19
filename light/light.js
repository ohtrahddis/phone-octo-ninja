var Arduino = require("./arduino.js");
var arduino = new Arduino("/dev/ttyACM0", {});

var app = require('express')(),
	server = require('http').createServer(app);

server.listen(8000);
var pin = 13;
var status = false;

arduino.ready(function() {
	arduino.pin.init(pin, function() {
		arduino.pin.digitalWrite(pin, false);
	});
});

app.get('/', function (request, response) {
	
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

	var body = "success"
	response.setHeader('Content-Type', 'text/plain');
	response.setHeader('Content-Length', body.length);
    response.end(body);
});