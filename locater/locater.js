var deviceCoords = [{
    x: 2,
    y: 3,
    z: 0,
    id: "lightbulb"
  }, {
    x: 0,
    y: 3,
    z: 2,
    id: "computer"
  }, {
    x: 3,
    y: 0,
    z: 2,
    id: "lamp"
  }, {
    x: -2,
    y: 2,
    z: 0,
    id: "thing"
  }
];





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

function testDotProduct() {
  var a = {
    x: 1,
    y: 1,
    z: 1
  };
  var b = {
    x: 1,
    y: 1,
    z: 1
  };
  console.log("(1, 1, 1)dot(1, 1, 1)  = " + Vector.dotProduct(a, b));
  a.x = 10;
  b.y = -3;
  console.log("(10, 1, 1)dot(1, -3, 1) = " + Vector.dotProduct(a, b));
}

function findDevice(phi, theta, tau, gps, coords, coord) {
  var normalVector = {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.sin(phi) * Math.sin(theta),
    z: Math.cos(phi)
  };
  console.log("normal vector:", normalVector);

  var projectedNormalCoords = [];
  for (var i = 0; i < deviceCoords.length; i++) {
    var deviceCoord = deviceCoords[i];
    console.log(deviceCoord);
    projectedNormalCoords[i] = Vector.sub(deviceCoord, Vector.mul(normalVector, Vector.dot(normalVector, deviceCoord)));
    console.log(projectedNormalCoords);
  }

  var zVector = {
    x: 0,
    y: 0,
    z: 1
  };
  planeXVector = Vector.normalize({
    x: normalVector.y,
    y: -normalVector.x,
    z: 0
  });
  planeYVector = Vector.normalize(Vector.sub(zVector, Vector.mul(normalVector, Vector.dot(normalVector, zVector))));

  console.log("planeXVector: ", planeXVector, "planeYVector: ", planeYVector);
  var projectedXYCoords = [];

  for (var i = 0; i < projectedNormalCoords.length; i++) {
    var projectedNormalCoord = projectedNormalCoords[i];
    projectedXYCoords[i] = {
      x: Vector.dot(planeXVector, projectedNormalCoord),
      y: Vector.dot(planeYVector, projectedNormalCoord)
    }
  }
  console.log("Projected xy coords:", projectedXYCoords);

}


//findDevice(Math.PI/4,0, 0, 0, 0, 0);



function findOptimalCoords(realCoords, phoneCoords) {
  var coords = [];
  for (var i = 0; i < realCoords.length; i++) {
    coords[i] = i;
  }
  return helperFindOptimal([], coords, testDeviceData, testPhoneData);
  
}


function evalCoords(curCoords, realCoords, phoneCoords) {
  console.log("evaluating", curCoords);
  var curPhoneCoords = [];
  for (var i = 0; i < curCoords.length; i++) {
    curPhoneCoords[i] = realCoords[curCoords[i]];
  }
  console.log("curphonecoords", curPhoneCoords);
  return heuristicDiff(curPhoneCoords, phoneCoords);
  return curCoords[2] + curCoords[0];
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
  
  for (var i = 0; i < distA.length; i++) {
    distA[i] = distA[i] / scaleA;
    distB[i] = distB[i] / scaleB;
  }

  console.log("Dist A", distA, "distB", distB);

  var distDiff = 0;
  var angleDiff = 0;

  for (var i = 0; i < distA.length; i++) {
    distDiff += Math.pow(distA[i] - distB[i], 2);
    angleDiff += Math.abs(angleTwoPoints(coordsA[i], coordsA[i+1]) - angleTwoPoints(coordsB[i], coordsB[i+1]));
  }
  distDiff = Math.pow(distDiff, .5);
  console.log("Dist diff: ", distDiff, "Angle diff ", angleDiff);
  return distDiff + angleDiff;
  
}

function dist(a, b) {
  return Math.pow(Math.pow(a.x - b.x, 2) + Math.pow(a.y-b.y, 2), .5);
}

function angleTwoPoints(a, b) {
  return Math.atan((b.y - a.y )/ (b.x - a.x));
}

function helperFindOptimal(curCoords, possibleCoords, realCoords, phoneCoords) {
  console.log(phoneCoords);
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

var phoneCoords = [{
    x: 0,
    y: 3,
  }, {
    x: 2,
    y: 3,
  }, {
    x: 3,
    y: 0,
  }
];



//console.log("diff", heuristicDiff([{x: 1, y:2}, {x: 2,y: 3}, {x: 4, y: 7}], [{x: 1,y: 2},{x: 2,y: 3}, {x: 3, y: 5}]));
var testPhoneData = [{
    x: 0,
    y: 0
  }, {
    x: 2,
    y: 3,
  }, {
    x: 5,
    y: 2,
  }
];

var testDeviceData = [{
    x: 0,
    y: 0,
  }, {
    x: 2,
    y: 3,
  }, {
    x: 3,
    y: 0,
  }, {
    x: 5,
    y: 2
  }
];

console.log("Optimal ", findOptimalCoords(testDeviceData, testPhoneData));
