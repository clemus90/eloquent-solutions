var canvas = document.querySelector("canvas");
var cx = canvas.getContext("2d");

canvas.width = 1000;


function trapezoid(ctx, x, y, width, height){
  var factor = width / 5;
  ctx.moveTo(x+factor,y);
  ctx.lineTo((x+width)-factor, y);
  ctx.lineTo(x+width, y+height);
  ctx.lineTo(x, y+height);
  ctx.closePath();
  ctx.stroke();
}

function diamond(ctx, x, y, side){
  var angle = 0.25 * Math.PI; 
  var newSide = Math.sqrt((side*side)/2);
  ctx.save();
  ctx.translate(x + Math.cos(angle) * newSide,y);
  ctx.rotate(angle);
  ctx.fillRect(0,0,newSide,newSide);
  ctx.restore();
}

function zigzag(ctx, x, y, width, height, ends){
  var yStep = height / ends;
  ctx.moveTo(x,y);
  var atXEnd = false;
  var currentY = y + yStep;
  for(var i=0; i<ends; i++){
    ctx.lineTo(atXEnd ? x : x + width, currentY);
    atXEnd = !atXEnd;
    currentY += yStep;
  }
  ctx.stroke();
}
function spiral(){}
function star(){}

trapezoid(cx,0,0,100,100);
cx.fillStyle = 'red';
diamond(cx,125,0,100);
cx.fillStyle = 'black';
zigzag(cx,250,0,100,100,10);