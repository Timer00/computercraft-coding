import { checkAndRefuel } from "./checkAndRefuel";
import { forceForward, forcePlaceDown } from "./movement";

// Resulting length of the river -> length * 2 + 1
const [length] = [...$vararg].map(a => parseInt(a));

// Accounting for the traveling needed to pick up & place the water.
const fuelNeeded = 2 * (length * 2 + 1);

for (let i = 1; i < 2; i++) { // Check for water buckets
  const item = turtle.getItemDetail(i) as ItemDetail;
  if (item.name !== "minecraft:water_bucket") { // @ts-ignore
    return print("Ensure the first 2 slots are 2 water buckets.")
  }
}

if (!checkAndRefuel(fuelNeeded, 3)) // @ts-ignore
  return print("More fuel needed on slot 3")

turtle.select(1);
forcePlaceDown();
forceForward(2);
turtle.select(2);
forcePlaceDown();

turtle.select(1);
for (let i = 1; i < length; i++) {
  turtle.back();
  turtle.placeDown(); // pick up water
  forceForward(3);
  forcePlaceDown();
}
