import { types } from 'mobx-state-tree';
import { INITIAL_FOOD_POSITIONS } from '../settings';
import { Position } from './position';
import { TPosition } from './types';


const FoodStore = types
  .model({
    positions: types.optional(
      types.array(Position),
      INITIAL_FOOD_POSITIONS
    )
  })
  .actions((self) => ({

    add(position: TPosition) {
      self.positions.push(position);
    },

    deleteFood(position: TPosition) {
      for (let i = 0; i < self.positions.length; i++) {
        const { x, y } = self.positions[i];

        if (x === position.x && y === position.y) {
          self.positions.splice(i, 1);
          return;
        }
      }
    },

    hasFoodIn(position: TPosition) {
      return self.positions.some(({ x, y }) => position.x === x && position.y === y);
    },

    default() {
      self.positions.replace(INITIAL_FOOD_POSITIONS);
    },

  }));


export default FoodStore;