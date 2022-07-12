import styled, { keyframes } from 'styled-components';

interface ICanvasBoxProps {
  lengthX: number;
}

export interface ICellProps {
  isDark: boolean;
}

const animation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const CanvasBox = styled.div<ICanvasBoxProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin:100px auto;
  padding: 1px;
  border-radius: 5px;
	background: linear-gradient(-45deg, #23f108, #28c22f, #23d58b, #23d5ab);
	background-size: 400% 400%;
  box-shadow: 0 10px 25px 5px rgba(0,0,0,.3);
  width: max-content;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(${props => props.lengthX}, auto);
	animation: ${animation} 6s linear infinite;
`;


export const Cell = styled.div<ICellProps>`
  border-radius: 2px;
  width: 20px;
  height: 20px;
  margin: 1px;
  background: ${props => (props.isDark
    ? `rgba(255, 255, 255, 0.2)`
    : `rgba(255, 255, 255, 0.4)`
  )};
`;