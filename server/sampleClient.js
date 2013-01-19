var Devices = require('../lib/device')
var client = new Devices.Driver.Remote('localhost', 8080);
var peter = new Devices.Device("peter", client);
peter.tap(function(result) {
    console.log(result);
});
