var Device = require('../lib/device')
var pg = new Device.Client.TCP("158.130.109.151", 8080);
var dg = new Device.Client.Binary(9000);
var devices = [{
    x: -1,
    y: 1,
    z: 0,
    bucket : 'front',
    id: "lightbulb",
    driver:pg
  }, {
    x: 1,
    y: 1,
    z: 0,
    bucket : "left",
    id: "158.130.102.25",
    driver: dg,
  }, {
    x: 1,
    y: -1,
    z: 0,
    bucket : "right",
    id: "video",
    driver: pg,
  }
];
module.exports = devices;
