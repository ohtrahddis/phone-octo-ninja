var Devices = require("../lib/device")
var devices = {
    peter : {
        tap : function(options, callback) {
            console.log("I WAS TAPPED");
            callback({ status : 'success'})
        },
        on : function(options, callback) {
            console.log(arguments);
            callback();
        }
    }
}
//SET UP
var remote = new Devices.Client.Remote(devices);
remote.listen(8080);

var client = new Devices.Driver.Remote('localhost', 8080);
var peter = new Devices.Device("peter", client);
console.log(peter)
peter.tap(function(result) {
    console.log(result);
});
