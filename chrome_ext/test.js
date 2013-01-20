
var barrelRollStyle = $('<style>.barrel_roll_left {-webkit-transition: -webkit-transform 3s ease;-webkit-transform: rotate(-360deg);'+
  '-moz-transition: -moz-transform 3s ease; -moz-transform: rotate(360deg); -o-transition: -o-transform 4s ease;'+
  '-o-transform: rotate(360deg);transition: transform 3s ease;transform: rotate(360deg);} </style>');
$('html > head').append(barrelRollStyle);

var barrelRollStyle = $('<style>.barrel_roll_right {-webkit-transition: -webkit-transform 3s ease;-webkit-transform: rotate(360deg);'+
  '-moz-transition: -moz-transform 3s ease; -moz-transform: rotate(360deg); -o-transition: -o-transform 4s ease;'+
  '-o-transform: rotate(360deg);transition: transform 3s ease;transform: rotate(360deg);} </style>');

$('html > head').append(barrelRollStyle);

function barrelRollLeft(option, callback) {
  console.log("doing barrel roll left");
  $('body').addClass('barrel_roll_left');
  setTimeout(function() {
    $('body').removeClass('barrel_roll_left')
  }, 4000);
  setTimeout(function() {
    updateFrame();
  }, 3600);
  callback({status: "success"});
}


function barrelRollRight(option, callback) {
  $('body').addClass('barrel_roll_right');
  setTimeout(function() {
    $('body').removeClass('barrel_roll_right')
  }, 4000);
  setTimeout(function() {
    updateFrame();
  }, 3600);
  callback({status: "success"});
}

function playMusic(option, callback) {
  if (window.location.origin.indexOf("pandora.com") != -1) {
    if ($(".playButton").css("display") == "block") {
      $(".playButton").click();
    } else {
      callback({status: "failure"});
      console.log("Song is already playing");
      return;
    }
  }
  callback({status: "success"});
}

function pauseMusic(option, callback) {
  if (window.location.origin.indexOf("pandora.com") != -1) {
    if ($(".pauseButton").css("display") == "block") {
      $(".pauseButton").click();
    } else {
      callback({status: "failure"});
      console.log("Song is already paused");
      return;
    }
  }
  callback({status: "success"});
}

function toggleMusic(option, callback) {
  if (window.location.origin.indexOf("pandora.com") != -1) {
    if ($(".pauseButton").css("display") == "block") {
      $(".pauseButton").click();
    } else {
      $(".playButton").click();
    }
  }
  callback({status: "success"});
}

function testPausePlayMusic() {
  setTimeout(pauseMusic, 7000);
  setTimeout(pauseMusic, 8000);
  setTimeout(playMusic, 9000);
  setTimeout(playMusic, 10000);
  setTimeout(pauseMusic, 11000);
  setTimeout(playMusic, 13000);
}

function testToggleMusic() {
  setTimeout(toggleMusic, 3000);
  setTimeout(toggleMusic, 7000);
  setTimeout(toggleMusic, 8000);
  setTimeout(toggleMusic, 11000);
}



var devices = {
  barrelRollLeft: barrelRollLeft,
  barrelRollRight: barrelRollRight,
  pauseMusic: pauseMusic,
  playMusic: playMusic,
  toggleMusic: toggleMusic,
  tap: toggleMusic
};
console.log("HI");

var remote = new BinaryRemote("158.130.107.60", 9000, devices);
