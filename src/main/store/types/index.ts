import { Instance, SnapshotOut } from 'mobx-state-tree';
import { Position } from '../position';
import MainStore from '../';
import SnakeStore from '../snake';


export interface ICell {
  isDark: boolean;
  position: TPosition;
};

export type TPositionObj = {[key: string]: boolean};
export type TPosition = Instance<typeof Position>;
export type TStore = Instance<typeof MainStore>

export interface ISnakeModel extends SnapshotOut<typeof SnakeStore> {};

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
};

export enum Level {
  Hard = 'hard',
  Medium = 'medium',
  Easy = 'easy',
};