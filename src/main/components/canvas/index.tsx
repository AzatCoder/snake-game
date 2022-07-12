import { FC } from 'react';
import { CanvasBox, Cell } from './styles';
import { initialPosition, LENGTH_X } from '../../settings';


const Cells = initialPosition.map(row => 
	row.map(({ isDark }, idx) => <Cell key={idx} isDark={isDark} />)
);


const Canvas: FC = () => {
	return (
		<CanvasBox lengthX={LENGTH_X}>
			{Cells}
		</CanvasBox>
	);
}


export default Canvas;