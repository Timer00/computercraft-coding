import { checkAndRefuel } from "./checkAndRefuel";
import { mineArea } from "./mineArea";

print("What is the width and length to mine?");
const [width, length] = read().split(" ").map(s => parseInt(s));

// Area to mine plus positioning movements
const fuelNeeded = width * length + width + length + 2;

print("Fueled: ", checkAndRefuel(fuelNeeded))

const currentFuelLevel = turtle.getFuelLevel();

if (currentFuelLevel < fuelNeeded) {
  // @ts-ignore
  return "More fuel needed.";
}

print(`Will mine width: ${width}, length: ${length}.`);

mineArea(width, length);
