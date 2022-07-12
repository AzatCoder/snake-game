import styled from 'styled-components';
import { LENGTH_X, LENGTH_Y } from '../settings';

const cellSize = 22;
const width = LENGTH_X * cellSize;
const height = LENGTH_Y * cellSize;

export const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 104px auto;
  width: ${width}px;
  height: ${height}px;
`;


interface ICell {
  x: number;
  y: number;
}

const getWidthPosition = ({ x }: ICell): number => width * x / LENGTH_X + 1;
const getHeightPosition = ({ y }: ICell): number => height * y / LENGTH_Y - 2;

export const Cell = styled.div.attrs<ICell>(props => ({
  style: {
    left: getWidthPosition(props) + 'px',
    top: getHeightPosition(props) + 'px',
  }
}))`
  width: 20px;
  height: 20px;
  position: absolute;
  display: inline-block;
`;