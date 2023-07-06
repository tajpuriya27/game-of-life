class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // TODO: Create and return an 2D Array
    // with `this.height` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
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

  /**
   * Return the amount of living neighbors around a given coordinate.
   */

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

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    let aliveNeighours = 0;
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
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

// // debugger;
// let game = new GameOfLife(6, 5);
// // console.log(game.makeBoard());
// game.board[1][3] = 1;
// game.board[2][2] = 1;
// game.board[2][3] = 1;
// game.board[3][2] = 1;
// // debugger;
// // console.log(game.livingNeighbors(3, 0));
// debugger;
// console.dir(game.board);
// game.tick();
// console.dir(game.board);
