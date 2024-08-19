export function forceForward(blocks: number = 1) {
  for (let i = 0; i < blocks; i++) {
    let wentForward = false;
    while (!wentForward) {
      turtle.dig();
      wentForward = turtle.forward();
    }
  }
}

export function forceDown(blocks: number = 1) {
  for (let i = 0; i < blocks; i++) {
    let went = false;
    while (!went) {
      turtle.digDown();
      went = turtle.down();
    }
  }
}

export function forcePlaceDown(){
  turtle.digDown(); // Ensure block under is free.
  turtle.placeDown();
}

export function goForward(blocks: number) {
  for (let i = 0; i < blocks; i++) {
    turtle.forward();
  }
}

export function goBackwards(blocks: number) {
  for (let i = 0; i < blocks; i++) {
    turtle.back();
  }
}

export function goDown(blocks: number) {
  for (let i = 0; i < blocks; i++) {
    turtle.down();
  }
}

export enum Side {
  left = 1,
  right = 0
}

export function turnTimes(side: Side, times: number) {
  for (let i = 0; i < times; i++) {
    side ? turtle.turnLeft() : turtle.turnRight()
  }
}
