import styled, { keyframes } from 'styled-components';
import { Box, Cell } from '../../styles';


export const BombBox = styled(Box)`

`;

export const BombCell = styled(Cell)`
  background: #616161;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    font-size: 10px;
    content: '❌';
    color: white;
  }
`;

const nextBombAnimation = keyframes`
  0% { opacity: .1 }
  50% { opacity: 1 }
  100% { opacity: 0.1 }
`

export const BombNextCell = styled(BombCell)`
	animation: ${nextBombAnimation} 3s linear infinite;
`;