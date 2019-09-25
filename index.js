const player = (name, sign) => {
    return { name, sign };
};

const gameBoard = function () {
    const cells = document.querySelectorAll(".cell");
    const display = displayController(cells);
    let started = false;
    let players = [];
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
        debugger;
        if (!boardValuesxIsFilled[cellindex] && started) {
            let player = players[playerturn];

            cells[cellindex].innerHTML = player.sign;

            boardValuesxIsFilled[cellindex] = player.sign;
            console.log(boardValuesxIsFilled);
            console.log(isWinner(boardValuesxIsFilled));
            if (isWinner(boardValuesxIsFilled)) {
                display.sendmsg(`the is a winner :D. congrats !! ${player.name}`)
            } else if ([...cells].every(item => item.innerHTML != "_")) {
                display.sendmsg(`all cells are filled, game finished.`)
            }
            playerturn += 1;
            playerturn %= 2;
        }
    };

    cells.forEach((item, index) =>
        item.addEventListener("click", () => match(index))
    );

    const start = () => {

        debugger;
        if (!started) {
            if (document.querySelector("#playerone-name").value != "" && document.querySelector("#playertwo-name").value != "") {
                players = [player(document.querySelector("#playerone-name").value, "O"), player(document.querySelector("#playertwo-name").value, "X")];
                started = true;
                display.sendmsg("there ya go :)")
            }
            else {
                display.sendmsg("name should not be empty.")
            }
        } else {
            started = !started;
        }

    };
    const reset = () => {
        started = false;
        players = [];
        boardValuesxIsFilled = [false,false,false,false,false,false,false,false,false,]
        cells.forEach(item => item.innerHTML = "_")
    };
    return { cells, match, display, start, reset };
};


const displayController = cells => {
    const htmlcontainer = document.querySelector("div.info");

    const sendmsg = contextmsg => {

        htmlcontainer.innerHTML = contextmsg;
    };
    return { sendmsg };
};

const Game = gameBoard();
