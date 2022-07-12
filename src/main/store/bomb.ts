import { types } from 'mobx-state-tree';
import { Position } from './position';
import { TPosition } from './types';


const BombStore = types
  .model({
    nextPositions: types.optional(types.array(Position), []), // to message next bomb positions!
    positions: types.optional(types.array(Position), []),
  })
  .actions((self) => ({

    default() {
      this.setNextPositions([]);
      this.setPositions([]);
    },

    setNextPositions(positions: TPosition[]) {
      self.nextPositions.replace(positions);
    },

    setPositions(positions: TPosition[]) {
      self.positions.replace(positions);
    }

  }));


export default BombStore;