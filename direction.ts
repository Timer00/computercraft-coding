enum Direction {
  Forward = 0,
  Right = 1,
  Backward = 2,
  Left = 3
}

type DirectionString = 'forward' | 'right' | 'backward' | 'left';

// TODO: Integrate this with the movement functions creating a movement system class
// Could contain also the xyz coordinates of the turtle
export class TurtleDirection {
  private _direction: Direction = Direction.Forward;

  get direction(): DirectionString {
    return Direction[this._direction].toLowerCase() as DirectionString;
  }

  turnRight(): void {
    this._direction = (this._direction + 1) % 4;
  }

  turnLeft(): void {
    this._direction = (this._direction - 1 + 4) % 4;
  }

  turnAround(): void {
    this._direction = (this._direction + 2) % 4;
  }

  setDirection(newDirection: DirectionString): void {
    this._direction = Direction[newDirection.charAt(0).toUpperCase() + newDirection.slice(1) as keyof typeof Direction];
  }
}
