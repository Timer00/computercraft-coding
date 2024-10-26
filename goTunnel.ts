import { checkAndRefuel } from "./checkAndRefuel";
import { DirectionString } from "./direction";
import { mineVolume } from "./mineVolume";
import { forcePlaceDown } from "./movement";

const [length] = [...$vararg].map(a => parseInt(a));
const [width, height] = [3, 3];

// Make sure there is enough fuel
const fuelNeeded = width * height * length;

if (!checkAndRefuel(fuelNeeded)) // @ts-ignore
  return "More fuel needed"

print(`Will mine width: ${width}, height: ${height}, length: ${length}.`);

// function onDig(x: number, y: number, z: number, direction: DirectionString, width: number, height: number, length: number) {
//   print(x, y, z, direction);
//   // Wait for keypress to execute next step
//   if (typeof os.pullEvent() === "string"){
//   //   TODO:
//   //   It seems like when the turtle is transitioning in the y axis there is one false report
//   //   When the turtle is transitioning in the z axis there is also one false report
//   }
// }

function onDig(x: number, y: number, z: number, direction: DirectionString, width: number, height: number, length: number) {
  const isOnWall = x === 1 || x === width;
  const isOnMiddleOfWall = y === height;
  const shouldPlaceTorch = z % 5 === 0 || z === 1;

  if (isOnWall && isOnMiddleOfWall && shouldPlaceTorch) {
    const torchSlot = 2; // Assuming torches are in slot 2
    turtle.select(torchSlot);

    print(direction);
    // Check if the turtle is facing the correct direction
    if ((x === 1 && direction === "left") || (x === width && direction === "right")) {
      // Place the torch
      forcePlaceDown();
    }
  }
}

print(mineVolume(width, length, height, { onDig }));
