const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  console.log('Connected!');

  const mic = new five.Sensor('A0');
  const leds = new five.Leds([3, 5, 6]);

  mic.on('data', () => {
    const soundValue = mic.value >> 2;

    leds.brightness(soundValue);
  });
});
