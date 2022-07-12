import { types } from 'mobx-state-tree';
import SnakeLocalStorage from '../localStorage';
import { nextLevel } from './tools';
import { INITIAL_RECORD, INITIAL_LEVEL } from '../settings';
import { Level } from './types';


const Game = types
  .model({
    isGameOn: types.optional(types.boolean, false),
    pause: types.optional(types.boolean, true),
    loseTimeout: types.optional(types.boolean, false),
    record: types.optional(types.number, INITIAL_RECORD),
    level: types.optional(
      types.enumeration<Level>([Level.Hard, Level.Medium, Level.Easy]),
      INITIAL_LEVEL,
    ),
  })
  .actions(self => ({
    changeLevel() {
      if (self.isGameOn) return;

      const level = nextLevel(self.level);

      self.level = level;
      self.record = SnakeLocalStorage.getRecord(level);
    },

    setRecordIfNewRecord(score: number) {
      if (self.record < score) {
        SnakeLocalStorage.setRecord(self.level, score);
        self.record = score;
      }
    },

    lose() {
      self.pause = true;
      self.isGameOn = false;
      self.loseTimeout = true;
    },

    stopGame() {
      self.pause = true;
    },

    startGame() {
      self.isGameOn = true;
      self.pause = false;
    },

    setLoseTimeout(loseTimeout: boolean) {
      self.loseTimeout = loseTimeout;
    },

    default() {
      self.isGameOn = false;
      self.pause = true;
      self.loseTimeout = false;
    }
  }));


export default Game;