import { forceForward, goBackwards, goDown, Side, turnTimes } from "./movement";
import turnRight = turtle.turnRight;
import dig = turtle.dig;
import forward = turtle.forward;
import digUp = turtle.digUp;
import up = turtle.up;
import turnLeft = turtle.turnLeft;
import digDown = turtle.digDown;
import down = turtle.down;

interface Config {
  goBack?: boolean;
  inVolume?: boolean;
  // When using onDig ensure that the turtle will endup positioned in the same place and facing the same direction as it was.
  onDig?: (x: number, y: number, z: number, width: number, height: number, length: number) => void;
}

export function mineVolume(width: number, length: number, height: number, config?: Config) {

  const { goBack = false, inVolume = false, onDig = (x, y, z) => {print(x, y, z);} } = config;

  // Get the turtle in position
  if (inVolume) {
    turnRight();
  } else {
    forceForward();
    turnRight();
  }

  let [x, y, z] = [1, 1, 1];
  let [vx, vy, vz] = [1, 1, 1];

  // TODO: Try using the old system (with improvements) and keeping track of the coordinates separately instead of in the for loops.
  // TODO: Try approach of real coordinates
  for (z = 1; z < length + 1; z += vz) {
    for (vy === 1 ? y = 1 : y = height; vy === 1 ? y < height + 1 : y > 0; y += vy) {
      for (vx === 1 ? x = 1 : x = width; vx === 1 ? x < width : x > 1; x += vx) {
        onDig(x, y, z, width, height, length);
        forceForward();
      }
      if (z % 2 !== 0) { // mining up
        if (y < height) {
          onDig(x, y, z, width, height, length);
          digUp();
          up();
          vx = -vx;
          turnTimes(Side.left, 2);// Turn 180
        }
      } else { // mining down
        if (y > 1) {
          onDig(x, y, z, width, height, length);
          digDown();
          down();
          vx = -vx;
          turnTimes(Side.left, 2);// Turn 180
        }
      }
    }
    if (z < length) {
      if (z % 2 !== 0) { // turtle is mining up
        y = height;
        onDig(x, y, z, width, height, length);
        (height - 1) % 2 === 0 ? turnLeft() : turnRight();
        dig();
        forward();
        (height - 1) % 2 === 0 ? turnLeft() : turnRight();
        vy = -vy;
        vx = -vx;
      } else { // turtle is mining down
        y = 1;
        onDig(x, y, z, width, height, length);
        turnRight();
        dig();
        forward();
        turnRight();
        vy = -vy;
        vx = -vx;
      }
    }
  }
  onDig(1, 1, z - 1, width, height, length);
}
