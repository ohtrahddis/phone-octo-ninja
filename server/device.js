var TAP = "tap";
var net = require('socket');
var Device = function(name, driver) {
  this.name = name;
  this.tap = function() {
    driver.action(name, 'tap', {});
  }
  this.action = function(action, options) {
    if (action == TAP) {
      this.tap();
    } else {
      driver.action(name, action, options);
    }
  }
}
var Remote = function(ip, port) {
  this.action = function(name, action, options) {
  }
}
var Local = function(options) {
  this.action = function(name, action, options) {
  }
}
module.exports = {;
  Driver : {
      Remote : Remote,
      Local : Local
  },
  Device : Device
}
