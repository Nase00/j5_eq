const five = require('johnny-five');
const pixel = require('node-pixel');
const board = new five.Board();

var soundValue = 10;
var fps = 60;
const STRIP_LENGTH = 60;

board.on('ready', function() {
  console.log('Connected!');

  const mic = new five.Sensor('A5');
  console.log("Board ready, lets add light");

  const strip = new pixel.Strip({
    data: 6,
    length: STRIP_LENGTH,
    color_order: pixel.COLOR_ORDER.GRB,
    board: board,
    controller: "FIRMATA",
  });

  strip.on("ready", function() {
    console.log("Strip ready, let's go");

    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    var current_colors = [0,1,2,3,4];
    var positions = new Array(STRIP_LENGTH).fill(0).map((x, i) => i);

    setInterval(function() {
      strip.color("#000"); // blanks it out
      const positionToLight = Math.floor(soundValue / STRIP_LENGTH);

      for (var i = 0; i < positions.length; i++) {
        if (positionToLight <= i) {
          strip.pixel(positions[i]).color("#FF0000");
        }
      }

      strip.show();
    }, 1000 / fps);
  });

  mic.on('data', () => {
    soundValue = mic.value * 5;
  });
});
