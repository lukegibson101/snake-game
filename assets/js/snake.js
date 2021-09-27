

// wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {

    // get canvas element
let gameBoard = document.getElementById("snakeBoard");
parent = gameBoard.parentNode;  // the div's parent element
gameWidth = parent.offsetWidth;
parent.style.height = gameWidth;
parent.style.backgroundColor = "yellow";
gameBoard.width=gameWidth;
gameBoard.height=gameWidth;

// add responsive sized canvas
if (gameWidth < 400) {
    gameBoard.width = 300;
    gameBoard.height = 300;
} else if (gameWidth < 500) {
    gameBoard.width = 300;
    gameBoard.height = 300;
} else if (gameWidth < 600) {
    gameBoard.width = 500;
    gameBoard.height = 500;
}

    snakeStart = gameBoard.width - 60; // set starting position on responsive canvas
    console.log(gameBoard.width);
        // set canvas to 2d drawing context
    let gameBoardCtx = gameBoard.getContext("2d");

    let snake = [{
            x: 100,
            y: snakeStart
        },
        {
            x: 80,
            y: snakeStart
        },
        {
            x: 60,
            y: snakeStart
        },
        {
            x: 40,
            y: snakeStart
        },
        {
            x: 20,
            y: snakeStart
        }
    ]

    // change to true if changiung direction
    let changingSnakeDirection = false;
    // initial horizontal movement  
    let dx = 20;
    // initial vertical movement
    let dy = 0;
    // inital speed
    let speed = 300;

    
    /**
     * drawCanvas will be called often to "reset" the game board to allow the updated movements to then be drawn so there is no overlap of the previous frame
     */
    function drawCanvas() {
        // background color of canvas
        gameBoardCtx.fillStyle = '#c0c0c0';
        // canvas border color
        gameBoardCtx.strokeStyle = '#000'
        // Draw a filled rectangle to cover the canvas
        gameBoardCtx.fillRect(0, 0, gameBoard.width, gameBoard.height);
        // draw the canvas border
        gameBoardCtx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
    }

    //Begin game
    playGame();

    // listen for keypress to change direction
    document.addEventListener("keydown", changeSnakeDirection);

    function playGame() {


        if (collisionDetection()) {
            alert('Game Over!');
            return;     
        }

        changingSnakeDirection = false;
        setTimeout(function onTick() {
            drawCanvas();
            moveSnake();
            drawSnake();
            // call again to refresh
            playGame();
        }, speed)
    }



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
     * This funtion detects if the snake has collided with anything and then calls game over
     */
     function collisionDetection() {
        for (let i = 4; i < snake.length; i++) { //start at 4 as length of starting snake
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true; //if snake hits itself
          }
          let collideLeftWall = snake[0].x < 0;
          let collideRightWall = snake[0].x > gameBoard.width - dx;
          let collideToptWall = snake[0].y < 0;
          let collideBottomWall = snake[0].y > gameBoard.width - dy;
          return collideLeftWall || collideRightWall || collideToptWall || collideBottomWall;
        }
    

    /** Lets get the snake changing direction! */
    function changeSnakeDirection(event) {
        // define key presses for directions
        let arrowLeft = 37;
        let arrowRight = 39;
        let arrowUp = 38;
        let arrowDown = 40;
        let keyA = 65;
        let keyD = 68;
        let keyW = 87;
        let keyS = 83;
        

        // prevent snake from reversing
        if (changingSnakeDirection) return;
        changingSnakeDirection = true;

        // get the code for the pressed key
        let keyPressed = event.keyCode;

        //define what action to take depending on snake direction
        let leftDir = dx === -20;
        let rightDir = dx === 20;
        let upDir = dy === -20;
        let downDir = dy === 20;

        if (keyPressed === arrowLeft && !rightDir) {
            dx = -20;
            dy = 0;
        }

        if (keyPressed === arrowRight && !leftDir) {
            dx = 20;
            dy = 0;
        }

        if (keyPressed === arrowUp && !downDir) {
            dx = 0;
            dy = -20;
        }

        if (keyPressed === arrowDown && !upDir) {
            dx = 0;
            dy = 20;
        }

        if (keyPressed === keyA && !rightDir) {
            dx = -20;
            dy = 0;
        }

        if (keyPressed === keyD && !leftDir) {
            dx = 20;
            dy = 0;
        }

        if (keyPressed === keyW && !downDir) {
            dx = 0;
            dy = -20;
        }

        if (keyPressed === keyS && !upDir) {
            dx = 0;
            dy = 20;
        }
    }

    /**
     * Move the snake. Update snake array my adding to front of snake array in the direction of travel and removing the last item in the array
     */
     function moveSnake() {
        let front = {
            x: snake[0].x + dx,
            y: snake[0].y + dy
        }
        snake.unshift(front);
        snake.pop();
    }

   

     

}) //end DOM loaded function