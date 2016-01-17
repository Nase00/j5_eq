const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
  console.log("Connected!");

  const mic = new five.Sensor("A0");
  const leds = new five.Leds([5, 6, 9]);

mic.on("data", function() {
    const soundValue = this.value * 5;

    leds.fade(soundValue, 200);
  });
});
