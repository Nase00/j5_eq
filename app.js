const five = require('johnny-five');
const pixel = require('node-pixel');
const board = new five.Board();

const UP = 'UP';
const DOWN = 'DOWN';
const STRIP_LENGTH = 60;
const SENSITIVTY_OFFSET = 2;
const positions = new Array(STRIP_LENGTH).fill(0).map((x, i) => i);

var soundValue = 10;
var fps = 30;
var red = 100;
var green = 0;
var blue = 0;
var blueDirection = UP;
var redDirection = DOWN;

board.on('ready', () => {
  console.log(`Connected to ${board.id}`);

  const mic = new five.Sensor('A0');
  const strip = new pixel.Strip({
    data: 6,
    length: STRIP_LENGTH,
    color_order: pixel.COLOR_ORDER.GRB,
    board: board,
    controller: 'FIRMATA',
  });

  strip.on('ready', () => {
    setInterval(() => {
      strip.color('#000');

      const valuesToLight = soundValue;

      if (blue >= 255) {
        blueDirection = DOWN;
      } else if (blue <= 0) {
        blueDirection = UP;
      }

      if (blueDirection === UP) {
        blue++;
      } else {
        blue--;
      }

      if (red >= 100) {
        redDirection = DOWN;
      } else if (red <= 0) {
        redDirection = UP;
      }

      if (redDirection === UP) {
        red++;
      } else {
        red--;
      }

      const color = `rgb(${red}, ${0}, ${blue})`;

      for (var i = 0; i < positions.length; i++) {
        if (i < valuesToLight) {
          strip.pixel(positions[i]).color(color);
        }
      }

      strip.show();
    }, 1000 / fps);
  });

  mic.on('data', () => {
    soundValue = mic.value - SENSITIVTY_OFFSET;
  });
});
