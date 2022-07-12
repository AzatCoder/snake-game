import styled from 'styled-components';


export const HeaderBox = styled.div`
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: 25px auto;
  width: 600px;
  display: flex;
  row-gap: 5px;
  justify-content: space-between;
`;

export const ScoreRecord = styled.h2`
  font-family: monospace;
  display: inline;
  margin: 0 20px;
  color: #5f5f5f;
`;

export const LevelButton = styled.button`
  font-family: sans-serif;
  font-size: 17px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 8px 1px rgba(0, 0, 0, .1);
  color: white;
  background: #d129ff;
  transition: .2s;

  &:hover {
    background: #d642ff;
  }
  
  &:active {
    transform: scale(.95);
  }

  &:disabled {
    transform: none;
    color: #8a8a8a;
    background: #b0b0b0;
  }
`