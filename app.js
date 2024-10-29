const get = (param) => document.querySelector(`${param}`);
const allBoxes = document.querySelectorAll(".box");
const gameInfo = get(".game-info");
const newGameBtn = get(".btn");

//todo init values
let currentPlayer;
let gameGrid;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// init game
function initGame() {
  currentPlayer = "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
  //! OUR LOGIC
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //? EMPTY IN UI ALSO
  allBoxes.forEach((box, index) => {
    box.innerText = "";
    allBoxes[index].style.pointerEvents = "all";
    // remove win color?
    allBoxes[index].classList.remove("win");
  });
  newGameBtn.classList.remove("active");
}
initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    // this logic show all 3 boxes should not be empty and each box should have the same value init
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check what value inside the box
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      allBoxes[position[0]].classList.add("win");
      allBoxes[position[1]].classList.add("win");
      allBoxes[position[2]].classList.add("win");
    }
  });
  // it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    allBoxes.forEach((box) => {
      box.style.pointerEvents = "none";
    });
  }

  // lets check for game tie?
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    allBoxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    allBoxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

allBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// re-init the default condition
newGameBtn.addEventListener("click", initGame);
