import _ from 'lodash';
import { FIRST_FROM_BOTTOM, FIRST_FROM_RIGHT, LENGTH_X, LENGTH_Y } from '../../settings';
import { Direction, Level, TPosition, TPositionObj } from '../types';


export const directionKeys: {[key: string]: Direction} = {
  ArrowUp: Direction.Up,
  ArrowRight: Direction.Right,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left
};

const randomPos = (maxX: number, maxY: number): TPosition => ({
  x: _.random(0, maxX),
  y: _.random(0, maxY)
})

export const generateRandomPosition = (
  excepts?: TPosition[] | TPositionObj,
  maxX: number = FIRST_FROM_RIGHT,
  maxY: number = FIRST_FROM_BOTTOM,
): TPosition => {
  if (!excepts) return randomPos(maxX, maxY);

  // hash map makes it faster
  let exceptsObj = (Array.isArray(excepts)
    ? positionsObj(excepts)
    : excepts
  );

  let position = randomPos(maxX, maxY);
  let key = positionKey(position);

  while (exceptsObj[key]) {
    position = randomPos(maxX, maxY);
    key = positionKey(position);
  }

  return position;
}

export const generateRandomPositions = (
  positionsSize: number,
  excepts: TPosition[] = [],
  maxX: number = FIRST_FROM_RIGHT,
  maxY: number = FIRST_FROM_BOTTOM
) => {
  // better use hash map to make it faster
  let exceptsObj = positionsObj(excepts);

  const positions = [];

  for (let k = 0; k < positionsSize; k++) {
    const position = generateRandomPosition(exceptsObj, maxX, maxY);
    const key = positionKey(position);

    positions.push(position);
    exceptsObj[key] = true;
  }

  return positions;
}

const positionKey = ({ x, y }: TPosition) => String(x) + '&' + String(y);

export const positionsObj = (positions: TPosition[]): TPositionObj => {
  let obj: TPositionObj = {};

  positions.forEach((pos) => {
    const key = positionKey(pos);
    obj[key] = true;
  })

  return obj;
}



// snake

export const isOutOfCanvas = (
  position: TPosition,
  lengthX = FIRST_FROM_RIGHT,
  lengthY = FIRST_FROM_BOTTOM
) => {
  if (
    position.x > lengthX ||
    position.x < 0 ||
    position.y > lengthY ||
    position.y < 0
  ) return true;

  return false;
}

export const isOutOfCanvasInNextMove = (direction:Direction, position: TPosition) => {
  const nextPos = {...position};
  changePosition(direction, nextPos);

  return isOutOfCanvas(nextPos);
}

export const changePosition = (direction: Direction, position: TPosition): TPosition => {
  switch(direction) {
    case Direction.Up:
      position.y -= 1;
      return position;
    case Direction.Right:
      position.x += 1;
      return position;
    case Direction.Down:
      position.y += 1;
      return position;
    case Direction.Left:
      position.x -= 1;
      return position;
  }
}

export const changePositionIfOutOfCanvas = (direction: Direction, position: TPosition): TPosition => {
  switch(direction) {
    case Direction.Up:
      position.y = LENGTH_Y - 1;
      return position;
    case Direction.Right:
      position.x = 0;
      return position;
    case Direction.Down:
      position.y = 0;
      return position;
    case Direction.Left:
      position.x = LENGTH_X - 1;
      return position;
  }
}

export const move = (snakePosition: TPosition[], direction: Direction): TPosition[] => {
  // TODO: need refactoring!
  // first change head position
  const tmpSnakePosition = _.cloneDeep(snakePosition);

  const head = tmpSnakePosition[0];
  let prevPosition = {...head};

  if (isOutOfCanvasInNextMove(direction, head)) {
    changePositionIfOutOfCanvas(direction, head);
  } else {
    changePosition(direction, head);
  }

  // other snake positions just follow next to them
  for (let i = 1; i < tmpSnakePosition.length; i++) {
    const { x, y } = prevPosition;
    prevPosition = {...tmpSnakePosition[i]};
    tmpSnakePosition[i].x = x;
    tmpSnakePosition[i].y = y;
  };

  return tmpSnakePosition;
}

export const isOppositeDirections = (x: Direction, y: Direction): boolean => {
  if (x === Direction.Up && y === Direction.Down) return true;
  if (x === Direction.Down && y === Direction.Up) return true;
  if (x === Direction.Right && y === Direction.Left) return true;
  if (x === Direction.Left && y === Direction.Right) return true;

  return false;
}

export const eatsItselfInNextMove = (position: TPosition[], direction: Direction): boolean => {
  const head = {...position[0]};

  if (isOutOfCanvasInNextMove(direction, head)) {
    changePositionIfOutOfCanvas(direction, head);
  }else {
    changePosition(direction, head);
  }

  for (let i = 0; i < position.length - 1; i++) {
    if (_.isEqual(head, position[i])) return true;
  }

  return false;
}

export const hasEqualPosition = (position1: TPosition[], position2: TPosition[]) => {
  // hash map makes it faster
  const snakePositionsObj = positionsObj(position1);
  const exceptPositionsObj = positionsObj(position2);

  for (let key of Object.keys(snakePositionsObj)) {
    if (exceptPositionsObj[key]) return true;
  }

  return false;
}

export const getLastCellDirection = (snakePosition: TPosition[]): Direction => {
  const len = snakePosition.length;

  if (len < 2)
    throw new Error('Snake length is too short');

  const lastCell = snakePosition[len - 1];
  const prevLastCell = snakePosition[len - 2];

  if (lastCell.y < prevLastCell.y) return Direction.Down;
  if (lastCell.y > prevLastCell.y) return Direction.Up;
  if (lastCell.x < prevLastCell.x) return Direction.Right;
  return Direction.Left;
}

export const addNewSnakeCell = (snakePosition: TPosition[], lastCellDirection: Direction) => {
  const lastCellIndex = snakePosition.length - 1;
  const newCell = {...snakePosition[lastCellIndex]};

  switch(lastCellDirection) {
    case Direction.Up:
      newCell.y += 1;
      break;

    case Direction.Right:
      newCell.x -= 1;
      break;

    case Direction.Down:
      newCell.y -= 1;
      break;

    case Direction.Left:
      newCell.x += 1;
      break;
  }

  snakePosition.push(newCell);
}



// main store

export const nextLevel = (levelNow: Level): Level => {
  if (levelNow === Level.Hard) return Level.Easy;
  if (levelNow === Level.Medium) return Level.Hard;

  return Level.Medium;
}