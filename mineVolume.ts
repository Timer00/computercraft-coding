import { forceForward, goBackwards, goDown, Side, turnTimes } from "./movement";
import turnRight = turtle.turnRight;
import dig = turtle.dig;
import forward = turtle.forward;
import digUp = turtle.digUp;
import up = turtle.up;
import turnLeft = turtle.turnLeft;
import digDown = turtle.digDown;
import down = turtle.down;

export function mineVolume(width: number, length: number, height: number, goBack = false, inVolume = false) {

  // Get the turtle in position
  if (inVolume) {
    turnRight();
  } else {
    forceForward();
    turnRight();
  }

  let [x, y, z] = [0, 0, 0];

  for (z = 0; z < length; z++) {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width - 1; x++) {
        forceForward()
      }
      if (y !== height - 1) {
        if (z % 2 === 0) {
          digUp();
          up();
        } else {
          digDown();
          down();
        }
        y % 2 === 0 ? turnTimes(Side.right, 2) : turnTimes(Side.left, 2);
      }
    }
    if (z === length - 1) {// last layer -> Go back to initial position
      if (z % 2 === 0) { // turtle has mined up
        if ((height - 1) % 2 === 0) { // turtle is facing right
          if (!goBack) return 'top right'
          goBackwards(width - 1);
          goDown(height - 1);
          turnLeft();
          goBackwards(length);
        } else { // turtle is facing left
          if (!goBack) return 'top left'
          goDown(height - 1);
          turnRight();
          goBackwards(length);
        }
      } else { // turtle has mined down facing left
        if (!goBack) return 'bottom left'
        turnRight();
        goBackwards(length);
      }
      continue;
    }
    if (z % 2 === 0) { // turtle is mining up
      (height - 1) % 2 === 0 ? turnLeft() : turnRight();
      dig();
      forward();
      (height - 1) % 2 === 0 ? turnLeft() : turnRight();
    } else { // turtle is mining down
      turnRight();
      dig();
      forward();
      turnRight();
    }
  }
}
