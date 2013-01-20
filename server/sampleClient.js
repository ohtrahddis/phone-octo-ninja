var Devices = require('../lib/device')
var client = new Devices.Client.TCP("158.130.102.25", 8080);
var peterpc = new Devices.Client.TCP("158.130.109.151", 8080);
var gerald = new Devices.Device("mac", client);
var peter = new Devices.Device("arduino", peterpc);
//gerald.action("screenLeft",{},function(result) {
    //console.log(result);
//});
setInterval(function() {
    peter.tap(function(result) {
        console.log(result);
    })
},1000);
