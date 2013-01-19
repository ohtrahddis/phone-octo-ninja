var BinaryRemote = function(ip, port, drivers) {
  var fullAddress = "ws://"+ip+":"+port;
  var client = new BinaryClient("ws://"+ip+":"+port);
  client.on('stream', function(stream)  {
    stream.on('data', function(data) {
      if (!drivers[obj.name] || !drivers[obj.name][obj.action]) {
        stream.write(JSON.stringify({
            status : "failure"
        }));
        return;
      }
      drivers[obj.name][obj.action](obj.options, function(results) {
        socket.write(JSON.stringify(results));
      });
    });
  });
}
//var remote = new BinaryRemote(myIp, myPort, devices);
