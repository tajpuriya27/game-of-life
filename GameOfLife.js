class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    let boardArr = [];
    let x = this.height;
    while (x) {
      let row = [];
      let y = this.width;
      while (y) {
        row.push(0);
        --y;
      }
      boardArr.push(row);
      --x;
    }
    return boardArr;
  }

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.
    let liveCount = 0;
    let iLower = row > 0 ? row - 1 : 0;
    let iUpper = row === this.height - 1 ? row : row + 1;
    let jLower = col > 0 ? col - 1 : 0;
    let jUpper = col === this.width - 1 ? col : col + 1;
    for (let i = iLower; i <= iUpper; i++) {
      for (let j = jLower; j <= jUpper; j++) {
        if (i === row && j === col) {
          continue;
        }
        if (this.board[i][j]) {
          liveCount++;
        }
      }
    }
    return liveCount;
  }

  tick() {
    const newBoard = this.makeBoard();
    let aliveNeighours = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        aliveNeighours = this.livingNeighbors(i, j);
        if (this.board[i][j]) {
          // alive cell logic here
          if (aliveNeighours < 2 || aliveNeighours > 3) {
            newBoard[i][j] = 0;
          } else {
            newBoard[i][j] = 1;
          }
        } else {
          // dead cell logic here.
          if (aliveNeighours === 3) {
            newBoard[i][j] = 1;
          } else {
            newBoard[i][j] = 0;
          }
        }
      }
    }

    this.board = newBoard;
  }
}
