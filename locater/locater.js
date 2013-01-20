var devices = [{
    x: -1,
    y: 1,
    z: 0,
    bucket : 'front',
    id: "lightbulb"
  }, {
    x: 1,
    y: 1,
    z: 0,
    bucket : "left",
    id: "gerald-mac"
  },
];




var rod = function(v, k, theta) {
    var term1 = Vector.mul(v, Math.cos(theta));
    var kv = {
        x : Vector.dot({
          x : 0,
          y : -(k.z),
          z : k.y
        }, v),
        y : Vector.dot({
          x : k.z,
          y : 0,
          z : -(k.x)

        }, v),
        z : Vector.dot({
          x : -(k.y),
          y : k.x,
          z : 0
        }, v),
    }
    var term2 = Vector.mul(kv, Math.sin(theta))
    var term3 = Vector.mul(Vector.mul(k, Vector.dot(k, v)), 1- Math.cos(theta));
    return Vector.add(term1, Vector.add(term2, term3));
}
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

function transform(orientation, coord) {
  /*var point = coord;
  var axes = {
    x : {
      x : 1,
      y : 0,
      z : 0
    },
    y : {
      x : 0,
      y : 1,
      z : 0
    },
    z : {
      x : 0,
      y : 0,
      z : 1
    }
  }
  var rot, angle;

  rot = axes.x;
  angle = orientation.phi;
  point = rod(point, rot, angle);
  console.log("rotating about", rot, "for", angle);
  var newAxes = {
    x : rod(axes.x, rot, angle),
    y : rod(axes.y, rot, angle),
    z : rod(axes.z, rot, angle)
  }
  axes = newAxes;

  rot = axes.z;
  angle = orientation.theta;
  point = rod(point, rot, angle);
  console.log("rotating about", rot, "for", angle);
  var newAxes = {
    x : rod(axes.x, rot, angle),
    y : rod(axes.y, rot, angle),
    z : rod(axes.z, rot, angle),
  }
  axes = newAxes;

  rot = axes.y;
  angle = orientation.psi;
  point = rod(point, rot, angle);
  console.log("rotating about", rot, "for", angle);
  var newAxes = {
    x : rod(axes.x, rot, angle),
    y : rod(axes.y, rot, angle),
    z : rod(axes.z, rot, angle)
  }
  axes = newAxes;

  return point;*/

  var theta = -orientation.psi;
  var phi = -orientation.phi;
  var psi = orientation.theta;
  var xVec = {
    x : Math.cos(theta)*Math.cos(psi),
    y : (-Math.cos(phi)*Math.sin(psi)+Math.sin(phi)*Math.sin(theta)*Math.cos(psi)),
    z : (Math.sin(phi)*Math.sin(psi)+Math.cos(phi)*Math.sin(theta)*Math.cos(psi))
  }
  var yVec = {
    x : Math.cos(theta)*Math.sin(psi),
    y : (Math.cos(phi)*Math.cos(psi)+Math.sin(phi)*Math.sin(theta)*Math.sin(psi)),
    z : (-Math.sin(phi)*Math.cos(psi)+Math.cos(phi)*Math.sin(theta)*Math.sin(psi))
  }
  var zVec = {
    x : -Math.sin(theta),
    y : Math.sin(phi)*Math.cos(theta),
    z : Math.cos(phi)*Math.cos(theta)
  }
  var dot = {
    x : Vector.dot(xVec, coord),
    y : Vector.dot(yVec, coord),
    z : Vector.dot(zVec, coord),
  }
  return dot;
}
function findDevice(orientation, coords, tapIndex) {
  var theta = -orientation.psi;
  var phi = -orientation.phi;
  var psi = orientation.theta;
  var xVec = {
    x : Math.cos(theta)*Math.cos(psi),
    y : (-Math.cos(phi)*Math.sin(psi)+Math.sin(phi)*Math.sin(theta)*Math.cos(psi)),
    z : (Math.sin(phi)*Math.sin(psi)+Math.cos(phi)*Math.sin(theta)*Math.cos(psi))
  }
  var yVec = {
    x : Math.cos(theta)*Math.sin(psi),
    y : (Math.cos(phi)*Math.cos(psi)+Math.sin(phi)*Math.sin(theta)*Math.sin(psi)),
    z : (-Math.sin(phi)*Math.cos(psi)+Math.cos(phi)*Math.sin(theta)*Math.sin(psi))
  }
  var zVec = {
    x : -Math.sin(theta),
    y : Math.sin(phi)*Math.cos(theta),
    z : Math.cos(phi)*Math.cos(theta)
  }
  var device = coords[tapIndex];
  var dot = {
    x : Vector.dot(xVec, device),
    y : Vector.dot(yVec, device),
    z : Vector.dot(zVec, device),
  }
  var projected = {x : dot.x, y: dot.z}
  return dot;
  //var normalVector = {
    //x: Math.sin(phi) * Math.cos(theta),
    //y: Math.sin(phi) * Math.sin(theta),
    //z: Math.cos(phi)
  //};
  //console.log("normal vector:", normalVector);

  //var projectedNormalCoords = [];
  //for (var i = 0; i < deviceCoords.length; i++) {
    //var deviceCoord = deviceCoords[i];
    //console.log(deviceCoord);
    //projectedNormalCoords[i] = Vector.sub(deviceCoord, Vector.mul(normalVector, Vector.dot(normalVector, deviceCoord)));
    //console.log(projectedNormalCoords);
  //}

  //var zVector = {
    //x: 0,
    //y: 0,
   //z: 1
  //};
  //planeXVector = Vector.normalize({
    //x: normalVector.y,
    //y: -normalVector.x,
    //z: 0
  //});
  //planeYVector = Vector.normalize(Vector.sub(zVector, Vector.mul(normalVector, Vector.dot(normalVector, zVector))));

  //console.log("planeXVector: ", planeXVector, "planeYVector: ", planeYVector);
  //var projectedXYCoords = [];

  //for (var i = 0; i < projectedNormalCoords.length; i++) {
    //var projectedNormalCoord = projectedNormalCoords[i];
    //projectedXYCoords[i] = {
      //x: Vector.dot(planeXVector, projectedNormalCoord),
      //y: Vector.dot(planeYVector, projectedNormalCoord)
    //}
  //}
  //console.log("Projected xy coords:", projectedXYCoords);

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
      y : vector.y
    }
}
exports.convert = convertAxes;
exports.devices = devices;
exports.getPlane = getPlane;
