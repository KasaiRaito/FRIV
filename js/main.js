function startCatchTheBall() {
    const menu = document.getElementById('menu');
    const canvas = document.getElementById('gameCanvas');
  
    menu.style.display = 'none';     // hide hub menu
    canvas.style.display = 'block';  // show canvas
  
    initCatchTheBall();              // initialize the game (with in-canvas start)
  }
  