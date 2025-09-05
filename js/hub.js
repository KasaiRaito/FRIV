// ---------------- HUB ---------------- //

// Switch to Catch the Ball
function startCatchTheBallHub() {
  stopAllGames();
  document.getElementById('gameCanvas').style.display = 'block';
  document.getElementById('sudokuContainer').style.display = 'none';
  document.getElementById('wordleContainer').style.display = 'none';
  document.getElementById('spellingBeeContainer').style.display = 'none';

  initCatchTheBall();
}

// Switch to Sudoku
function startSudokuHub() {
  stopAllGames();
  document.getElementById('gameCanvas').style.display = 'none';
  document.getElementById('sudokuContainer').style.display = 'block';
  document.getElementById('wordleContainer').style.display = 'none';
  document.getElementById('spellingBeeContainer').style.display = 'none';

  startSudoku();
}

// Switch to Wordle
function startWordleHub() {
  stopAllGames();
  document.getElementById('gameCanvas').style.display = 'none';
  document.getElementById('sudokuContainer').style.display = 'none';
  document.getElementById('wordleContainer').style.display = 'block';
  document.getElementById('spellingBeeContainer').style.display = 'none';

  startWordle();
}

function startSpellingBeeHub() {
  stopAllGames();
  // Hide others
  document.getElementById("gameCanvas").style.display = "none";
  document.getElementById("sudokuContainer").style.display = "none";
  document.getElementById("wordleContainer").style.display = "none";

  // Show Spelling Bee
  const container = document.getElementById("spellingBeeContainer");
  container.style.display = "block";
  container.innerHTML = "";

  initSpellingBee(container);
}

// ---------------- HELPERS ---------------- //

// Stop intervals, clear boards, reset states when leaving a game
function stopAllGames() {
  //stopCatchTheBall();

  // Clear Sudoku
  const sudoku = document.getElementById('sudokuContainer');
  sudoku.innerHTML = '';

  // Clear Wordle
  const wordle = document.getElementById('wordleContainer');
  wordle.innerHTML = '';

  // Clear Spelling Bee
  const spellingBee = document.getElementById('spellingBeeContainer');
  spellingBee.innerHTML = '';
}
