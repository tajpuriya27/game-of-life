const width = 25;
const height = 20;
let playIntervalId;

const gol = new GameOfLife(width, height);

const tds = [];

const table = document.createElement("tbody");

for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

const paint = () => {
  let k = 0;
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      gol.board[h][w]
        ? tds[k].classList.add("alive")
        : tds[k].classList.remove("alive");
      k++;
    }
  }
};

document.getElementById("board").addEventListener("click", (event) => {
  if (event.target.tagName === "TD") {
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;
    gol.board[row][col] = event.target.classList.contains("alive") ? 0 : 1;
    event.target.classList.toggle("alive");
  }
});

document.getElementById("step_btn").addEventListener("click", stepFun);

function stepFun() {
  let old_board = gol.board;
  gol.tick();
  let new_board = gol.board;
  paint();
  if (JSON.stringify(old_board) === JSON.stringify(new_board)) {
    clearInterval(playIntervalId);
  }
  console.log("interval called");
}

document.getElementById("play_btn").addEventListener("click", (event) => {
  playIntervalId = setInterval(stepFun, 1000);
});

document.getElementById("random_btn").addEventListener("click", (event) => {
  // TODO: Randomize the board and paint
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      gol.board[h][w] = Math.round(Math.random() * 1);
    }
  }
  paint();
  console.log("random clicked");
});

document.getElementById("clear_btn").addEventListener("click", (event) => {
  gol.board = gol.makeBoard();
  paint();
});
