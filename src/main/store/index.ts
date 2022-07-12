import { KeyboardEvent } from 'react';
import { types } from 'mobx-state-tree';
import Sound from '../sound';
import SnakeStore from './snake';
import { Direction } from './types';
import { directionKeys, generateRandomPosition, generateRandomPositions } from './tools';
import FoodStore from './food';
import { TIMEOUT_AFTER_LOSE, fpsByLevel, AMOUNT_OF_BOMB_POSITIONS, BOMB_GENERATION_TIME, BOMB_MESSAGING_TIME, INITIAL_SNAKE_LENGTH} from '../settings';
import BombStore from './bomb';
import Game from './game';
import pauseable from 'pauseable';


const MainStore = types
  .model({
    food: types.optional(FoodStore, {}),
    bomb: types.optional(BombStore, {}),
    snake: types.optional(SnakeStore, {}),
    game: types.optional(Game, {}),
  })
  .views(({ snake }) => ({
    get score() {
      return snake.length - INITIAL_SNAKE_LENGTH;
    }
  }))
  .volatile(self => ({
    timers: pauseable.createGroup(),
  }))
  .actions(({ food, bomb, snake, game, timers }) => ({

    startGame(direction?: Direction) {
      if (!game.pause) return;
      if (direction) this.trySetDirection(direction);

      game.startGame();

      this.startBombGenerationCycle();
      this.startSnakeMoveCycle();
    },

    startSnakeMoveCycle() {
      const cycle = pauseable.setInterval(() => {
        try {
          snake.move(bomb.positions);
          this.eatIfCanEat();
        } catch (e) {
          this.lose();
        }
      }, 1000 / fpsByLevel[game.level]);

      timers.add(cycle);
    },

    startBombGenerationCycle() {
      const cycle = pauseable.setInterval(() => {
        const generatedPositions = generateRandomPositions(
          AMOUNT_OF_BOMB_POSITIONS,
          [...snake.cells, ...food.positions]
        );

        bomb.setPositions([]);
        bomb.setNextPositions(generatedPositions);

        const timeout = pauseable.setTimeout(() => {
          bomb.setNextPositions([]);
          bomb.setPositions(generatedPositions);
        }, BOMB_MESSAGING_TIME);

        timers.add(timeout);
      }, BOMB_GENERATION_TIME);

      timers.add(cycle);
    },

    lose() {
      Sound.playLose();

      const score = snake.length - INITIAL_SNAKE_LENGTH;

      game.setRecordIfNewRecord(score);
      game.lose();
      timers.clear();

      this.loseTimeout();
    },

    loseTimeout() {
      setTimeout(() => {
        if(game.loseTimeout) {
          game.setLoseTimeout(false);
          this.default();
        }
      }, TIMEOUT_AFTER_LOSE);
    },

    toggle() {
      if (game.pause) {
        game.startGame();
        timers.resume();
        return;
      }

      game.stopGame();
      timers.pause();
    },

    eatIfCanEat() {
      if (food.hasFoodIn(snake.getHeadPosition())) {
        this.giveFoodToSnake();
        this.randomlyAddFood();
      };
    },

    trySetDirection(direction: Direction) {
      try {
        snake.setDirection(direction);
      } catch {
        Sound.playImpossiobleMove();
      }
    },

    giveFoodToSnake() {
      snake.addCell();
      food.deleteFood(snake.getHeadPosition());
      Sound.playEat();
    },

    randomlyAddFood() {
      let randomPosition = generateRandomPosition(
        [...snake.cells, ...bomb.positions, ...bomb.nextPositions]
      );

      food.add(randomPosition);
    },

    onKeyDown({ key }: KeyboardEvent) {
      if (game.loseTimeout) {
        game.setLoseTimeout(false);
        this.default();
        return;
      }

      if (key === 'f') return this.default();
      if (key === ' ') return (game.isGameOn
        ? this.toggle()
        : this.startGame()
      );

      const direction = directionKeys[key];

      if (!direction) return;
      if (game.pause) return this.startGame(direction);

      this.trySetDirection(direction);
    },

    default() {
      game.default();
      snake.default();
      food.default();
      bomb.default();
      timers.clear();
    },

  }));


export default MainStore;
