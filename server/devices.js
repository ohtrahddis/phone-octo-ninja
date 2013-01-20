var Device = require('../lib/device')
var pg = new Device.Client.TCP("158.130.104.179", 8080);
var chrome = new Device.Client.Binary(9000);
var dg = new Device.Client.TCP("158.130.102.25", 8080);
var phone = new Device.Client.TCP("158.130.102.25", 8000);
var devices = [
    {
    x: 1,
    y: 0,
    z: 0,
    bucket : 'right',
    id: "lightbulb",
    mappings : {
        "swipe right" : "off",
        "swipe left" : "on"
    },
    driver:pg
},
{
    x: 1,
    y: -1,
    z: 0,
    bucket : 'right',
    id: "servo",
    mappings : {
        "swipe right" : "off",
        "swipe left" : "on"
    },
    driver:pg
}, {
    x: 0.5,
    y: 1,
    z: 0,
    bucket : "front",
    id: "mac",
    mappings : {
        "swipe left" : "swipeLeft",
        "swipe right" : "swipeRight"
    },
    driver: dg,
}, {
    x: -1,
    y: 0,
    z: 0,
    bucket : "left",
    id: "twilio",
    mappings : {
    },
    driver: phone,
}, {
    x: -1,
    y: -1,
    z: 0,
    bucket : "left",
    id: "158.130.102.25",
    mappings : {
      "swipe left" : "barrelRollRight",
      "swipe right" : "skipSong"
    },
    driver: chrome,
},
];
module.exports = devices;
