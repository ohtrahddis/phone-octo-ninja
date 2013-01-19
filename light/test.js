var Arduino = require("./arduino.js");
var arduino = new Arduino("/dev/ttyACM1", {});
arduino.ready(function() {

    arduino.servo.init(7, function() {
        arduino.servo.turn(0);
    });
    arduino.pin.init(13, function() {
        setInterval(function() {
            arduino.pin.digitalWrite(13, true);
            setTimeout(function() {
                arduino.pin.digitalWrite(13, false);
            }, 500);
        }, 1000);
    });

});
