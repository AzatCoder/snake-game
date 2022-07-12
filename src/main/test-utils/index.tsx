import { render } from '@testing-library/react';
import { useProvider } from 'mobx-store-provider';
import React from 'react';
import MainStore from '../store';
import { TStore } from '../store/types';

export const RenderWithStoreProvider = (children: React.ReactNode, store: TStore) => {
  const Provider = useProvider(MainStore);

  return render(
    <Provider value={store}>
      {children}
    </Provider>
  );
}
