var serialport = require('serialport');
var Serial = serialport.SerialPort;

var TERMINATOR = "\0";

var Packet = function() {
  this.serialize = function() {
    return JSON.stringify(this);
  }
}
Packet.deserialize = function(serial) {
  return JSON.parse(serial);
}

var init = function(port, options) {
  var serial = new Serial(port, {
    parser: serialport.parsers.readline(TERMINATOR)
  });
  var transport = new Transporter(serial, 10);
  var arduino = new Arduino(transport);

  return arduino;
}

var Arduino = function(transport) {
    var onReady;
    this.ready = function(callback) {
        onReady = callback;
    }
    this.trigger = function() {
        onReady();
    }
    this.servo = {
        init : function(pin, callback) {
            transport.send("initServo"+pin, callback);
        },
        turn : function(angle, callback) {
            transport.send("servo"+angle, callback);
        }
    }
    this.pin = {
        init : function(pin, callback) {
            transport.send("initOutput"+pin, callback);
        },
        digitalWrite : function(pin, high, callback) {
            if (high) {
                transport.send("writeHigh"+pin, callback);
            } else {
                transport.send("writeLow"+pin, callback);
            }
        },
        analogWrite : function(pin, amount, callback) {
            transport.send("writeA"+pin+","+amount, callback);
        },
    }
    setTimeout(this.trigger, 2000);
}


var Transporter = function(serial, size) {
    var size = size;

    var data = [];

    var sequence = 0;

    var waiting = false;
    var received = 0;
    var timeout;
    var length;
    var count;
    var offset;

    var transmitting = false;

    var queue = [];

    var self = this;

    var callback;

    serial.on('data', function(data) {
        received++;
        var d = data.toString('ascii').split(":");
        var seqnum = parseInt(d[1]);
        if (!isNaN(seqnum)) {
            sequence = seqnum;
            if (sequence == length) {
                clearTimeout(timeout);
                fin();
            } else {
                if (received == size) {
                    clearTimeout(timeout);
                    pack();
                } else {
                    clearTimeout(timeout);
                    timeout = setTimeout(pack, 500);
                }
            }
        } else {
            console.log(data)
            transmitting = false;
            sequence = 0;
            received = 0;
            temp = callback;
            if (queue.length > 0) {
                item = queue.pop();
                self.send(item[0], item[1]);
            }
            if (temp) {
                temp();
            }
        }
    });

    var fin = function() {
        var send = "-1:\0"
        //console.log("Fin:", send);
        serial.write(send);
    }
    var pack = function() {
        if (length - sequence < size) {
            window = data.slice(sequence, length);
        } else {
            window = data.slice(sequence, sequence + size);
        }

        received = 0;
        var tempSeq = sequence;
        for (var i = 0; i < window.length; i++) {
            var send = tempSeq+":"+window[i]+"\0";
            //console.log("Sending:", send);
            serial.write(send);
            tempSeq++;
        }
    }

    this.send = function(str, cb) {
        if (transmitting) {
            queue.unshift([str, cb]);
        } else {
            callback = cb;
            length = str.length;
            offset = sequence;
            data = str.split("");
            pack();
            transmitting = true;
        }

    }
}

module.exports = init;
module.exports = init;
