function mineArea(width, length): void {
  // length will be in the direction the turtle is facing, and width will be to it's right.

  for (let x = 0; x < width; x++){
    let y = 0;
    for (y = 0; y < length; y++){
      turtle.dig();
      turtle.forward();
    }
    x % 2 === 0 ? turtle.turnRight() : turtle.turnLeft();
    turtle.dig();
    turtle.forward();
    x % 2 === 0 ? turtle.turnRight() : turtle.turnLeft();
    y--;
  }
}

print("What is the width and length to mine?");
const [width, length] = read().split(" ");

print(`Will mine width: ${width}, length: ${length}.`);

mineArea(width, length);
