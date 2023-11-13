let paddleX;
let paddleWidth;
let paddleHeight;
let ballX;
let ballY;
let ballRadius;
let ballXSpeed;
let ballYSpeed;
let brickWidth;
let brickHeight;
let brickRows;
let brickColumns;
let bricks;
let lives;
let ClearFlag;

function setup() {
  createCanvas(400, 400);
  paddleWidth = 80;
  paddleHeight = 10;
  paddleX = width / 2 - paddleWidth / 2;
  ballRadius = 10;
  ballX = width / 2;
  ballY = height / 2;
  ballXSpeed = 3;
  ballYSpeed = -3;
  brickWidth = 40;
  brickHeight = 30;
  brickRows = 5;
  brickColumns = 10;
  bricks = createBricks();
  lives = 3; // 初期のライフ数
  ClearFlag = false;
}

function draw() {
  background(255);
  movePaddle();
  drawPaddle();
  moveBall();
  drawBall();
  drawBricks();
  checkCollision();
  drawLives();
}

function movePaddle() {
  if (keyIsDown(LEFT_ARROW)) {
    paddleX -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 5;
  }
  if (paddleX < 0) {
    paddleX = 0;
  }
  if (paddleX + paddleWidth > width) {
    paddleX = width - paddleWidth;
  }
}

function drawPaddle() {
  fill(255);
  rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
}

function moveBall() {
  ballX += ballXSpeed;
  ballY += ballYSpeed;
  if (ballX - ballRadius < 0 || ballX + ballRadius > width) {
    ballXSpeed *= -1;
  }
  if (ballY - ballRadius < 0) {
    ballYSpeed *= -1;
  }
  if (ballY + ballRadius > height) {
    // ボールが底に到達した場合、ライフを減らす
    lives--;
    if (lives > 0) {
      // 残りのライフがある場合、ボールとパドルの位置をリセットする
      ballX = width / 2;
      ballY = height / 2;
      ballXSpeed = 3;
      ballYSpeed = -3;
    } else {
      // 残りのライフがない場合、ゲームオーバー
      gameOver();
    }
  }
}

function drawBall() {
  fill(255);
  ellipse(ballX, ballY, ballRadius * 2, ballRadius * 2);
}

function createBricks() {
  let bricks = [];
  for (let row = 0; row < brickRows; row++) {
    for (let column = 0; column < brickColumns; column++) {
      // Exclude the blocks within one cell of the borders
      if (
        row > 0 &&
        row < brickRows - 1 &&
        column > 0 &&
        column < brickColumns - 1
      ) {
        let x = column * brickWidth;
        let y = row * brickHeight;
        bricks.push({ x, y });
      }
    }
  }
  return bricks;
}

function drawBricks() {
  for (let brick of bricks) {
    fill(255);
    rect(brick.x, brick.y, brickWidth, brickHeight);
  }
}

function checkCollision() {
  // ボールとパドルの当たり判定
  if (
    ballY + ballRadius > height - paddleHeight &&
    ballX + ballRadius > paddleX &&
    ballX - ballRadius < paddleX + paddleWidth
  ) {
    ballYSpeed *= -1;
  }

  // ボールとブロックの当たり判定
  for (let brick of bricks) {
    if (
      ballX + ballRadius > brick.x &&
      ballX - ballRadius < brick.x + brickWidth &&
      ballY + ballRadius > brick.y &&
      ballY - ballRadius < brick.y + brickHeight
    ) {
      bricks.splice(bricks.indexOf(brick), 1);
      ballYSpeed *= -1;
    }
  }
  if (bricks.length === 0) {
    showClearScreen();
  }
}

function drawLives() {
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`ライフ: ${lives}`, 5, 5);
}

function gameOver() {
  background(255);
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  textSize(20);
  text("Press SPACE to Restart", width / 2, height / 2 + 50);
  noLoop();
}

function keyPressed() {
  if (keyCode == 32 && lives == 0) {
    // スペースキーが押され、かつライフが0の場合
    setup();
    loop();
  } else if (keyCode == 32 && ClearFlag == true) {
    setup();
    loop();
  }
}
function showClearScreen() {
  background(255);
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Clear!", width / 2, height / 2);
  textSize(20);
  text("Press SPACE to Restart", width / 2, height / 2 + 50);
  noLoop();
  ClearFlag = true;
}
