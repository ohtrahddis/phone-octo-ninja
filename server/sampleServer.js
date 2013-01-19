var Devices = require("../lib/device")
var devices = {
    arduino : {
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
var remote = new Devices.Driver.TCP(devices);
remote.listen(8080);
