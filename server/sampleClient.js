var Devices = require('../lib/device')
var client = new Devices.Client.TCP('localhost', 8080);
var peter = new Devices.Device("arduino", client);
/*peter.tap(function(result) {
    console.log(result);
});*/
peter.action("tap",{},function(result) {
    console.log(result);
});
