// Declare all objects here

// An array hold all Ball() objects
let balls;
let selectedBall;
// A 2-dimensional array to indicate the state of every grid on the board,
// 1 means that grid has a ball, 0 means it doesn't and 0.5 means a ball is prompt to spawn there
let board;
let boardSize;
let spawningRate;
let score;
let colorList;
// Game state: idling, selected, moving, newCycle
/*
      ---------------------------------(spawn new balls, check for matching)------------------------
      |                                                                                            |
      v                                                                                            |
    idling --(select a ball)--> selected --(select a valid grid)--> moving --(finish moving)--> newCycle
      ^                              |
      |                     (invalid selection)
      --------------------------------
*/
let gameState;

// Initiate all objects here
function setup() {
    createCanvas(600, 600);

    // Config
    boardSize = 10;
    spawningRate = 3;
    colorList = ['red', 'blue', 'yellow', 'green'];

    balls = [];
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = 0;
        }
    }

    // Start the game with 3 balls
    spawn(balls, board);

    selectedBall = null;
    gameState = 'idling';
    score = document.getElementById('score');
    score.innerHTML = 0;
}

// Render all objects here
function draw() {
    background(100);

    // Render board grid
    for (let i = 1; i < boardSize; i++) {
        line(i * width / boardSize, 0, i * width / boardSize, height);
        line(0, i * height / boardSize, width, i * height / boardSize);
    }

    // Render all balls
    for (let i = 0; i < balls.length; i++) {
        balls[i].show();
    }

    switch (gameState) {
        case 'moving':
            if (selectedBall.path.length == 0 & !selectedBall.moving) {
                // If the ball has finish moving, start a new game cycle
                selectedBall.select();
                selectedBall = null;
                gameState = 'newCycle';
            }
            break;
        case 'newCycle':
            // A game step is complete, check for matching and spawn new ball
            spawn(balls, board);

            // Check for matching
            let scoreBoard = check(balls, board);
            for (let row = 0; row < scoreBoard.length; row++) {
                for (let col = 0; col < scoreBoard[0].length; col++) {
                    if (scoreBoard[row][col] == 1) {
                        // Find the corresponding ball
                        for (let i = 0; i < balls.length; i++) {
                            if (balls[i].row == row && balls[i].col == col) {
                                // Destroy the ball
                                balls.splice(i, 1);
                                // Free the grid on the board
                                board[row][col] = 0;
                                // Increase the player score
                                score.innerHTML++;
                                break;
                            }
                        }
                    }
                }
            }
            gameState = 'idling';
            break;
        default:
            break;
    }
}

onmouseup = function() {
    let col = floor(mouseX / width * boardSize);
    let row = floor(mouseY / height * boardSize);
    // If the player clicked outside of the board, ignore that event
    if (col < boardSize && row < boardSize) {
        switch (gameState) {
            case 'idling':
                if (!selectedBall) {
                    // If the player clicked inside the board, find out whether that grid has a ball
                    for (let i = 0; i < balls.length; i++) {
                        if (balls[i].col == col && balls[i].row == row) {
                            selectedBall = balls[i];
                            selectedBall.select();
                            gameState = 'selected';
                            break;
                        }
                    }
                }
                break;
            case 'selected':
                // If the player already chose a ball and click at a new destination,
                // find out if it is possible to move there
                if ((selectedBall.col != col || selectedBall.row != row) && board[row][col] == 0) {
                    // Find the path using A-star path-finding algorithm
                    let path = Path({ col: selectedBall.col, row: selectedBall.row }, { col: col, row: row }, board);
                    if (path.length > 0) {
                        // Mark the ball's old position as empty
                        board[selectedBall.row][selectedBall.col] = 0;
                        selectedBall.move(path);
                        // Mark the ball's new position as occupied
                        board[row][col] = 1;
                        gameState = 'moving';
                        break;
                    }
                }
                // If the position the player clicked is not valid, unselect the ball
                selectedBall.select();
                selectedBall = null;
                gameState = 'idling';
                break;
            default:
                break;
        }
    }
}