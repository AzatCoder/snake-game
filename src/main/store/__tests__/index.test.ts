// @ts-nocheck

import MainStore from '../';
import { getSnapshot } from 'mobx-state-tree';
import Sound from '../../sound';


describe('Store: MainStore', () => {
  describe('#onKeyDown', () => {
    const arrowTestCases = [ 
      ['ArrowUp', 'up'],
      ['ArrowRight', 'right'],
      ['ArrowDown', 'down'],
      ['ArrowLeft', 'left'],
    ];

    it.each(arrowTestCases)(
      'should change snake direction when click $p',
      (arrow, expected) => {
        const store = MainStore.create({
          snake: {
            cells: [
              { x: 5, y: 5 }
            ]
          }
        });

        store.onKeyDown({ key: arrow });

        expect(store.snake.direction).toBe(expected);
      }
    );

    it(`should reload the store when click 'f'`, () => {
      const store = MainStore.create({
        snake: {
          cells: [
            { x: 3, y: 3 },
            { x: 4, y: 3 },
            { x: 5, y: 3 },
            { x: 5, y: 4 },
            { x: 5, y: 5 },
          ],
        },
        bomb: {
          positions: [
            { x: 1, y: 1 },
            { x: 5, y: 7 },
          ]
        },
        food: {
          positions: [
            { x: 7, y: 12 },
            { x: 2, y: 14 },
          ]
        },
        game: {
          pause: false,
          isGameOn: true,
        }
      });

      store.onKeyDown({ key: 'f' });

      const storeSnapshot = getSnapshot(store);
      const newStoreSnapshot = getSnapshot(MainStore.create());

      expect(storeSnapshot).toEqual(newStoreSnapshot);
    });

    it (`should pause when click 'space' when game is on`, () => {
      const store = MainStore.create({
        game: {
          pause: false,
          isGameOn: true,
        }
      });

      store.onKeyDown({ key: ' ' });

      const { game: { pause, isGameOn } } = store;

      expect(pause).toBe(true);
      expect(isGameOn).toBe(true);
    });
    
    it (`should resume when click 'space' when game didn't start`, () => {
      const store = MainStore.create({
        game: {
          pause: true,
          isGameOn: false,
        }
      });

      store.onKeyDown({ key: ' ' });

      const { game: { pause, isGameOn } } = store;

      expect(pause).toBe(false);
      expect(isGameOn).toBe(true);
    });
  });

  describe('#eatIfCanEat', () => {
    Sound.playEat = jest.fn();

    it('should add new cell to snake', () => {
      const cells = [
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 7, y: 6 },
      ];
      const store = MainStore.create({
        snake: {
          cells,
        },

        food: {
          positions: [
            cells[0]
          ],
        }
      });

      store.eatIfCanEat();

      expect(cells.length + 1).toBe(store.snake.cells.length);
    });

    it('should generate new food after eating', () => {
      const foodPositions = [
        { x: 5, y: 6 },
      ];
      const store = MainStore.create({
        snake: {
          cells: [
            { x: 5, y: 6 },
            { x: 6, y: 6 },
            { x: 7, y: 6 },
          ]
        },

        food: {
          positions: foodPositions,
        }
      });

      store.eatIfCanEat();

      expect(store.food.positions).not.toEqual(foodPositions);
    });

    it(`shouldn't change store because snake can't eat the food`, () => {
      const store = MainStore.create({
        snake: {
          cells: [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 },
          ]
        },

        food: {
          positions: [
            { x: 2, y: 1 },
          ]
        }
      });

      const oldStoreSnapshot = getSnapshot(store);

      store.eatIfCanEat();

      expect(oldStoreSnapshot).toEqual(getSnapshot(store));
    });
  });
});