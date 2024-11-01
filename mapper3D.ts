import { forceForward, forcePlace } from "./movement";

type Map = Array<Array<string>>;

type Position = [number, number]

// bottom left is x 0 z 0
const blockMap: Map = [
  ['0', '1', '0', '1', '0'],
  ['0', '1', '0', '1', '0'],
  ['0', '1', '0', '1', '0'],
  ['1', '1', '0', '1', '1'],
  ['0', '0', '0', '0', '0'],
  ['1', '1', '0', '1', '1'],
  ['0', '1', '0', '1', '0'],
  ['0', '1', '0', '1', '0'],
  ['0', '1', '0', '1', '0'],
];//          x  -> starting position in the middle of the array

function checkAhead(blockMap: Map, currentPos: Position): string | undefined {
  return blockMap[currentPos[0]][currentPos[1] + 1];
}

function checkLeft(blockMap: Map, currentPos: Position): string | undefined {
  return blockMap[currentPos[0] - 1][currentPos[1]];
}

// startingPos =>
function traverse(blockMap: Map, startingPos: [number, number]) {
  let numOfBlocksToPlace = blockMap.flat(3).filter(v => v === '1').length;

  let currentPosition = startingPos;
  while (numOfBlocksToPlace > 0) {
    if (checkLeft(blockMap, currentPosition) === '1') {
      turtle.turnLeft();
      forcePlace();

      numOfBlocksToPlace--;
      turtle.turnRight();
    }

    if (checkAhead(blockMap, currentPosition) === '0') {
      forceForward();
      currentPosition = [currentPosition[0], currentPosition[1] + 1];
    } else {
      turtle.turnRight();
    }
  }


  for (let col = blockMap.length; col > 0; col--) {

  }
}

traverse(blockMap, [2, 0]);
