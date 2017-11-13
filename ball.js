function Ball(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.size = width / (boardSize * 1.25);
    this.moving = false;
    this.speed = 0.2;
    this.newCol = this.col;
    this.newRow = this.row;
    this.selected = false;
    this.path = [];

    this.show = function() {
        if (this.path.length > 0 && !this.moving) {
            let destination = this.path.shift();
            this.moving = true;
            this.newCol = destination.col;
            this.newRow = destination.row;
        }

        if (this.moving) {
            if (abs(this.col - this.newCol) > 2 * this.speed) {
                if (this.col < this.newCol) {
                    this.col += this.speed;
                } else {
                    this.col -= this.speed;
                }
            } else {
                this.col = this.newCol;
                if (abs(this.row - this.newRow) > 2 * this.speed) {
                    if (this.row < this.newRow) {
                        this.row += this.speed;
                    } else {
                        this.row -= this.speed;
                    }
                } else {
                    this.row = this.newRow;
                    this.moving = false;
                }
            }
        }
        if (this.selected) {
            fill(0);
        } else {
            fill(this.color);
        }
        ellipse((this.col + 0.5) * width / boardSize, (this.row + 0.5) * height / boardSize, this.size, this.size);
    }

    this.move = function(path) {
        this.path = path;
    }

    this.select = function() {
        this.selected = !this.selected;
    }
}