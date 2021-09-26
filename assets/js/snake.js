// get canvas element
let gameBoard = document.getElementById("snakeBoard");

// set canvas to 2d drawing context
let gameBoardCtx = gameBoard.getContext("2d");

drawCanvas();

/**
 * drawCanvas will be called often to "reset" the game board to allow the updated movements to then be drawn so there is no overlap of the previous frame
 */
function drawCanvas () {
    // background color of canvas
    gameBoardCtx.fillStyle = '#c0c0c0';
    // canvas border color
    gameBoardCtx.strokeStyle = '#000'
    // Draw a filled rectangle to cover the canvas
    gameBoardCtx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // draw the canvas border
    gameBoardCtx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

let snake = [
    {x: 100, y: 100},
    {x: 90, y: 100},
    {x: 80, y: 100},
    {x: 70, y: 100},
    {x: 60, y: 100}
  ]

/**
 * To draw the snake on the canvas
 */
function drawSnake() {

}

function drawEachSnakeSection() {

}