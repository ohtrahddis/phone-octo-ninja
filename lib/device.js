var TAP = "tap";
var net = require('net');
var bs = require('binaryjs')
var BinaryServer = bs.BinaryServer;

var Device = function(name, driver) {
  this.name = name;
  this.tap = function(callback) {
    driver.action(name, 'tap', {}, callback);
  }
  this.action = function(action, options, callback) {
    if (action == TAP) {
      this.tap(callback);
    } else {
      driver.action(name, action, options, callback);
    }
  }
}
var TCPServer = function(drivers) {
    var server = net.createServer(function(socket){
      socket.on('data', function(data) {
        var obj = JSON.parse(data);
        console.log(obj);
        if (!drivers[obj.name] || !drivers[obj.name][obj.action]) {
          socket.write(JSON.stringify({
              status : "failure"
          }));
          return;
        }
        drivers[obj.name][obj.action](obj.options, function(results) {
            console.log(results);
          socket.write(JSON.stringify(results));
        });
      })
    });
    this.listen = function(port) {
      server.listen(port);
      console.log("Remote listening on %s", port);
    }
}
var TCPClient = function(ip, port) {
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

var BinaryClient = function(p) {
  var clients = {};
  this.action = function(name, action, options, callback) {
    if (clients[name]) {
        for (var client in clients[name]) {
          var obj = {
            name : name,
            action : action,
            options : options
          }
          console.log(obj);
          var stream = clients[name][client].send(obj);
          stream.on('data', function(data) {
            var obj = JSON.parse(data);
            callback(obj);
          })
        }
    }
  }
  var listen = function(port) {
    server = new BinaryServer({ port : port});
    server.on('connection', function(client) {
        var ip = client._socket._socket.remoteAddress;
        var id = client.id;
        if (!clients[ip]) {
          clients[ip] = {};
        }
        clients[ip][id] = client;
        client.on('close', function() {
          delete clients[ip][id];
        })
    });
  }
  listen(p);
}

var client = new BinaryClient(9000);
setInterval(function() {
    client.action('158.130.102.25', "toggleMusic", {}, function(result) {
        console.log(result);
    })
}, 1000);

var LocalClient = function(drivers) {
  this.action = function(name, action, options, callback) {
    drivers[name][action](options, callback);
  }
}
module.exports = {
  Driver : {
    TCP : TCPServer,
  },
  Device : Device,
  Client : {
    TCP : TCPClient,
    Local : LocalClient
  }
}
