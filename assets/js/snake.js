// wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {

    // get canvas element
    let gameBoard = document.getElementById("snakeBoard");
    parent = gameBoard.parentNode; // the div's parent element
    gameWidth = parent.offsetWidth; // get width and height for canvas from parent element width (Will use this to manage responsiveness for different screen sizes)


    // add responsive sized canvas
    if (gameWidth < 500) { // smaller screens
        gameBoard.width = 300;
        gameBoard.height = 300;
        pixelSize = 10; // defines "pixel size" Size of snake, size of each movememnt, size of each tile.
    } else if (gameWidth < 600) { // small tablets
        gameBoard.width = 450;
        gameBoard.height = 450;
        pixelSize = 15;
    } else { // everything elsse
        gameBoard.width = gameWidth;
        gameBoard.height = gameWidth;
        pixelSize = 20;
    }

    snakeStart = gameBoard.width - 60; // set starting position on responsive canvas
    console.log(gameBoard.width);
    // set canvas to 2d drawing context
    let gameBoardCtx = gameBoard.getContext("2d");

    let snake = [{
            x: pixelSize * 5,
            y: snakeStart
        },
        {
            x: pixelSize * 4,
            y: snakeStart
        },
        {
            x: pixelSize * 3,
            y: snakeStart
        },
        {
            x: pixelSize * 2,
            y: snakeStart
        },
        {
            x: pixelSize,
            y: snakeStart
        }
    ]

    let currentScore = 0;

    // change to true if changiung direction
    let changingSnakeDirection = false;
    // initial horizontal movement  
    let dx = pixelSize;
    // initial vertical movement
    let dy = 0;
    // inital speed
    let speed = 200;
    // how many food eaten
    let eatCount = 0;

    //Begin game
    playGame();

    //generate food
    generateFood();

    // listen for keypress to change direction
    document.addEventListener("keydown", changeSnakeDirection);


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

    function playGame() {
        if (collisionDetection()) {
            alert('Game Over!');
            return;
        }

        changingSnakeDirection = false;
        setTimeout(function onTick() {
            drawCanvas();
            drawFood();
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
        gameBoardCtx.fillRect(snakeSection.x, snakeSection.y, pixelSize, pixelSize);
        // draw the canvas border
        gameBoardCtx.strokeRect(snakeSection.x, snakeSection.y, pixelSize, pixelSize);
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
        let leftDir = dx === -pixelSize;
        let rightDir = dx === pixelSize;
        let upDir = dy === -pixelSize;
        let downDir = dy === pixelSize;

        if (keyPressed === arrowLeft && !rightDir) {
            dx = -pixelSize;
            dy = 0;
        }

        if (keyPressed === arrowRight && !leftDir) {
            dx = pixelSize;
            dy = 0;
        }

        if (keyPressed === arrowUp && !downDir) {
            dx = 0;
            dy = -pixelSize;
        }

        if (keyPressed === arrowDown && !upDir) {
            dx = 0;
            dy = pixelSize;
        }

        if (keyPressed === keyA && !rightDir) {
            dx = -pixelSize;
            dy = 0;
        }

        if (keyPressed === keyD && !leftDir) {
            dx = pixelSize;
            dy = 0;
        }

        if (keyPressed === keyW && !downDir) {
            dx = 0;
            dy = -pixelSize;
        }

        if (keyPressed === keyS && !upDir) {
            dx = 0;
            dy = pixelSize;
        }
    }

    function touchControlsClicked() {
        // prevent snake from reversing
        if (changingSnakeDirection) return;
        changingSnakeDirection = true;

        //define what action to take depending on snake direction
        let leftDir = dx === -pixelSize;
        let rightDir = dx === pixelSize;
        let upDir = dy === -pixelSize;
        let downDir = dy === pixelSize;

        if (this.getAttribute("id") === "btn-left" && !rightDir) {
            dx = -pixelSize;
            dy = 0;
        }

        if (this.getAttribute("id") === "btn-right" && !leftDir) {
            dx = pixelSize;
            dy = 0;
        }

        if (this.getAttribute("id") === "btn-up" && !downDir) {
            dx = 0;
            dy = -pixelSize;
        }

        if (this.getAttribute("id") === "btn-down" && !upDir) {
            dx = 0;
            dy = pixelSize;
        }
        
    }
      
    let touchControls = document.getElementsByClassName('btnControls');
    
    for (let i = 0; i < touchControls.length; i++) {
        touchControls[i].addEventListener('click', touchControlsClicked);
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
        let snakeEaten = snake[0].x === foodX && snake[0].y === foodY; // chech snake head has just hit food
        if (snakeEaten) {
            generateFood(); //generate a new food location
            currentScore += 20; // increase score
            ++eatCount;
            if (eatCount % 5 === 0 && speed > 50) {
                speed -= 10;
            }
            document.getElementById('newScore').innerHTML = currentScore;
        } else { // remove the last part of the body (if has eaten the snake will now grow in size)
            snake.pop();
        }
    }

    /**
     * Generate food for the snake to eat where min is 0 and max is width or height of the canvas (which may change depending on screen size)
     */
    function generateFoodRandom(min, max) {
        return Math.round((Math.random() * (max - min) + min) / pixelSize) * pixelSize;
    }

    /**
     * use the random food generator, check its not actually where the snake is and assign a co-ordinate
     */
    function generateFood() {
        foodX = generateFoodRandom(0, gameBoard.width - pixelSize); // x co-ordinate
        foodY = generateFoodRandom(0, gameBoard.width - pixelSize); // y co-ordinate
        snake.forEach(function hasSnakeEaten(part) {
            let snakeEaten = part.x == foodX && part.y == foodY;
            if (snakeEaten) generateFood();
        });
    }

    /**
     * Take generated co-ordinates and draw food to the canvas
     */
    function drawFood() {
        gameBoardCtx.fillStyle = 'red';
        gameBoardCtx.strokeStyle = 'black';
        gameBoardCtx.beginPath();
        gameBoardCtx.arc(foodX + (pixelSize / 2), foodY + (pixelSize / 2), (pixelSize / 2), 0, 2 * Math.PI);
        gameBoardCtx.fill();
        gameBoardCtx.stroke();


    }

}) //end DOM loaded function