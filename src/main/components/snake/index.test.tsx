import { screen } from '@testing-library/react';
import Snake from './';
import { RenderWithStoreProvider } from '../../test-utils';
import MainStore from '../../store';


describe('component: Snake', () => {
  it(`should render snake cells quantity by snake's length`, () => {
    const mockStore = MainStore.create({
      snake: {
        cells: [
          {x: 1, y: 1},
          {x: 2, y: 1},
          {x: 3, y: 1},
          {x: 4, y: 1},
          {x: 5, y: 1},
        ]
      }
    });
    RenderWithStoreProvider(<Snake />, mockStore);

    const snakeBox = screen.getByTestId('snake-box');

    expect(snakeBox.childElementCount).toBe(mockStore.snake.cells.length);
  });
});
