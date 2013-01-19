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

findDevice(Math.PI/4,0, 0, 0, 0, 0);
