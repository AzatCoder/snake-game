import {
  changePosition,
  changePositionIfOutOfCanvas,
  isOppositeDirections,
  eatsItselfInNextMove,
  getLastCellDirection,
  positionsObj,
  hasEqualPosition,
  move,
} from '../tools';
import { FIRST_FROM_TOP, FIRST_FROM_RIGHT, FIRST_FROM_BOTTOM, FIRST_FROM_LEFT } from '../../settings';
import { Direction, TPosition } from '../types';


describe(`function: 'changePosition'`, () => {
  const changePositionCases: {[key in Direction]: [Direction, TPosition, TPosition][]} = {
    up: [
      [Direction.Up, {x: 1, y:1}, {x: 1, y: 0}],
      [Direction.Up, {x: 15, y:23}, {x: 15, y: 22}],
      [Direction.Up, {x: 62, y:44}, {x: 62, y: 43}],
    ],
    right: [
      [Direction.Right, {x: 1, y:1}, {x: 2, y: 1}],
      [Direction.Right, {x: 15, y:23}, {x: 16, y: 23}],
      [Direction.Right, {x: 62, y:44}, {x: 63, y: 44}],
    ],
    down: [
      [Direction.Down, {x: 1, y:1}, {x: 1, y: 2}],
      [Direction.Down, {x: 15, y:23}, {x: 15, y: 24}],
      [Direction.Down, {x: 62, y:44}, {x: 62, y: 45}],
    ],
    left: [
      [Direction.Left, {x: 1, y:1}, {x: 0, y: 1}],
      [Direction.Left, {x: 15, y:23}, {x: 14, y: 23}],
      [Direction.Left, {x: 62, y:44}, {x: 61, y: 44}],
    ],
  };
  test.each(changePositionCases.up)(
    'Should move UP position :: 2d matrix. Given (%p, %p), should be %p',
    (direction, position, expectedPosition) => {
      const res = changePosition(direction, {...position});
      expect(res).toEqual(expectedPosition);
    }
  );

  test.each(changePositionCases.right)(
    'Should move RIGHT position :: 2d matrix. Given (%p, %p), should be %p',
    (direction, position, expectedPosition) => {
      const res = changePosition(direction, {...position});
      expect(res).toEqual(expectedPosition);
    }
  );

  test.each(changePositionCases.down)(
    'Should move DOWN position :: 2d matrix. Given (%p, %p), should be %p',
    (direction, position, expectedPosition) => {
      const res = changePosition(direction, {...position});
      expect(res).toEqual(expectedPosition);
    }
  );

  test.each(changePositionCases.left)(
    'Should move LEFT position :: 2d matrix. Given (%p, %p), should be %p',
    (direction, position, expectedPosition) => {
      const res = changePosition(direction, {...position});
      expect(res).toEqual(expectedPosition);
    }
  );
});



describe(`function: 'changePositionIfOutOfCanvas'`, () => {
  it('should start from BOTTOM when position in the TOP edge and next move is UP :: 2d matrix', () => {
    const position = {x: 0, y: FIRST_FROM_TOP};
    const res = changePositionIfOutOfCanvas(Direction.Up, position);

    const expectRes = {x: 0, y: FIRST_FROM_BOTTOM};

    expect(res).toEqual(expectRes);
  });

  it('should start from LEFT when position in the RIGHT edge and next move is RIGHT :: 2d matrix', () => {
    const position = {x: FIRST_FROM_RIGHT, y: 0};
    const res = changePositionIfOutOfCanvas(Direction.Right, position);

    const expectRes = {x: FIRST_FROM_LEFT, y: 0};

    expect(res).toEqual(expectRes);
  });

  it('should start from TOP when position in the BOTTOM and next move is DOWN :: 2d matrix', () => {
    const position = {x: 0, y: FIRST_FROM_BOTTOM};
    const res = changePositionIfOutOfCanvas(Direction.Down, position);

    const expectRes = {x: 0, y: FIRST_FROM_TOP};

    expect(res).toEqual(expectRes);
  });

  it('should start from RIGHT when position in the LEFT edge and next move is LEFT :: 2d matrix', () => {
    const position = {x: FIRST_FROM_LEFT, y: 0};
    const res = changePositionIfOutOfCanvas(Direction.Left, position);

    const expectRes = {x: FIRST_FROM_RIGHT, y: 0};

    expect(res).toEqual(expectRes);
  });
});


const isOppositeDirectionsCases: [Direction, Direction, boolean][] = [
  [Direction.Up, Direction.Down, true],
  [Direction.Down, Direction.Up, true],
  [Direction.Right, Direction.Left, true],
  [Direction.Left, Direction.Right, true],
];

describe(`function: 'isOppositeDirections'`, () => {
  test.each(isOppositeDirectionsCases)(
    'should return true because directions are opposite to each other. Given %p and %p',
    (a, b, expectedRes) => {
      const res = isOppositeDirections(a, b);
      expect(res).toBe(expectedRes);
    }
  );
});


describe(`function: 'eatsItselfInNextMove'`, () => {
  const trueCases: [TPosition[], Direction, boolean][] = [
    // eats last cell
    [[{x: 10, y: 10}, {x: 10, y: 9}, {x: 11, y: 9}, {x: 11, y: 10}, {x: 11, y: 11}], Direction.Right, true],
    [[{x: 10, y: 10}, {x: 10, y: 9}, {x: 9, y: 9}, {x: 9, y: 10}, {x: 9, y: 11}], Direction.Left, true],
    [[{x: 10, y: 10}, {x: 9, y: 10}, {x: 9, y: 9}, {x: 10, y: 9}, {x: 11, y: 9}], Direction.Up, true],
    [[{x: 10, y: 10}, {x: 9, y: 10}, {x: 9, y: 11}, {x: 10, y: 11}, {x: 11, y: 11}], Direction.Down, true],
  ];
  test.each(trueCases)(
    'should return true because snake eats itself in next move. (%o, %s)',
    (position, direction, expectedRes) => {
      const res = eatsItselfInNextMove(position, direction);
      expect(res).toBe(expectedRes);
    }
  );

  const falseCases: [TPosition[], Direction, boolean][] = [
    // can't eat any cell
    [[{x: 10, y: 10}, {x: 10, y: 9}, {x: 11, y: 9}, {x: 11, y: 10}], Direction.Right, false],
    [[{x: 10, y: 10}, {x: 10, y: 9}, {x: 9, y: 9}, {x: 9, y: 10}], Direction.Left, false],
    [[{x: 10, y: 10}, {x: 9, y: 10}, {x: 9, y: 9}, {x: 10, y: 9}], Direction.Up, false],
    [[{x: 10, y: 10}, {x: 9, y: 10}, {x: 9, y: 11}, {x: 10, y: 11}], Direction.Down, false],
  ];

  test.each(falseCases)(
    'should return false because snake donesnt eat himself in next move. (%o, %s)',
    (position, direction, expectedRes) => {
      const res = eatsItselfInNextMove(position, direction);
      expect(res).toBe(expectedRes);
    }
  );
});


describe(`function: 'getLastCellDirection'`, () => {
  const cases: [TPosition[], Direction][] = [
    [[{x: 2, y: 2}, {x: 2, y: 3}], Direction.Up],
    [[{x: 2, y: 2}, {x: 2, y: 1}], Direction.Down],
    [[{x: 2, y: 2}, {x: 1, y: 2}], Direction.Right],
    [[{x: 2, y: 2}, {x: 3, y: 2}], Direction.Left],
  ];

  test.each(cases)(
    'when given %o, should return %s',
    (snakePosition, expectedDirection) => {
      const direction = getLastCellDirection(snakePosition);
      expect(direction).toBe(expectedDirection);
    }
  );
});

describe(`function: 'hasEqualPosition'`, () => {
  it('should return true if positions has more than one equal position', () => {
    const pos1 = [{ x: 1, y: 1 }, { x: 3, y: 4 }];
    const pos2 = [{ x: 1, y: 5 }, { x: 3, y: 4 }];
    const res = hasEqualPosition(pos1, pos2);

    expect(res).toBe(true);
  })
})


describe(`function: positionObj`, () => {
  it('should return object with position keys', () => {
    const positions = [
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 3, y: 4},
      {x: 4, y: 6},
    ];

    const res = positionsObj(positions);
    const expected = {
      '1&1': true,
      '2&1': true,
      '3&4': true,
      '4&6': true,
    }
    expect(res).toEqual(expected);
  })
});


describe(`function: 'move'`, () => {
  const cases: [TPosition[], Direction, TPosition[]][] = [
    [
      [{x: 1, y: 1}, {x: 2, y: 1}],
      Direction.Up,
      [{x: 1, y: 0}, {x: 1, y: 1}]
    ],
    [
      [{x: 1, y: 1}, {x: 2, y: 1}],
      Direction.Down,
      [{x: 1, y: 2}, {x: 1, y: 1}]
    ],
    [
      [{x: 1, y: 1}, {x: 2, y: 1}],
      Direction.Right,
      [{x: 2, y: 1}, {x: 1, y: 1}]
    ],
    [
      [{x: 1, y: 1}, {x: 2, y: 1}],
      Direction.Left,
      [{x: 0, y: 1}, {x: 1, y: 1}]
    ],
  ];
  
  test.each(cases)(
    'should move snake position depending its direction',
    (position, direction, expectedPosition) => {
      const res = move(position, direction);

      expect(res).toEqual(expectedPosition);
    }
  );

  const casesInTheEdgeOfCanvas: [TPosition[], Direction, TPosition[]][] = [
    [
      [{x: 1, y: FIRST_FROM_TOP}, {x: 1, y: 1}],
      Direction.Up,
      [{x: 1, y: FIRST_FROM_BOTTOM},{x: 1, y: 0}]
    ],
    [
      [{x: 1, y: FIRST_FROM_BOTTOM}, {x: 2, y: 1}],
      Direction.Down,
      [{x: 1, y: FIRST_FROM_TOP}, {x: 1, y: FIRST_FROM_BOTTOM}]
    ],
    [
      [{x: FIRST_FROM_RIGHT, y: 1}, {x: 2, y: 1}],
      Direction.Right,
      [{x: FIRST_FROM_LEFT, y: 1}, {x: FIRST_FROM_RIGHT, y: 1}]
    ],
    [
      [{x: FIRST_FROM_LEFT, y: 1}, {x: 2, y: 1}],
      Direction.Left,
      [{x: FIRST_FROM_RIGHT, y: 1}, {x: FIRST_FROM_LEFT, y: 1}]
    ],
  ];

  test.each(casesInTheEdgeOfCanvas)(
    'test when snake in the edge of canvas',
    (position, direction, expectedPosition) => {
      const res = move(position, direction);

      expect(res).toEqual(expectedPosition);
    }
  );
});