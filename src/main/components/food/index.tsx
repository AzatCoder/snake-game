import { FC } from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'mobx-store-provider';
import MainStore from '../../store';
import { FoodBox, FoodCell } from './styles';


const Food: FC = () => {
  const { food } = useStore(MainStore);

  const Cells = food.positions.map((pos, idx) => <FoodCell key={idx} {...pos} />);

  return (
    <FoodBox data-testid='food-box'>
      {Cells}
    </FoodBox>
  );
}


export default observer(Food);