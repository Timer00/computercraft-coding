import { checkAndRefuel } from "./checkAndRefuel";
import { DirectionString } from "./direction";
import { mineVolume } from "./mineVolume";
import { forcePlace, forcePlaceDown } from "./movement";

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
//   //   Gotta double check if this still happens.
//   }
// }


function onDig(x: number, y: number, z: number, direction: DirectionString, width: number, height: number, length: number) {
  const isOnWall = x === 1 || x === width;
  const isOnGround = y === 1;
  const isOnTopLayer = y === height;
  print(z);
  const shouldPlaceTorch = (z - 1) % 4 === 0;

  // Ensure ground to walk on
  if (isOnGround) {
    const isDownSolid = turtle.detectDown();
    if (!isDownSolid) {
      // TODO: Create a utility function to findAndSelectBlocks() - can take an array of blocks to check for and select the first one it finds in order of preference.
      const cobblestoneSlot = 3; // Assuming cobblestone is in slot 3
      turtle.select(cobblestoneSlot);
      forcePlaceDown();
    }
  }

  // Ensure wall for torches and place torches
  if (isOnWall) {
    const wallMaterialSlot = 4; // Assuming wall material is in slot 4
    turtle.select(wallMaterialSlot);

    // Check if the turtle is facing the correct direction
    if ((x === 1 && direction === "left") || (x === width && direction === "right")) {
      const isWallSolid = turtle.detect();
      // Place wall material
      if (y > 1 && y < height && !isWallSolid && shouldPlaceTorch) {
        forcePlace();
      }

      // Place torch if conditions are met
      if (isOnTopLayer && shouldPlaceTorch) {
        const torchSlot = 2; // Assuming torches are in slot 2
        turtle.select(torchSlot);
        forcePlaceDown();
      }
    }
  }
}

print(mineVolume(width, length, height, { onDig }));
