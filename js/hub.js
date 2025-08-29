// Hub functions to switch between games
function startCatchTheBallHub() {
    stopCatchTheBall();
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('sudokuContainer').style.display = 'none';
    initCatchTheBall();
}

function startSudokuHub() {
    stopCatchTheBall();
    document.getElementById('gameCanvas').style.display = 'none';
    const container = document.getElementById('sudokuContainer');
    container.style.display = 'block';
    container.innerHTML = '';
    startSudoku();
}

let catchBallInterval;

function stopCatchTheBall() {
    if (catchBallInterval) clearInterval(catchBallInterval);
}
