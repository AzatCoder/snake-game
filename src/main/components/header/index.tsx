import { FC } from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'mobx-store-provider';
import MainStore from '../../store';
import { HeaderBox, ScoreRecord, LevelButton } from './styles';


const Header: FC = () => {
  const { game, score } = useStore(MainStore);

  return (
    <HeaderBox>
      <LevelButton
        onClick={game.changeLevel}
        disabled={!game.pause || game.isGameOn}
      >
        {game.level}
      </LevelButton>
      <div>
        <ScoreRecord>
          Score: {score}
        </ScoreRecord>
        <ScoreRecord>
          Record: {game.record}
        </ScoreRecord>
      </div>
    </HeaderBox>
  );
}


export default observer(Header);