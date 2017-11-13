function check(balls, board) {
    // A 2-dimensional array to check which group of balls on the board is connected
    let checkBoard = [];
    // A 2-dimensional array that show which ball will be destroyed
    let scoreBoard = [];

    for (let row = 0; row < boardSize; row++) {
        checkBoard[row] = [];
        scoreBoard[row] = [];
        for (let col = 0; col < boardSize; col++) {
            if (getBallColor(col, row) != null) {
                // Check if the next right and bottom grid has a ball or not,
                // any grid that has horizontal or vertical point >= 3 will be destroyed
                checkBoard[row][col] = {
                    h: checkHorizontal(col, row, getBallColor(col, row)),
                    v: checkVertical(col, row, getBallColor(col, row))
                }
            } else {
                checkBoard[row][col] = {
                    h: 0,
                    v: 0
                }
            }

            scoreBoard[row][col] = 0;
        }
    }

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            let score = checkBoard[row][col];
            if (score.h >= 3) {
                for (let i = 0; i < score.h; i++) {
                    scoreBoard[row][col + i] = 1;
                }
            }
            if (score.v >= 3) {
                for (let i = 0; i < score.v; i++) {
                    scoreBoard[row + i][col] = 1;
                }
            }
        }
    }
    
    return scoreBoard;
}

// Return the number of consecutive balls on the right of this grid, include this grid
function checkHorizontal(col, row, color) {
    if (board[row][col] == 0) {
        return 0;
    } else if (getBallColor(col + 1, row) == color) {
        if (col + 1 < boardSize) {
            return 1 + checkHorizontal(col + 1, row, color);
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

// Return the number of consecutive balls below this grid, include this grid
function checkVertical(col, row, color) {
    if (board[row][col] == 0) {
        return 0;
    } else if (getBallColor(col, row + 1) == color) {
        if (row + 1 < boardSize) {
            return 1 + checkVertical(col, row + 1, color);
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

function getBallColor(col, row) {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].col == col && balls[i].row == row) {
            return balls[i].color;
        }
    }
    return null;
}