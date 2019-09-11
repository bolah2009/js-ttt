const player = (name, sign) => {
  return { name, sign };
};

const gameBoard = function() {
  const cells = document.querySelectorAll(".cell");
  const display = displayController(cells);
  const isWinner = cells => {
    const winPos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let win = false;

    winPos.forEach(pos => {
      if (cells[pos[0]] && cells[pos[0]] === cells[pos[1]] && cells[pos[0]] === cells[pos[2]]) {
        win = true;
      }
    });
    return win;
  };

  let playerturn = 0;
  const players = [player("player one", "O"), player("player two", "X")];
  let boardValuesxIsFilled = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  const match = cellindex => {
    if (!boardValuesxIsFilled[cellindex]) {
      let player = players[playerturn];

      cells[cellindex].innerHTML = player.sign;

      boardValuesxIsFilled[cellindex] = player.sign;
      console.log(boardValuesxIsFilled);
      console.log(isWinner(boardValuesxIsFilled));

      playerturn += 1;
      playerturn %= 2;
    }
  };

  cells.forEach((item, index) =>
    item.addEventListener("click", () => match(index))
  );
  return { cells, match, display };
};

const displayController = cells => {
  const htmlcontainer = document.querySelector("main");

  const display = contextmsg => {
    const msg = `<label>${contextmsg}</label>`;
    htmlcontainer += msg;
  };
  return { display };
};

const Game = gameBoard();
