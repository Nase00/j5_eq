const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  console.log('Connected!');

  const mic = new five.Sensor('A5');
  const ledThree = new five.Led(3);
  const ledFive = new five.Led(5);
  const ledSix = new five.Led(6);

  mic.on('data', () => {
    const soundValue = mic.value * 5;

    ledThree.brightness(soundValue);
    ledFive.brightness(soundValue);
    ledSix.brightness(soundValue);
  });
});
