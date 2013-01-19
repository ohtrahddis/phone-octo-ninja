var TAP = "tap";
var net = require('net');
var Device = function(name, driver) {
  this.name = name;
  this.tap = function(callback) {
    driver.action(name, 'tap', {}, callback);
  }
  this.action = function(action, options, callback) {
    if (action == TAP) {
      this.tap();
    } else {
      driver.action(name, action, options, callback);
    }
  }
}
var RemoteClient = function(drivers) {
    var server = net.createServer(function(socket){
      socket.on('data', function(data) {
        var obj = JSON.parse(data);
        if (!drivers[obj.name] || !drivers[obj.name][obj.action]) {
          socket.write(JSON.stringify({
              status : "failure"
          }));
          return;
        }
        drivers[obj.name][obj.action](obj.options, function() {
          socket.write(JSON.stringify({
              status : "success"
          }));
        });
      })
    });
    this.listen = function(port) {
      server.listen(port);
      console.log("Remote listening on %s", port);
    }
}
var Remote = function(ip, port) {
  this.action = function(name, action, options, callback) {
    var client = new net.Socket();
    var obj = {
      name : name,
      action : action,
      options : options
    }
    client.connect(port, ip, function() {
      var write = JSON.stringify(obj);
      console.log(write);
      client.write(write);
    })
    client.on('data', function(data) {
      var result = JSON.parse(data);
      client.destroy();
      if (callback)
        callback(result);
    })
  }
}
var LocalClient = function(drivers) {
  this.action = function(name, action, options, callback) {
    drivers[name][action](options, callback);
  }
}
module.exports = {
  Driver : {
      Remote : Remote,
  },
  Device : Device,
  Client : {
    Remote : RemoteClient,
    Local : LocalClient
  }
}
