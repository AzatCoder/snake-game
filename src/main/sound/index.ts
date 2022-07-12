const eat = require('./data/eat.wav');
const impossibleMove = require('./data/impossible-move.wav');
const lose = require('./data/lose.wav');


const Sound = (() => {
  const eatSound = new Audio(eat);
  const impossibleMoveSound = new Audio(impossibleMove);
  const loseSound = new Audio(lose);

  const playOrRepeat = (sound: HTMLAudioElement) => {
    sound.currentTime = 0;
    sound.play();
  }

  return {
    playEat() {
      playOrRepeat(eatSound);
    },

    playImpossiobleMove() {
      playOrRepeat(impossibleMoveSound);
    },

    playLose() {
      playOrRepeat(loseSound);
    }
  }
})();


export default Sound;