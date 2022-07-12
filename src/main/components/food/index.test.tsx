import { screen } from '@testing-library/react';
import Food from './';
import { RenderWithStoreProvider } from '../../test-utils';
import MainStore from '../../store';


describe('component: Fod', () => {
  it('should render food cells quantity by food positions', () => {
    const mockStore = MainStore.create({
      food: {
        positions: [
          {x: 1, y: 2},
          {x: 5, y: 2},
          {x: 4, y: 7},
          {x: 6, y: 0},
        ]
      }
    });
    RenderWithStoreProvider(<Food />, mockStore);

    const foodBox = screen.getByTestId('food-box');

    expect(foodBox.childElementCount).toBe(mockStore.food.positions.length);
  });
});