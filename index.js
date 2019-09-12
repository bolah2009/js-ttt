const player = (name, sign) => ({ name, sign });


const cellsElement = document.querySelectorAll('.cell');
const htmlcontainer = document.querySelector('div.info');
const playerOneInput = document.querySelector('#playerone-name');
const playerTwoInput = document.querySelector('#playertwo-name');

const displayController = () => {
  const sendmsg = (contextmsg) => {
    htmlcontainer.textContent = contextmsg;
  };

  const markBoard = ({ mark = '', index = '', type = '' } = {}) => {
    switch (type) {
      case 'clear':
        cellsElement.forEach((element) => {
          element.classList.remove('playerO', 'playerX');
        });
        break;
      case 'win':
        cellsElement.forEach((element) => {
          element.classList.remove('playerO', 'playerX');
          element.classList.add('win');
        });
        break;
      case 'draw':
        cellsElement.forEach((element) => {
          element.classList.remove('playerO', 'playerX');
          element.classList.add('draw');
        });
        break;
      case 'play':
        cellsElement[index].textContent = mark;
        cellsElement[index].classList.add(`player${mark}`);
        break;
      default:
        break;
    }
  };

  const isPlayerNameValid = (inputOne, inputTwo) => {
    const playerOne = inputOne.value;
    const playerTwo = inputTwo.value;
    const valid = playerOne !== playerTwo && playerTwo !== '';
    return { valid, playerOne, playerTwo };
  };
  return {
    sendmsg, markBoard, isPlayerNameValid,
  };
};

const gameBoard = (boardCells) => {
  const cells = boardCells;
  const display = displayController();
  let started = false;
  let players = [];
  let playerturn = 0;
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

  const boardValuesxIsFilled = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const isDraw = () => boardValuesxIsFilled.every(i => i !== 0);

  const reset = () => {
    started = false;
    players = [];
    display.markBoard({ type: 'clear' });
    boardValuesxIsFilled.fill(0);
    cells.forEach((item, index) => {
      cells[index].textContent = '_';
    });
  };

  const start = () => {
    reset();
    if (!started) {
      const {
        valid, playerOne, playerTwo,
      } = display.isPlayerNameValid(playerOneInput, playerTwoInput);
      if (valid) {
        players = [player(playerOne, 'O'), player(playerTwo, 'X')];
        started = true;
        display.sendmsg('there ya go :)');
      } else {
        display.sendmsg('name should not be empty.');
      }
    } else {
      started = !started;
    }
  };

  const match = (cellindex) => {
    if (!boardValuesxIsFilled[cellindex] && started) {
      const currentPlayer = players[playerturn];
      display.markBoard({ mark: currentPlayer.sign, index: cellindex, type: 'play' });
      boardValuesxIsFilled[cellindex] = currentPlayer.sign;
      if (isWinner(boardValuesxIsFilled)) {
        display.markBoard({ type: 'win' });
        display.sendmsg(`this is a winner :D. congrats !! ${currentPlayer.name}`);
        started = false;
      } else if (isDraw()) {
        display.markBoard({ type: 'draw' });
        display.sendmsg('all cells are filled, game finished.');
        started = false;
      }
      playerturn = playerturn === 0 ? 1 : 0;
    }
  };
  return { match, start, reset };
};


const Game = gameBoard(cellsElement);

const handlers = ({ target: { dataset: { id } } }) => {
  switch (id) {
    case 'start':
      Game.start();
      break;
    case 'reset':
      Game.reset();
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
      Game.match(id);
      break;
    default:
      break;
  }
};

document.addEventListener('click', handlers);
