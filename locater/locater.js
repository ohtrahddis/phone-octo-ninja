//var devices = require("../server/devices.js");

var Vector = {
  dot: function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  },

  mul: function(a, mag) {
    return {
      x: a.x * mag,
      y: a.y * mag,
      z: a.z * mag
    }
  },
  add: function(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z
    }
  },
  sub: function(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z
    }
  },
  normalize: function(a) {
    var mag = Math.pow(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2), .5);
    return {
      x: a.x/mag,
      y: a.y/mag,
      z: a.z/mag
    };
  }
}

function findOptimalCoords(realCoords, phoneCoords) {
  if( phoneCoords.length > realCoords.length) {
    console.log("More phone coords than real coords");
    return null;
  }
  var coords = [];
  for (var i = 0; i < realCoords.length; i++) {
    coords[i] = i;
  }
  return helperFindOptimal([], coords, realCoords, phoneCoords);
  
}


function evalCoords(curCoords, realCoords, phoneCoords) {
  var curPhoneCoords = [];
  for (var i = 0; i < curCoords.length; i++) {
    curPhoneCoords[i] = realCoords[curCoords[i]];
  }
  return heuristicDiff(curPhoneCoords, phoneCoords);
}

function heuristicDiff(coordsA, coordsB) {
  var distA = [];
  var distB = [];
  for (var i = 0; i < coordsA.length -1; i++) {
    distA[i] = dist(coordsA[i], coordsA[i+1]);
    distB[i] = dist(coordsB[i], coordsB[i+1]);
  }

  var scaleA = distA[0];
  var scaleB = distB[0];

  if (scaleA == 0) {
    console.log("Scale A is equal to 0");
    scaleA = 1;
  }
  if (scaleB == 0) {
    console.log("Scale B is equal to 0");
    scaleB = 1;
  }


  
  for (var i = 0; i < distA.length; i++) {
    distA[i] = distA[i] / scaleA;
    distB[i] = distB[i] / scaleB;
  }


  var distDiff = 0;
  var angleDiff = 0;

  for (var i = 0; i < distA.length; i++) {
    distDiff += Math.pow(distA[i] - distB[i], 2);
    var angleA = angleTwoPoints(coordsA[i], coordsA[i+1]);
    var angleB = angleTwoPoints(coordsB[i], coordsB[i+1]);
    angleDiff += Math.abs(angleA - angleB);
  }
  distDiff = Math.pow(distDiff, .5);

  return distDiff + angleDiff;
  
}

function dist(a, b) {
  return Math.pow(Math.pow(a.x - b.x, 2) + Math.pow(a.y-b.y, 2), .5);
}

function angleTwoPoints(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function helperFindOptimal(curCoords, possibleCoords, realCoords, phoneCoords) {
  if (curCoords.length == phoneCoords.length) {
    var cost = evalCoords(curCoords, realCoords, phoneCoords);
    return [cost, curCoords];
  } else {
    var min = Number.POSITIVE_INFINITY;
    var bestCoords = null;
    for (var i = 0; i < possibleCoords.length; i++) {
      var newCoords = curCoords.slice(0);
      newCoords.push(possibleCoords[i]);
      var newPossibleCoords = possibleCoords.slice(0);
      newPossibleCoords.splice(i, 1);
      var costAndCoord = helperFindOptimal(newCoords, newPossibleCoords, realCoords, phoneCoords);
      var cost = costAndCoord[0];

      if (bestCoords == null || min > cost) {
        bestCoords = costAndCoord[1];
        min = cost;
      }

    }
    return [min, bestCoords];
  }
}

//findDevice(Math.PI/4,0, 0, 0, 0, 0);
var convertAxes = function(axes, coord) {
  var newCoord = {
    x : Vector.dot(axes.x, coord),
    y : Vector.dot(axes.y, coord),
    z : Vector.dot(axes.z, coord),
  }
  return newCoord;
}
var getPlane = function(vector) {
    return {
      x : vector.x,
      y : vector.z
    }
}

var findDevice = function(devices, phoneData, touched, orientation) {
  var deviceData = [];
  for (var d in devices) {
    var device = devices[d];
    var points = {
      x : device.x,
      y : device.y,
      z : device.z
    }
    var convertAxesOut = convertAxes(orientation.axes, points);
    deviceData[d] = getPlane(convertAxesOut);
  }
  var output = findOptimalCoords(deviceData, phoneData);
  if (output == null) {
    return null;
  }
  var error = output[0];
  var phoneToDevice = output[1];
  console.log(output);
  return devices[phoneToDevice[touched]].id
}

testData = {"orientation":{"psi":-1.5236848592758179,
  "axes":{
    "z":{
      x: 0,
      y: 0,
      z: 1
    },"y":{
      x: 0,
      y: 1,
      z: 0
    },"x":{
      x: 1,
      y: 0,
      z: 0
    }
  } ,"phi":3.799386056261607,"theta":-0.678406878313746}
}


var phoneData = [{
  x: 500,
  y: 500
}, {
  x: 500,
  y: 700,
}, {
  x: 100,
  y: 200
}]

var deviceData = [{
  x: 0,
  y: 0,
  z: 18,
  id: "computer"
}, {
  x: 3,
  y: 0,
  z: 15,
  id: "light"
}]

//console.log(findOptimalCoords(deviceData, phoneData));
console.log(findDevice(deviceData, phoneData, 1, testData.orientation));

exports.convert = convertAxes;
exports.getPlane = getPlane;

exports.findDevice = findDevice;
