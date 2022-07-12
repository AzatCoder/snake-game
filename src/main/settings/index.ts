import SnakeLocalStorage from '../localStorage';
import { Direction, TPosition, Level, ICell } from '../store/types';


const generatePosition = (lenX: number, lenY: number) => {
  // returns 2d matrix

  const initialPosition: ICell[][] = [];
  for (let y = 0; y < lenY; y++) {
    const row: ICell[] = [];
    for (let x = 0; x < lenX; x++) {
      row.push({
        isDark: (x + y) % 2 === 0,
        position: { x, y },
      });
    }
    initialPosition.push(row);
  }
  return initialPosition;
}


export const LENGTH_X = 30;
export const LENGTH_Y = 20;

export const fpsByLevel: {[key in Level]: number} = {
  hard: 20,
  medium: 15,
  easy: 10,
};
export const INITIAL_SNAKE_DIRECTION = Direction.Up;
export const INITIAL_SNAKE_POSITION: TPosition[] = [
  {x: 1, y: 1},
  {x: 1, y: 2},
  {x: 1, y: 3},
];

export const INITIAL_FOOD_POSITIONS = [{x: 0, y: 0}];

export const AMOUNT_OF_BOMB_POSITIONS = 10;
export const BOMB_GENERATION_TIME = 10000;
export const BOMB_MESSAGING_TIME = 5000;

export const INITIAL_LEVEL = Level.Hard;
export const INITIAL_RECORD = SnakeLocalStorage.getRecord(INITIAL_LEVEL);
export const TIMEOUT_AFTER_LOSE = 3000;
export const initialPosition = generatePosition(LENGTH_X, LENGTH_Y);


// dont change these constants!
export const FIRST_FROM_TOP = 0;
export const FIRST_FROM_RIGHT = LENGTH_X - 1;
export const FIRST_FROM_BOTTOM = LENGTH_Y - 1;
export const FIRST_FROM_LEFT = 0;

export const INITIAL_SNAKE_LENGTH = INITIAL_SNAKE_POSITION.length;
