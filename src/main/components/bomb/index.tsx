import { FC } from 'react';
import { useStore } from 'mobx-store-provider';
import { observer } from 'mobx-react';
import MainStore from '../../store';
import { BombBox, BombCell, BombNextCell } from './styles';


const Bomb: FC = () => {
  const { bomb } = useStore(MainStore);

  const NextCells = bomb.nextPositions.map((pos, idx) => <BombNextCell key={idx} {...pos} />);
  const Cells = bomb.positions.map((pos, idx) => <BombCell key={idx} {...pos} />);

  return (
    <BombBox data-testid='bomb-box'>
      {NextCells}
      {Cells}
    </BombBox>
  );
}

export default observer(Bomb);