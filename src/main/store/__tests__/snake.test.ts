import { getSnapshot } from 'mobx-state-tree';
import GameError from '../../errors';
import { INITIAL_SNAKE_DIRECTION, INITIAL_SNAKE_POSITION, FIRST_FROM_BOTTOM, FIRST_FROM_TOP, FIRST_FROM_LEFT, FIRST_FROM_RIGHT } from '../../settings';
import SnakeStore from '../snake';
import { Direction, TPosition } from '../types';


describe('Store: SnakeStore', () => {
  test('create store', () => {
    const store = SnakeStore.create();

    const snapshot = getSnapshot(store);
    const initialValues = {
      cells: INITIAL_SNAKE_POSITION,
      direction: INITIAL_SNAKE_DIRECTION
    };

    expect(snapshot).toEqual(initialValues);
  });

  describe('#setDirection', () => {
    test('when length is 1 change direction', () => {
      const store = SnakeStore.create({
        direction: Direction.Down,
      });
      store.setDirection(Direction.Up);
  
      const { direction } = getSnapshot(store);
  
      expect(direction).toBe(Direction.Up);
    });
    
    test('when length more than 1, change direction', () => {
      const store = SnakeStore.create({
        cells: [{x: 1, y: 1}, {x: 1, y: 2}],
        direction: Direction.Down,
      });
      store.setDirection(Direction.Right);
  
      const { direction } = getSnapshot(store);
  
      expect(direction).toBe(Direction.Right);
    });
    
    it('should throw exception, when change to opposite direction and length is more than 1', () => {
      const store = SnakeStore.create({
        cells: [{x: 1, y: 1}, {x: 1, y: 2}],
        direction: Direction.Up
      });
  
      expect(() => store.setDirection(Direction.Down)).toThrow();
    });
  });

  describe('#move', () => {
    const cases: [TPosition[], Direction, TPosition[]][] = [
      [
        [{x: 1, y: 1}, {x: 2, y: 1}],
        Direction.Up,
        [{x: 1, y: 0}, {x: 1, y: 1}]
      ],
      [
        [{x: 1, y: 1}, {x: 2, y: 1}],
        Direction.Down,
        [{x: 1, y: 2}, {x: 1, y: 1}]
      ],
      [
        [{x: 1, y: 1}, {x: 2, y: 1}],
        Direction.Right,
        [{x: 2, y: 1}, {x: 1, y: 1}]
      ],
      [
        [{x: 1, y: 1}, {x: 2, y: 1}],
        Direction.Left,
        [{x: 0, y: 1}, {x: 1, y: 1}]
      ],
    ];

    test.each(cases)(
      'should move snake position depending its direction',
      (position, direction, expectedPosition) => {
        const store = SnakeStore.create({
          cells: position,
          direction: direction,
        });

        store.move();
        const snakePosition = getSnapshot(store.cells);

        expect(snakePosition).toEqual(expectedPosition);
      }
    );
    
    const casesInTheEdgeOfCanvas: [TPosition[], Direction, TPosition[]][] = [
      [
        [{x: 1, y: FIRST_FROM_TOP}, {x: 1, y: 1}],
        Direction.Up,
        [{x: 1, y: FIRST_FROM_BOTTOM},{x: 1, y: 0}]
      ],
      [
        [{x: 1, y: FIRST_FROM_BOTTOM}, {x: 2, y: 1}],
        Direction.Down,
        [{x: 1, y: FIRST_FROM_TOP}, {x: 1, y: FIRST_FROM_BOTTOM}]
      ],
      [
        [{x: FIRST_FROM_RIGHT, y: 1}, {x: 2, y: 1}],
        Direction.Right,
        [{x: FIRST_FROM_LEFT, y: 1}, {x: FIRST_FROM_RIGHT, y: 1}]
      ],
      [
        [{x: FIRST_FROM_LEFT, y: 1}, {x: 2, y: 1}],
        Direction.Left,
        [{x: FIRST_FROM_RIGHT, y: 1}, {x: FIRST_FROM_LEFT, y: 1}]
      ],
    ];
    
    test.each(casesInTheEdgeOfCanvas)(
      'test when snake in the edge of canvas',
      (position, direction, expectedPosition) => {
        const store = SnakeStore.create({
          cells: position,
          direction: direction,
        });

        store.move();
        const snakePosition = getSnapshot(store.cells);

        expect(snakePosition).toEqual(expectedPosition);
      }
    );

    const eatingItselfCases: [TPosition[], Direction][] = [
      [
        [{x: 2, y: 2}, {x: 3, y: 2}, {x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}],
        Direction.Up
      ],
      [
        [{x: 2, y: 2}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 2, y: 3}, {x: 1, y: 3}],
        Direction.Down
      ],
      [
        [{x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 3, y: 2}, {x: 3, y: 1}],
        Direction.Right
      ],
      [
        [{x: 2, y: 2}, {x: 2, y: 3}, {x: 1, y: 3}, {x: 1, y: 2}, {x: 1, y: 1}],
        Direction.Left
      ],
    ];

    test.each(eatingItselfCases)(
      'eating itself cases, should throw error',
      (position, direction) => {
        const store = SnakeStore.create({
          cells: position,
          direction: direction,
        });

        expect(store.move).toThrowError(GameError.SnakeEatsItself());
      }
    )
  });
  
});