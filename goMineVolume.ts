import { checkAndRefuel } from "./checkAndRefuel";
import { mineVolume } from "./mineVolume";

const [width, height, length] = [...$vararg].map(a => parseInt(a));

const fuelNeeded = width * height * length;

print("Fueled: ", checkAndRefuel(fuelNeeded))

const currentFuelLevel = turtle.getFuelLevel();

if (currentFuelLevel < fuelNeeded) {
  // @ts-ignore
  return "More fuel needed.";
}

print(`Will mine width: ${width}, height: ${height}, length: ${length}.`);

mineVolume(width, length, height);
