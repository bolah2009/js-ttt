const player = (name, sign) => {
    const sign = sign;
    return { name, sign }
}

const gameBoard = function () {
    const cells = document.querySelectorAll(".cell");
    const display = displayController();
    const playerturn = 0;
    const players = [player("player one", "O"), player("player two", "X")];
    let boardValuesxIsFilled = [false, false, false, false, false, false, false, false, false];
    const match = (cellindex) => {
        if (!boardValuesxIsFilled[cellindex]) {
            let player = players[playerturn];

            cells[cellindex].innerHTML = player.sign;

            display.render();
            boardValuesxIsFilled[cellindex] = true;
            playerturn += 1;
            playerturn %= 2;
        }
    }
    return {match}
};

const displayController = (cells) => {
    const cells = cells;
    const htmlcontainer = Document.querySelector("main")
    const render = (contextboardValues) => {
        contextboardValues.map((value, index) => cells[index].innerHTML = value);
    }
    const display = (contextmsg) => {
        const msg = `<label>${contextmsg}</label>`;
        htmlcontainer += msg;
    }
    return { render, display }
};

const Game = gameBoard();
Game.render();



