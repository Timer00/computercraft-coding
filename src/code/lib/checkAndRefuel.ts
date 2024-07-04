// Interface for the fuel values table
interface FuelValues {
  [key: string]: number;
}

// Table mapping items to their fuel values
const fuelValues: FuelValues = {
  "coal": 80,
  "log": 15,
  "planks": 15,
  "stick": 5,
  "blaze_rod": 120,
  "lava_bucket": 1000,
  "sugar_cane": 0,
  "wooden_axe": 10,
  "wooden_hoe": 10,
  "wooden_pickaxe": 10,
  "wooden_shovel": 10,
  "wooden_sword": 10,
  "mushroom": 15,
  // Add more items as needed
};

// Function to get the fuel value of an item in a specific slot
function getFuelValue(slot: number): number {
  const item = turtle.getItemDetail(slot) as ItemDetail;
  if (item) {
    for (const [key, value] of Object.entries(fuelValues)) {
      if (item.name.includes(key)) {
        return value;
      }
    }
  }
  return 0;
}

// Checks if and how much the turtle needs to refuel and returns true if there is enough fuel or false if it can't refuel as much as needed.
export function checkAndRefuel(minMovesNeeded?: number, slot: number = 1): boolean {
  turtle.select(slot);

  const maximumFuelValue = turtle.getFuelLimit();
  const currentFuelValue = turtle.getFuelLevel();

  minMovesNeeded = minMovesNeeded || maximumFuelValue;

  if (currentFuelValue >= minMovesNeeded) {
    print("Fuel is already at required/maximum level.");
    return true; // The turtle will be able to move as much as it can, so no fuel will be consumed
  }

  const itemFuelValue = getFuelValue(slot);
  const itemsTotalFuelValue = itemFuelValue * turtle.getItemCount(slot);

  const totalFuelAfterRefuel = itemsTotalFuelValue + currentFuelValue;

  if (totalFuelAfterRefuel < minMovesNeeded) {
    print(`Not enough fuel provided on slot: ${slot}`);
    print(`Fuel amount missing: ${minMovesNeeded - totalFuelAfterRefuel}`);
    return false;
  }

  const amountItemsToConsume = Math.ceil((minMovesNeeded - currentFuelValue) / itemFuelValue);

  if (amountItemsToConsume < 1) {
    print("There is already more fuel than needed.");
    return true;
  }

  return turtle.refuel(amountItemsToConsume);
}
