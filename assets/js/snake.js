// get canvas element
let gameBoard = document.getElementById("snakeBoard");

// set canvas to 2d drawing context
let gameBoardCtx = gameBoard.getContext("2d");


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
    {x: 100, y: 500},
    {x: 80, y: 500},
    {x: 60, y: 500},
    {x: 40, y: 500},
    {x: 20, y: 500}
  ]

/**
 * To draw the snake on the canvas
 */
function drawSnake() {
    snake.forEach(drawEachSnakeSection);
}

function drawEachSnakeSection(snakeSection) {
    // background color of snake section
    gameBoardCtx.fillStyle = '#000';
    // border of snake section
    gameBoardCtx.strokeStyle = 'yellow'
    // Define size of each section
    gameBoardCtx.fillRect(snakeSection.x, snakeSection.y, 20, 20);
    // draw the canvas border
    gameBoardCtx.strokeRect(snakeSection.x, snakeSection.y, 20, 20);
}

/**
 * Move the snake. Update snake array my adding to front of snake array in the direction of travel and removing the last item in the array
 */
function moveSnake () {
    let front = {x: snake[0].x + dx, y: snake[0].y +dy}
    snake.unshift(front);
    snake.pop();
}


drawCanvas();
drawSnake();
