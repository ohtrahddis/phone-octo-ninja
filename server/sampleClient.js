var Devices = require('../lib/device')
//var client = new Devices.Client.TCP("158.130.102.25", 8080);
var peterpc = new Devices.Client.TCP("158.130.104.179", 8080);
//var gerald = new Devices.Device("mac", client);
var servo= new Devices.Device("servo", peterpc);
var lightbulb= new Devices.Device("lightbulb", peterpc);
//gerald.action("screenLeft",{},function(result) {
    //console.log(result);
//});
setInterval(function() {
    console.log("SUP");
    lightbulb.tap(function(result) {
        console.log(result);
    })
    servo.tap(function(result) {
        console.log(result);
    })
},2000);
