import { fireEvent, screen } from '@testing-library/react';
import Header from '.';
import { INITIAL_LEVEL } from '../../settings';
import MainStore from '../../store';
import { TStore } from '../../store/types';
import { RenderWithStoreProvider } from '../../test-utils';


describe('component: Header', () => {
  describe('level button', () => {
    let store;
    let levelButton: HTMLElement;
  
    beforeEach(() => {
      store = MainStore.create();
      // eslint-disable-next-line
      RenderWithStoreProvider(<Header />, store);
      levelButton = screen.getByRole('button');
    });

    it('should render with initial text', () => {
      expect(levelButton.textContent).toBe(INITIAL_LEVEL);
    });

    it('should change text on click', () => {
      const text = levelButton.innerHTML;

      fireEvent.click(levelButton);

      const newText= levelButton.innerHTML;
      expect(text !== newText).toBe(true);
    });
  });

  describe('info bar', () => {
    const score = 15;
    const record = 25;

    const mockStore = {
      score,
      game: {
        record,
        changeLevel() {},
      }
    };

    beforeEach(() => {
      // eslint-disable-next-line
      RenderWithStoreProvider(<Header />, mockStore as TStore);
    });

    it('should show the score', () => {
      const scoreComponent = screen.getByText(/score/i);
      const scoreComponentNumber = Number(
        scoreComponent.textContent?.match(/\d/g)?.join('')
      );

      expect(scoreComponentNumber).toBe(score);
    });

    it('should show the record', () => {
      const recordComponent = screen.getByText(/record/i);
      const recordComponentNumber = Number(
        recordComponent.textContent?.match(/\d/g)?.join('')
      );

      expect(recordComponentNumber).toBe(record);
    });
  });
});
