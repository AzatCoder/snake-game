import { screen } from '@testing-library/react';
import Bomb from './';
import { RenderWithStoreProvider } from '../../test-utils';
import MainStore from '../../store';


describe('component: Bomb', () => {
  it('should render messaging cells quantity by next bomb positions', () => {
    const mockStore = MainStore.create({
      bomb: {
        nextPositions: [
          {x: 1, y: 2},
          {x: 5, y: 2},
          {x: 4, y: 7},
        ]
      }
    });
    RenderWithStoreProvider(<Bomb />, mockStore);

    const bombBox = screen.getByTestId('bomb-box');

    expect(bombBox.childElementCount).toBe(mockStore.bomb.nextPositions.length);
  });

  it('should render bomb cells quantity by bomb positions', () => {
    const mockStore = MainStore.create({
      bomb: {
        positions: [
          {x: 1, y: 2},
          {x: 5, y: 2},
          {x: 4, y: 7},
        ]
      }
    });
    RenderWithStoreProvider(<Bomb />, mockStore);

    const bombBox = screen.getByTestId('bomb-box');

    expect(bombBox.childElementCount).toBe(mockStore.bomb.positions.length);
  });
});