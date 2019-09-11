const player = (name, sign) => ({ name, sign });


const displayController = () => {
  const htmlcontainer = document.querySelector('div.info');

  const sendmsg = (contextmsg) => {
    htmlcontainer.textContent = contextmsg;
  };
  return { sendmsg };
};

const gameBoard = () => {
  const cells = document.querySelectorAll('.cell');
  const display = displayController(cells);
  let started = false;
  let players = [];
  const isWinner = (cellsValue) => {
    const winPos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let win = false;

    winPos.forEach((pos) => {
      if (
        cellsValue[pos[0]]
        && cellsValue[pos[0]] === cellsValue[pos[1]]
        && cellsValue[pos[0]] === cellsValue[pos[2]]
      ) {
        win = true;
      }
    });
    return win;
  };

  let playerturn = 0;

  let boardValuesxIsFilled = [];

  const match = (cellindex) => {
    if (!boardValuesxIsFilled[cellindex] && started) {
      const currentPlayer = players[playerturn];
      cells[cellindex].textContent = currentPlayer.sign;
      boardValuesxIsFilled[cellindex] = currentPlayer.sign;
      if (isWinner(boardValuesxIsFilled)) {
        display.sendmsg(`the is a winner :D. congrats !! ${currentPlayer.name}`);
      } else if ([...cells].every((item) => item.textContent !== '_')) {
        display.sendmsg('all cells are filled, game finished.');
      }
      playerturn += 1;
      playerturn %= 2;
    }
  };

  cells.forEach((item, index) => item.addEventListener('click', () => match(index)));

  const start = () => {
    if (!started) {
      if (
        document.querySelector('#playerone-name').value !== ''
        && document.querySelector('#playertwo-name').value !== ''
      ) {
        players = [
          player(document.querySelector('#playerone-name').value, 'O'),
          player(document.querySelector('#playertwo-name').value, 'X'),
        ];
        started = true;
        display.sendmsg('there ya go :)');
      } else {
        display.sendmsg('name should not be empty.');
      }
    } else {
      started = !started;
    }
  };
  const reset = () => {
    started = false;
    players = [];
    boardValuesxIsFilled = [];
    cells.forEach((item, index) => {
      cells[index].textContent = '_';
    });
  };
  return {
    cells, match, display, start, reset,
  };
};

const Game = gameBoard();

const handlers = ({ target: { value } }) => {
  switch (value) {
    case 'start':
      Game.start();
      break;
    case 'reset':
      Game.reset();
      break;
    default:
      break;
  }
};

document.addEventListener('click', handlers);
