// wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    
    let snake = [{
            x: 100,
            y: 500
        },
        {
            x: 80,
            y: 500
        },
        {
            x: 60,
            y: 500
        },
        {
            x: 40,
            y: 500
        },
        {
            x: 20,
            y: 500
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

    // get canvas element
    let gameBoard = document.getElementById("snakeBoard");

    // set canvas to 2d drawing context
    let gameBoardCtx = gameBoard.getContext("2d");


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

     }
    

    /** Lets get the snake changing direction! */
    function changeSnakeDirection(event) {
        // define key presses for directions
        let arrowLeft = 37;
        let arrowRight = 39;
        let arrowUp = 38;
        let arrowDown = 40;
        

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