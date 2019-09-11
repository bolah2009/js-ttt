const player = (name, sign) => {
    
    return { name, sign }
}

const gameBoard = function () {
    const cells = document.querySelectorAll(".cell");
    const display = displayController(cells);
    let playerturn = 0;
    const players = [player("player one", "O"), player("player two", "X")];
    let boardValuesxIsFilled = [false, false, false, false, false, false, false, false, false];

    const match = (cellindex) => {
        console.log("am matching")
        if (!boardValuesxIsFilled[cellindex]) {
            let player = players[playerturn];

            cells[cellindex].innerHTML = player.sign;

            
            boardValuesxIsFilled[cellindex] = true;
            playerturn += 1;
            playerturn %= 2;
        }
    }

    cells.forEach((item,index) => item.addEventListener("click",() => match(index) ))
    return {cells,match,display}
};

const displayController = (cells) => {
    const htmlcontainer = document.querySelector("main")

    const display = (contextmsg) => {
        const msg = `<label>${contextmsg}</label>`;
        htmlcontainer += msg;
    }
    return {  display }
};


const Game = gameBoard();





