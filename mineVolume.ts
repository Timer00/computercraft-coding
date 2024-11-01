import { forceForward, goBackwards, goDown, Side, turnTimes } from "./movement";
// Can I simplify these?
import turnRight = turtle.turnRight;
import digUp = turtle.digUp;
import up = turtle.up;
import turnLeft = turtle.turnLeft;
import digDown = turtle.digDown;
import down = turtle.down;
import { TurtleDirection } from "./direction";

interface Config {
  goBack?: boolean;
  inVolume?: boolean;
  // When using onDig ensure that the turtle will endup positioned in the same place and facing the same direction as it was.
  onDig?: (x: number, y: number, z: number, facingDirection: Direction, width: number, height: number, length: number) => void;
}

type Direction = 'left' | 'right' | 'backward' | 'forward';

export function mineVolume(width: number, length: number, height: number, config?: Config) {

  const { goBack = false, inVolume = false, onDig = (x, y, z, direction) => {print(x, y, z, direction);} } = config;

  const directionTracker = new TurtleDirection();

  // Get the turtle in position
  if (inVolume) {
    turnRight();
  } else {
    // Enter volume
    forceForward();
    turnRight();
  }

  directionTracker.turnRight();

  let [x, y, z] = [1, 1, 1];
  let [vx, vy, vz] = [1, 1, 1]; // vectors

  // This could be better since I can then update the coordinates every time the turtle moves without worrying that it will throw it's movement off.
  // Perhaps I can just create like, realX, realY, realZ and then update them every time the turtle moves.
  // Even better, integrate movement AND coordinates into the direction tracker class.
  // TODO: Try using the old system (with improvements) and keeping track of the coordinates separately instead of in the for loops.
  // TODO: Need to finish adding onDig to the proper places.
  for (z = 1; z < length + 1; z += vz) {
    for (vy === 1 ? y = 1 : y = height; vy === 1 ? y < height + 1 : y > 0; y += vy) {
      for (vx === 1 ? x = 1 : x = width; vx === 1 ? x < width : x > 1; x += vx) {
        onDig(x, y, z, directionTracker.direction, width, height, length);
        forceForward();
      }
      if (z % 2 !== 0) { // mining up
        if (y < height) {
          onDig(x, y, z, directionTracker.direction, width, height, length);
          digUp();
          up();
          onDig(x, y+1, z, directionTracker.direction, width, height, length);
          vx = -vx;
          turnTimes(Side.left, 2);// Turn 180
          directionTracker.turnAround();
        }
      } else { // mining down
        if (y > 1) {
          onDig(x, y, z, directionTracker.direction, width, height, length);
          digDown();
          down();
          onDig(x, y-1, z, directionTracker.direction, width, height, length);
          vx = -vx;
          turnTimes(Side.left, 2);// Turn 180
          directionTracker.turnAround();
        }
      }
    }
    if (z < length) {
      if (z % 2 !== 0) { // turtle is mining up
        y = height;
        onDig(x, y, z, directionTracker.direction, width, height, length);
        // TODO: Handle movement within direction tracker class.
        (height - 1) % 2 === 0 ? turnLeft() : turnRight();
        (height - 1) % 2 === 0 ? directionTracker.turnLeft() : directionTracker.turnRight();
        forceForward();
        (height - 1) % 2 === 0 ? turnLeft() : turnRight();
        (height - 1) % 2 === 0 ? directionTracker.turnLeft() : directionTracker.turnRight();
        vy = -vy;
        vx = -vx;
      } else { // turtle is mining down
        y = 1;
        onDig(x, y, z, directionTracker.direction, width, height, length);
        turnRight();
        directionTracker.turnRight();
        forceForward();
        turnRight();
        directionTracker.turnRight();
        vy = -vy;
        vx = -vx;
      }
    }
  }
  if ((z - 1) % 2 === 0) {
    onDig(1, 1, z - 1, directionTracker.direction, width, height, length);
  } else {
    onDig(width, height, z - 1, directionTracker.direction, width, height, length);
  }
}
