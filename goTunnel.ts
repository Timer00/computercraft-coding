import { checkAndRefuel } from "./checkAndRefuel";
import { mineVolume } from "./mineVolume";

const [length] = [...$vararg].map(a => parseInt(a));
const [width, height] = [3, 3];

// Make sure there is enough fuel
const fuelNeeded = width * height * length;

if (!checkAndRefuel(fuelNeeded)) // @ts-ignore
  return "More fuel needed"

print(`Will mine width: ${width}, height: ${height}, length: ${length}.`);

function onDig(x, y, z, width, height, length) {
  print(x, y, z);
  // Wait for keypress to execute next step
  if (typeof os.pullEvent() === "string"){
  //   TODO:
  //   It seems like when the turtle is transitioning in the y axis there is one false report
  //   When the turtle is transitioning in the z axis there is also one false report
  }
}

print(mineVolume(width, length, height, { onDig }));
