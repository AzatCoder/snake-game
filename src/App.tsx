import { FC } from 'react';
import { useProvider, useCreateStore } from 'mobx-store-provider';
import MainPage from './main/pages/main';
import MainStore from './main/store/index';


const App: FC = () => {
  const appStore = useCreateStore(MainStore);
  const Provider = useProvider(MainStore);

  return (
    <Provider value={appStore}>
      <MainPage />
    </Provider>
  );
}


export default App;
