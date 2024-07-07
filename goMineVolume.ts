import { checkAndRefuel } from "./checkAndRefuel";
import { mineVolume } from "./mineVolume";

const [width, height, length, goBack] = [...$vararg].map(a => parseInt(a));

// Make sure there is enough fuel to go back
const fuelNeeded = width * height * length + (goBack ? width + length : 0);

if (!checkAndRefuel(fuelNeeded)) // @ts-ignore
  return "More fuel needed"

print(`Will mine width: ${width}, height: ${height}, length: ${length}.`);

print(mineVolume(width, length, height, !!goBack));
