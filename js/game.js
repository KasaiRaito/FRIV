function initCatchTheBall() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = 500;
    canvas.height = 600;
  
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let ballSpeed = 3;
    let gameStarted = false; // New flag for in-canvas start
  
    // Load images
    const playerImg = new Image();
    playerImg.src = "assets/player.png";
  
    const ballImgs = [
      "assets/ball1.png",
      "assets/ball2.png",
      "assets/ball3.png"
    ].map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
  
    const bgImg = new Image();
    bgImg.src = "assets/background.jpg";
  
    // Player
    const player = { x: canvas.width/2-40, y: canvas.height-70, width:80, height:60, speed:6, dx:0 };
  
    // Balls
    let balls = [];
    function createBall() {
      const radius = 20;
      const x = Math.random() * (canvas.width - radius*2) + radius;
      const img = ballImgs[Math.floor(Math.random() * ballImgs.length)];
      balls.push({ x, y:0, radius, dy:ballSpeed, img });
    }
  
    // Input
    document.addEventListener("keydown", (e) => {
        if (!gameStarted) 
        {
            gameStarted = true; // Start game with any key
        } 
        else if (gameOver) 
        {
            restartGame(); // Reset game with any key
        }
  
      if (gameStarted) {
        if (gameOver && e.key === "Enter") restartGame();
        if (e.key === "ArrowLeft" || e.key === "a") player.dx = -player.speed;
        if (e.key === "ArrowRight" || e.key === "d") player.dx = player.speed;
      }
    });
  
    document.addEventListener("keyup", (e) => {
      if (gameStarted && (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "a" || e.key === "d")) player.dx = 0;
    });
  
    // Draw functions
    function drawPlayer() { ctx.drawImage(playerImg, player.x, player.y, player.width, player.height); }
    function drawBalls() { balls.forEach(ball => ctx.drawImage(ball.img, ball.x-ball.radius, ball.y-ball.radius, ball.radius*2, ball.radius*2)); }
    function updateBalls() {
      balls.forEach((ball,index) => {
        ball.y += ball.dy;
  
        if (ball.x > player.x && ball.x < player.x + player.width && ball.y + ball.radius > player.y) {
          score++;
          if (score % 5 === 0) ballSpeed += 0.5;
          balls.splice(index,1);
        }
  
        if (ball.y > canvas.height) {
          balls.splice(index,1);
          lives--;
          if (lives<=0) gameOver=true;
        }
      });
    }
  
    function drawHUD() {
      ctx.fillStyle="white";
      ctx.font="20px Arial";
      ctx.fillText("Score: "+score,10,30);
      ctx.fillText("Lives: "+lives, canvas.width-100,30);
    }
  
    function drawGameOver() {
      ctx.fillStyle="rgba(0,0,0,0.7)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="white";
      ctx.font="40px Arial";
      ctx.fillText("GAME OVER",canvas.width/2-120,canvas.height/2-20);
      ctx.font="20px Arial";
      ctx.fillText("Final Score: "+score,canvas.width/2-90,canvas.height/2+20);
      ctx.fillText("Press ANY KEY to restart",canvas.width/2-140,canvas.height/2+60);
    }
  
    function drawStartScreen() {
      ctx.fillStyle="rgba(0,0,0,0.7)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="white";
      ctx.font="30px Arial";
      ctx.fillText("Catch the Ball 🎯",canvas.width/2-120,canvas.height/2-20);
      ctx.font="20px Arial";
      ctx.fillText("Press ANY KEY to start",canvas.width/2-90,canvas.height/2+20);
    }
  
    function updatePlayer() {
      player.x += player.dx;
      if (player.x<0) player.x=0;
      if (player.x+player.width>canvas.width) player.x=canvas.width-player.width;
    }
  
    function restartGame() {
      score=0;
      lives=3;
      gameOver=false;
      ballSpeed=3;
      balls=[];
      gameStarted=false;
    }
  
    // Main loop
    function update() {
      if (bgImg.complete) ctx.drawImage(bgImg,0,0,canvas.width,canvas.height);
      else { ctx.fillStyle="#444"; ctx.fillRect(0,0,canvas.width,canvas.height); }
  
      if (!gameStarted) {
        drawStartScreen();
      } else if (!gameOver) {
        drawPlayer();
        drawBalls();
        drawHUD();
        updatePlayer();
        updateBalls();
      } else {
        drawGameOver();
      }
  
      requestAnimationFrame(update);
    }
  
    setInterval(() => { if (gameStarted && !gameOver) createBall(); },1000);
    update();
  }
  