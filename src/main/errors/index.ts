export enum ErrorNames {
  SnakeEatsItself = 'SnakeEatsItself',
  SnakeCrush = 'SnakeCrush',
  SnakeImpossibleDirection = 'SnakeImpossibleDirection',
}


const createCustomError = (name: ErrorNames, msg: string): Error =>  {
  const err = new Error(msg);
  err.name = name;

  return err;
}

const GameError = {
  SnakeEatsItself() {
    return createCustomError(
      ErrorNames.SnakeEatsItself,
      'Snake eating itself.'
    );
  },

  SnakeCrush() {
    return createCustomError(
      ErrorNames.SnakeCrush,
      `Snake crushed to another thing.`
    )
  },

  SnakeImpossibleDirection(direction?: string, explenation: string = '') {
    return createCustomError(
      ErrorNames.SnakeImpossibleDirection,
      ( direction
        ? `Can't change to ${direction} direction ${explenation}`
        : `Can't change direction`
      )
    );
  }
};


export default GameError;