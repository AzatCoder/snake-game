import { FC } from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'mobx-store-provider';
import { SnakeBox, SnakeCell, SnakeEye, SnakeHead } from './styles';
import MainStore from '../../store';


const Snake: FC = () => {
  const { snake } = useStore(MainStore);

  const Cells = snake.cells.map((pos, idx) => idx === 0
    ? <SnakeHead key={idx} direction={snake.direction} {...pos} >
        <SnakeEye />
        <SnakeEye />
      </SnakeHead>
    : <SnakeCell key={idx} {...pos} />
  );

  return (
    <SnakeBox data-testid='snake-box'>
      {Cells}
    </SnakeBox>
  );
}


export default observer(Snake);