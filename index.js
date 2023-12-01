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
  ResetPosition();

  // Mission1: ブロックの幅と高さ、行数と列数を設定しよう！
  brickWidth = 0;
  brickHeight = 0;
  brickRows = 0;
  brickColumns = 0;

  bricks = createBricks();
  lives = 3; // 初期のライフ数
  ClearFlag = false;
}

function ResetPosition() {
  ballX = width / 2;
  ballY = height / 2;

  // Extra2: ボールの速度を変更してみよう
  ballXSpeed = 3;
  ballYSpeed = -3;
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

  // Mission2: パドルの移動を実装しよう
  

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
  if (ballX - ballRadius < 0) {
    ballX = ballRadius; // 左の壁にボールが埋まらないようにする
    ballXSpeed *= -1;
  }
  if (ballX + ballRadius > width) {
    ballX = width - ballRadius; // 右の壁にボールが埋まらないようにする
    ballXSpeed *= -1;
  }
  if (ballY - ballRadius < 0) {
    ballY = ballRadius; // 上の壁にボールが埋まらないようにする
    ballYSpeed *= -1;
  }
  if (ballY + ballRadius > height) {
    // ボールが底に到達した場合、ライフを減らす
    lives--;

    //Mission3: ボールとパドルの位置をリセットさせよう

    
  }
}

function drawBall() {
  fill(255);
  ellipse(ballX, ballY, ballRadius * 2, ballRadius * 2);
}

function createBricks() {
  let bricks = [];
  brickRows += 2;
  brickColumns += 2;
  for (let row = 0; row < brickRows; row++) {
    for (let column = 0; column < brickColumns; column++) {
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
  // ボールとパドルの衝突を検出する
  if (
    ballY + ballRadius > height - paddleHeight &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    console.info("Ball hits paddle");
    reverseBallYSpeed();

    // パドルの中心からの距離
    let deltaX = ballX - (paddleX + paddleWidth / 2);
    adjustBallSpeed(deltaX);
  }

  // ボールとレンガの衝突を検出する
  checkBrickCollisions();
}

function reverseBallYSpeed() {
  ballYSpeed *= -1;
}

function adjustBallSpeed(deltaX) {
  let currentSpeed = calculateCurrentSpeed();
  let angle = deltaX * 0.05;
  ballXSpeed = currentSpeed * Math.sin(angle);
  ballYSpeed = -Math.abs(currentSpeed * Math.cos(angle));
}

function calculateCurrentSpeed() {
  return Math.sqrt(ballXSpeed ** 2 + ballYSpeed ** 2);
}

function checkBrickCollisions() {
  for (let brick of bricks) {
    if (
      ballX + ballRadius > brick.x &&
      ballX - ballRadius < brick.x + brickWidth &&
      ballY + ballRadius > brick.y &&
      ballY - ballRadius < brick.y + brickHeight
    ) {
      bricks.splice(bricks.indexOf(brick), 1);
      reverseBallYSpeed();
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

  //Mission4: ライフを表示してみよう

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
  // スペースキーが押され、かつライフが0の場合
  if (keyCode == 32 && lives == 0) {
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
  //Mission5: クリアメッセージを表示させてみよう

  textSize(20);
  text("Press SPACE to Restart", width / 2, height / 2 + 50);
  noLoop();
  ClearFlag = true;
}
