import styled from 'styled-components';
import { Box, Cell } from '../../styles';
import { Direction } from '../../store/types';


export const SnakeBox = styled(Box)`

`;

const Snake = styled(Cell)`
  background: #ffffff;
`

export const SnakeCell = styled(Snake)`
  border-radius: 5px;
`;

export interface ISnakeHead {
  direction: Direction;
}

const rotate: {[key in Direction]: number} = {
  'up': 0,
  'right': 90,
  'down': 180,
  'left': 270,
}

export const SnakeEye = styled.div`
  width: 4px;
  height: 4px;
  background: #0fb300;
  margin: 5px 2px;
  border-radius: 100%;
`;

export const SnakeHead = styled(Snake)<ISnakeHead>`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  transform: rotate(${({ direction }) => rotate[direction]}deg)
`;
