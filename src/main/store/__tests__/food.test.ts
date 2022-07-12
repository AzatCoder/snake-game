import { getSnapshot } from 'mobx-state-tree';
import FoodStore from '../food';
import { INITIAL_FOOD_POSITIONS } from '../../settings';


describe('Store: FoodStore', () => {
  test('create store', () => {
    const store = FoodStore.create();
    const snapshot = getSnapshot(store);
    expect(snapshot).toEqual({positions: INITIAL_FOOD_POSITIONS});
  });

  test('adding new food', () => {
    const store = FoodStore.create({
      positions: []
    });
    
    store.add({x: 12, y: 3});
    const { positions } = getSnapshot(store);

    expect(positions[0]).toEqual({x: 12, y:3});
  });

  test('delete food', () => {
    const store = FoodStore.create({
      positions: [{
        x: 3,
        y: 6,
      }]
    });

    store.deleteFood({x:3, y: 6});
    const { positions } = getSnapshot(store);

    expect(positions).toEqual([]);
  });

  test('check exists food with same position or not', () => {
    const store = FoodStore.create({
      positions: [{
        x: 7,
        y: 9
      }]
    });

    const res = store.hasFoodIn({x: 7, y: 9});

    expect(res).toBe(true);
  });

  test('make default', () => {
    const store = FoodStore.create({
      positions: [{x: 13, y: 6}, {x: 4, y: 2}, {x: 6, y: 3}]
    });

    store.default();
    const { positions } = getSnapshot(store);

    expect(positions).toEqual(INITIAL_FOOD_POSITIONS);
  });
});
