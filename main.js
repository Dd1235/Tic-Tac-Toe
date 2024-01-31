let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");

// needs some variables to track the game: x/o turn, winning patterns

let turnO = true;
let count = 0;

const winningPatterns = [
  // Horizontal patterns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical patterns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal patterns
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      turnO = !turnO;
    }
    // could have done box.disable = true
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msg.style.visibility = "visible";
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msg.style.visibility = "hidden";
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}! `;
  msg.style.visibility = "visible";
  disableBoxes();
};

const checkWinner = () => {
  for (pattern of winningPatterns) {
    const [pos1, pos2, pos3] = pattern;
    const values = [
      boxes[pos1].innerText,
      boxes[pos2].innerText,
      boxes[pos3].innerText,
    ];
    if (values.every((val) => val !== "" && val === values[0])) {
      showWinner(values[0]);
      return true;
    }
  }
  return false;
};

reset.addEventListener("click", resetGame);
