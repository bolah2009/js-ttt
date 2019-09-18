const player = (name, sign) => ({ name, sign });


const cellsElement = document.querySelectorAll('.cell');
const htmlcontainer = document.querySelector('div.info');
const playerOneInput = document.querySelector('#playerone-name');
const playerTwoInput = document.querySelector('#playertwo-name');
const playerComputerYes = document.querySelector('#yes');
const playerComputerNo = document.querySelector('#no');
const computerCheckbox = document.querySelector('input[type="checkbox"]');
const inputElements = document.querySelectorAll('input');

const computerPlayer = () => {
  const getRandomIndex = (max) => Math.floor(Math.random() * Math.floor(max));
  const choosePosition = (validMoves) => validMoves[getRandomIndex(validMoves.length)];
  // const isComputerTurn = (moves) => choosePosition(moves);
  return { choosePosition };
};

const displayController = () => {
  const sendmsg = (contextmsg) => {
    htmlcontainer.textContent = contextmsg;
  };

  const markBoard = ({ mark = '', index = '', type = '' } = {}) => {
    switch (type) {
      case 'clear':
        cellsElement.forEach((element) => {
          element.classList.remove('playerO', 'playerX', 'win', 'draw');
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

  const disableInputs = (disable = true) => {
    if (disable) {
      inputElements.forEach((e) => e.setAttribute('disabled', ''));
    } else {
      inputElements.forEach((e) => e.removeAttribute('disabled', ''));
    }
  };

  const isPlayerNameValid = (inputOne, inputTwo) => {
    const playerOne = inputOne.value;
    const isComputer = computerCheckbox.checked;
    const playerTwo = isComputer ? 'Computer' : inputTwo.value;
    const valid = () => playerOne !== playerTwo && playerTwo !== '';
    return { valid, playerOne, playerTwo };
  };
  return {
    sendmsg, markBoard, isPlayerNameValid, disableInputs,
  };
};

const gameBoard = (boardCells) => {
  const cells = boardCells;
  const {
    sendmsg, markBoard, isPlayerNameValid, disableInputs,
  } = displayController();
  const { choosePosition } = computerPlayer();
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


  const boardValuesxIsFilled = [];

  const validMoves = () => boardValuesxIsFilled.filter((i) => i !== 'X' && i !== 'O');
  const isValid = (index) => validMoves().includes(Number.parseInt(index, 10));
  const isDraw = () => validMoves().length < 1;

  const clear = () => {
    started = false;
    players = [];
    markBoard({ type: 'clear' });
    cells.forEach((item, index) => {
      cells[index].textContent = '_';
      boardValuesxIsFilled.splice(index, 1, index);
    });
  };


  const reset = () => {
    clear();
    disableInputs(false);
  };

  const start = () => {
    clear();
    const {
      valid, playerOne, playerTwo,
    } = isPlayerNameValid(playerOneInput, playerTwoInput);
    if (valid()) {
      disableInputs();
      players = [player(playerOne, 'O'), player(playerTwo, 'X')];

      started = true;
      sendmsg('there ya go :)');
    } else {
      sendmsg('name should not be empty.');
    }
  };

  const match = (cellindex) => {
    if (isValid(cellindex) && started) {
      const currentPlayer = players[playerturn];
      markBoard({ mark: currentPlayer.sign, index: cellindex, type: 'play' });
      boardValuesxIsFilled[cellindex] = currentPlayer.sign;
      validMoves().splice(cellindex, 1);
      if (isWinner(boardValuesxIsFilled)) {
        markBoard({ type: 'win' });
        sendmsg(`this is a winner :D. congrats !! ${currentPlayer.name}`);
        started = false;
        return;
      } if (isDraw()) {
        markBoard({ type: 'draw' });
        sendmsg('all cells are filled, game finished.');
        started = false;
        return;
      }
      playerturn = playerturn === 0 ? 1 : 0;
    }
    if (players[playerturn].name === 'Computer') {
      match(choosePosition(validMoves()));
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


document.querySelector('input[type="checkbox"]')
  .addEventListener('click', ({ target: { checked } }) => {
    [playerComputerYes, playerTwoInput].forEach((e) => e.classList.toggle('checked', checked));
    playerComputerNo.classList.toggle('checked', !checked);
    if (checked) {
      setTimeout(() => playerTwoInput.classList.add('hide'), 200);
    } else {
      playerTwoInput.classList.remove('hide');
    }
  });
