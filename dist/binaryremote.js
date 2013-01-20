var BinaryRemote = function(ip, port, drivers) {
  var fullAddress = "ws://"+ip+":"+port;
  console.log(fullAddress);
  var client = new BinaryClient(fullAddress);
  client.on('stream', function(stream)  {
    console.log("Stream: ", stream);
    stream.on('data', function(obj) {
      console.log("Obj: ", obj);
      if (!drivers[obj.action]) {
        stream.write(JSON.stringify({
            status : "failure"
        }));
        return;
      }
      drivers[obj.action](obj.options, function(results) {
        stream.write(JSON.stringify(results));
      });
    });
  });
}
//var remote = new BinaryRemote(myIp, myPort, devices);
