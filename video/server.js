var Devices = require("../lib/device");
var Device = Devices.Device;
//var videoControl = new Device("158.130.109.151", new Device.Client.Binary(9090));
var videoControl = new Device(config[2].id, config[2].driver);
var config = require('./devices')

var app = require('express')(),
    server = require('http').createServer(app);

server.listen(8000);

app.get('/video', function(req, res){
  res.render("video.html");
});
app.listen(8001);


var devices = {
    video : {
        record : function(options, callback) {
            console.log("BEGINNING RECORDING");
            videoControl.action("record", {}, function(result) {
		        console.log(result);
		    });
            callback({ status : 'success'})
        },
        stop: function(opetions, callback) {
        	console.log("STOPPING RECORDING");
        	videoControl.action("stop", {}, function(result) {
		        console.log(result);
		    });
            callback({ status : 'success' });
        },
        play : function(options, callback) {
            console.log("PLAYING RECORDED VIDEO");
            videoControl.action("play", {}, function(result) {
		        console.log(result);
		    });
            callback({ status : 'success' });
        },
        pause : function(options, callback) {
        	console.log("PAUSING RECORDED VIDEO");
        	videoControl.action("pause", {}, function(result) {
		        console.log(result);
		    });
        	callback( { status : 'success' } );
        }
    }
}

var remote = new Devices.Driver.TCP(devices);
remote.listen(8000);