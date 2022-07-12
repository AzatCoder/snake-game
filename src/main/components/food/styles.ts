import styled, { keyframes } from 'styled-components';
import { Box, Cell } from '../../styles';


export const FoodBox = styled(Box)`

` ;

const cellAnimation = keyframes`
  0% { transform: scale(1.1, 1.1)}
  50% { transform: scale(.6, .6)}
  100% { transform: scale(1.1, 1.1)}
`

export const FoodCell = styled(Cell)`
  background: #ff0077;
  background-size: 200%;
  border-radius: 20px;
	animation: ${cellAnimation} 1s linear infinite;
`;