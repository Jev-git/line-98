function Path(start, end, board) {
    // The queue is a Priority Queue ADT that is arrange by the 'distance' attribute,
    // we will use it to perform the A-star path-finding algorithm
    let queue = [];
    
    // A 2-dimensional array contains the path to that position from the starting point
    let path = [];

    // A 2-dimensional array contains the parent leads to each node
    let parent = [];

    // Infinity?? Wut? ɿ(｡･ɜ･)ɾⓌⓗⓨ？
    // I don't know, don't ask me (・・。)ゞ
    let INFINITY = 1000;

    // The starting position will be consider as empty
    board[start.row][start.col] = 0;

    for (let i = 0; i < boardSize; i++) {
        path[i] = [];
        parent[i] = [];
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] == 0) {
                if(i == start.row && j == start.col) {
                    queue.unshift({
                        node: {
                            row: i,
                            col: j
                        },
                        distance: sqrt(pow(start.col - end.col, 2) + pow(start.row - end.row, 2))
                    })
                    path[i][j] = 0;
                } else {
                    queue.push({
                        node: {
                            row: i,
                            col: j
                        },
                        distance: INFINITY
                    })
                    path[i][j] = INFINITY;
                }
                parent[i][j] = null;
            }
        }
    }

    while(queue.length > 0) {
        let first = queue.shift();
        if (first.node.col == end.col && first.node.row == end.row) {
            let list = [];
            let node = first.node;
            while(parent[node.row][node.col] != null) {
                list.unshift(node);
                node = parent[node.row][node.col];
            }
            return list;
        } else {
            let nodes = getEmptyNeighbors(first.node.col, first.node.row, board);
            let pathToFirst = path[first.node.row][first.node.col];
            for (let i = 0; i < nodes.length; i++) {
                let pathToNode = path[nodes[i].row][nodes[i].col];
                // If the path to the neighbor node can be shorten by traversing through
                // the 'first' node, we sets its parent and path
                if (pathToFirst + 1 < pathToNode) {
                    pathToNode = pathToFirst + 1;
                    path[nodes[i].row][nodes[i].col] = pathToNode;
                    parent[nodes[i].row][nodes[i].col] = first.node;

                    // Change the value 'distance' in the queue
                    let id = getElementInQueue(nodes[i].col, nodes[i].row, queue);
                    queue[id].distance =
                    pathToNode + sqrt(pow(queue[id].node.col - end.col, 2) + pow(queue[id].node.row - end.row, 2));
                }
            }
        }

        // Re-arrange the queue
        queue.sort((a, b) => {
            return a.distance - b.distance;
        })
    }
}

function getEmptyNeighbors(col, row, board) {
    let list = [];
    if (col > 0 && board[row][col - 1] == 0) {
        list.push({
            row: row,
            col: col - 1
        })
    }
    if (col < boardSize - 1 && board[row][col + 1] == 0) {
        list.push({
            row: row,
            col: col + 1
        })
    }
    if (row > 0 && board[row - 1][col] == 0) {
        list.push({
            row: row - 1,
            col: col
        })
    }
    if (row < boardSize - 1 && board[row + 1][col] == 0) {
        list.push({
            row: row + 1,
            col: col
        })
    }
    return list;
}

function getElementInQueue(col, row, queue) {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].node.col == col && queue[i].node.row == row) {
            return i;
        }
    }
    return null;
}