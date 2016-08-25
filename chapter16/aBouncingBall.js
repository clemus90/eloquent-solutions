function Vector(x, y){
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(vector){
  return new Vector(this.x + vector.x, this.y + vector.y);
}

Vector.prototype.scale = function(factor){
  return new Vector(this.x * factor, this.y * factor);
}

Vector.prototype.scaleX = function(factor){
  return new Vector(this.x * factor, this.y);
}

Vector.prototype.scaleY = function(factor){
  return new Vector(this.x, this.y * factor);
}

function Ball(radious, position, speed){
  this.radious = radious;
  this.position = position;
  this.speed = speed;
}

function Boundary(canvas, ball){
  this.canvas = canvas;
  this.ball = ball;
}

Boundary.prototype.moveBall = function(step){
  var nextCenter = this.ball.position.plus(this.ball.speed.scale(step));
  if(nextCenter.x < this.ball.radious || nextCenter.x > this.canvas.width - this.ball.radious){
    this.ball.speed = this.ball.speed.scaleX(-1);
  }
  else if(nextCenter.y < this.ball.radious || nextCenter.y > this.canvas.height - this.ball.radious){
    this.ball.speed = this.ball.speed.scaleY(-1);
  }else{
    this.ball.position = nextCenter;
  }
}

Boundary.prototype.clear = function(){
  cx.fillStyle = "#03855F";
  cx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomBallPosition(canvas, radious){
  var availableWidth = canvas.width - 2 * radious;
  var availableHeight = canvas.height - 2 * radious;

  var xPos, yPos;

  xPos = Math.random() * availableWidth;
  yPos = Math.random() * availableHeight;

  return new Vector(xPos, yPos);
}

function randomSpeedVector(maxSpeed){
  var angle = Math.random() * Math.PI * 2;
  var speed = Math.random() * maxSpeed;

  return new Vector(
    Math.cos(angle) * speed,
    Math.sin(angle) * speed
  );
}


var canvas = document.querySelector("canvas");
var cx = canvas.getContext("2d");

var bound = new Boundary(canvas, new Ball( 25, randomBallPosition(canvas, 25), randomSpeedVector(200)));

var lastTime = null;
function frame(time) {
  if (lastTime != null)
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function updateAnimation(step) {
  bound.clear();
  bound.moveBall(step);
  cx.beginPath();
  cx.fillStyle = "white";
  var ballPos = bound.ball.position;
  var ballRadious = bound.ball.radious;
  cx.arc(ballPos.x, ballPos.y, ballRadious, 0, 7);
  cx.fill();
}