import { forceDown, forceForward } from "./movement";
import { checkAndRefuel } from "./checkAndRefuel";

const [height] = [...$vararg].map(a => parseInt(a));

// Make sure there is enough fuel
const fuelNeeded = height * 3 + 1; // the 3 moves of the for loop

if (!checkAndRefuel(fuelNeeded)) // @ts-ignore
  return "More fuel needed"

forceForward()
for (let y = 1; y < height; y++) {
  forceForward();
  forceDown();
}

print("Will mine down ", height, " downstairs");
