import { goForward } from "./movement";

// Mines an area considering the turtle is facing the xy 00
export function mineArea(width: number, length: number): void {
  // length will be in the direction the turtle is facing, and width will be to it's right.

  let [x, y] = [0, 0];
  for (; x < width; x++) {
    for (; y < length; y++) {
      turtle.dig();
      turtle.forward();
    }
    y = 1;
    if (x < width - 1) { // Before last column
      x % 2 === 0 ? turtle.turnRight() : turtle.turnLeft();
      turtle.dig();
      turtle.forward();
      x % 2 === 0 ? turtle.turnRight() : turtle.turnLeft();
    } else { // Program is done
      if (x % 2 === 0) { // ended on top right corner
        turtle.turnLeft();
        goForward(width - 1);
        turtle.turnLeft();
        goForward(length);
      } else { // ended on bottom right corner
        turtle.turnRight();
        goForward(width - 1);
        turtle.turnLeft();
        turtle.forward();
      }
      turtle.turnRight();
      turtle.turnRight();
      print("Mining complete");
    }
  }
}
