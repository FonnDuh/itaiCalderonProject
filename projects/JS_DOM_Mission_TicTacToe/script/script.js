let turnX = true, // true means it's X's turn
  tiles = [];

function resetBoard() {
  setTimeout(function () {
    location.reload();
  }, 2000);
}

function checkWinner() {
  for (let i = 1; i <= 9; i++) {
    tiles[i] = document.getElementById("tile" + i).innerHTML;
  }

  // check horizontal
  if (tiles[1] == tiles[2] && tiles[2] == tiles[3] && tiles[1] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[1]} Won!`;
    resetBoard();
  } else if (tiles[4] == tiles[5] && tiles[5] == tiles[6] && tiles[4] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[4]} Won!`;
    resetBoard();
  } else if (tiles[7] == tiles[8] && tiles[8] == tiles[9] && tiles[7] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[7]} Won!`;
    resetBoard();
  }

  // check vertical
  else if (tiles[1] == tiles[4] && tiles[4] == tiles[7] && tiles[1] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[7]} Won!`;
    resetBoard();
  } else if (tiles[2] == tiles[5] && tiles[5] == tiles[8] && tiles[2] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[2]} Won!`;
    resetBoard();
  } else if (tiles[3] == tiles[6] && tiles[6] == tiles[9] && tiles[3] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[3]} Won!`;
    resetBoard();
  }

  // check diagonal
  else if (tiles[1] == tiles[5] && tiles[5] == tiles[9] && tiles[1] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[1]} Won!`;
    resetBoard();
  } else if (tiles[3] == tiles[5] && tiles[5] == tiles[7] && tiles[3] != "") {
    document.getElementById("winnerMsg").innerText = `Player ${tiles[3]} Won!`;
    resetBoard();
  } else if (
    tiles[1] != "" &&
    tiles[2] != "" &&
    tiles[3] != "" &&
    tiles[4] != "" &&
    tiles[5] != "" &&
    tiles[6] != "" &&
    tiles[7] != "" &&
    tiles[8] != "" &&
    tiles[9] != ""
  ) {
    document.getElementById("winnerMsg").innerText = "Match Tie!";
    resetBoard();
  }
}

function insertTile(id) {
  let currentTile = document.getElementById(id);
  if (turnX && currentTile.innerHTML === "") {
    currentTile.innerHTML = "X";
    currentTile.classList.add("x");
    turnX = !turnX;
    document.getElementById("turnMessage").innerText = "Player O's turn";
  } else if (!turnX && currentTile.innerHTML === "") {
    currentTile.innerHTML = "O";
    currentTile.classList.add("o");
    turnX = !turnX;
    document.getElementById("turnMessage").innerText = "Player X's turn";
  }
  checkWinner();
}
