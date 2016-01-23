const five = require('johnny-five');
const pixel = require('node-pixel');
const board = new five.Board();

var soundValue = 10;
var fps = 30;
const STRIP_LENGTH = 60;
const positions = new Array(STRIP_LENGTH).fill(0).map((x, i) => i);

board.on('ready', () => {
  console.log(`Connected to ${board.id}`);

  const mic = new five.Sensor('A0');
  const strip = new pixel.Strip({
    data: 6,
    length: STRIP_LENGTH,
    color_order: pixel.COLOR_ORDER.RGB,
    board: board,
    controller: 'FIRMATA',
  });

  strip.on('ready', () => {
    // const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white'];
    // const current_colors = [0,1,2,3,4];

    setInterval(() => {
      strip.off();
      // strip.color('#000');

      const valuesToLight = soundValue / 2;

      for (var i = 0; i < positions.length; i++) {
        if (i < valuesToLight) {
console.log(positions[i] + 1)
          strip.pixel(positions[i]).color('#D35147');
        }
      }

      strip.show();
    }, 1000 / fps);
  });

  mic.on('data', () => {
    soundValue = mic.value;
  });
});
