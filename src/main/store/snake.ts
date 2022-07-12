import { types } from 'mobx-state-tree';
import _ from 'lodash';
import { Position } from './position';
import { Direction, TPosition } from './types';
import { INITIAL_SNAKE_DIRECTION, INITIAL_SNAKE_POSITION } from '../settings';
import { eatsItselfInNextMove ,changePosition, getLastCellDirection, addNewSnakeCell, move, hasEqualPosition } from './tools';
import GameError from '../errors';


const SnakeStore = types
  .model({
    cells: types.optional(
      types.array(Position),
      INITIAL_SNAKE_POSITION
    ),
    direction: types.optional(
      types.enumeration<Direction>([Direction.Up, Direction.Right, Direction.Down, Direction.Left]),
      INITIAL_SNAKE_DIRECTION
    ),
  })
  .views((self) => ({
    get length() {
      return self.cells.length;
    },

    getHeadPosition() {
      return {...self.cells[0]};
    }
  })).actions((self) => ({

    setDirection(direction: Direction) {
      if (self.length === 1) {
        self.direction = direction;
        return;
      }

      const nextHeadPosition = changePosition(direction, self.getHeadPosition());
      const cellAfterHead = self.cells[1];

      if (_.isEqual(nextHeadPosition, cellAfterHead))
        throw GameError.SnakeImpossibleDirection(direction);

      self.direction = direction;
    },

    addCell() {
      if (self.length === 1) {
        addNewSnakeCell(self.cells, self.direction);
        return;
      }

      const lastCellDirection = getLastCellDirection(self.cells);
      addNewSnakeCell(self.cells, lastCellDirection);
    },

    move(excepts?: TPosition[]) {
      if(eatsItselfInNextMove(self.cells, self.direction))
        throw GameError.SnakeEatsItself();

      const nextSnakePosition = move(self.cells, self.direction);

      if (excepts && hasEqualPosition(nextSnakePosition, excepts))
        throw GameError.SnakeCrush();

      self.cells.replace(nextSnakePosition);
    },

    default() {
      self.cells.replace(INITIAL_SNAKE_POSITION);
      self.direction = INITIAL_SNAKE_DIRECTION;
    },
  }));


export default SnakeStore;