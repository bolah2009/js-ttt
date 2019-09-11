const gameBoard = function() {};

const displayController = function() {};

const cells = document.querySelectorAll(".cell");
let boardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const fillCells = ({value}, index) => value = boardValues[index];
cells.forEach(fillCells)
