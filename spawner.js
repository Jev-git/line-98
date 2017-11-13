function spawn(balls, board) {
    for (let i = 0; i < spawningRate; i++) {
        while (true) {
            let col = floor(random() * (boardSize - 1));
            let row = floor(random() * (boardSize - 1));
            if (board[row][col] == 0) {
                board[row][col] = 1;
                balls.push(new Ball(col, row, colorList[floor(random() * colorList.length)]));
                break;
            }
        }
    }
}