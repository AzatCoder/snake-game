import { FC, useEffect } from 'react';
import { useStore } from 'mobx-store-provider';
import MainStore from '../../store';
import Snake from '../../components/snake';
import Food from '../../components/food';
import Canvas from '../../components/canvas';
import Header from '../../components/header';
import Bomb from '../../components/bomb';
import { MainPageBox } from './styles';

const MainPage: FC = () => {
	const { onKeyDown } = useStore(MainStore);

  // it works well, never mind about 'ts-ignore'
  useEffect(() => {
    // @ts-ignore:next-line
    document.addEventListener('keydown', onKeyDown);

    return () => {
      // @ts-ignore:next-line
      document.removeEventListener('keydown', onKeyDown);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainPageBox>
      <Header />
      <Canvas />
      <Snake />
      <Food />
      <Bomb />
    </MainPageBox>
  );
}


export default MainPage;