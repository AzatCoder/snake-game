import { types } from 'mobx-state-tree';

export const Position = types.model({
  x: types.number,
  y: types.number
});