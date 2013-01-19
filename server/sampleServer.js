var Devices = require("../lib/device")
var devices = {
    peter : {
        tap : function(options, callback) {
            console.log("I WAS TAPPED");
            callback({ status : 'success'})
        },
        on : function(options, callback) {
            console.log(arguments);
            callback({ status : "success"});
        }
    }
}
//SET UP
var remote = new Devices.Client.Remote(devices);
remote.listen(8080);
