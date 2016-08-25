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
function spiral(ctx, x, y, r){
  var currentAngle = Math.PI * 0.25;
  var angleStep = Math.PI * -0.1;
  var radiusRateChange = (94.0 / 95.0);
  var xIni, yIni, xEnd, yEnd, xControl, yControl;
  var centerx = x + r, centery = y + r;
  ctx.beginPath();
  var init = false;
  while(r > 5){ 
    xIni = (Math.cos(currentAngle) * r) + centerx;
    yIni = (Math.sin(currentAngle) * r) + centery;
    if(!init){
      ctx.moveTo(xIni, yIni);
      init = true;

    }
    currentAngle = currentAngle + (angleStep / 2.0);

    r =  radiusRateChange * r;

    
    xControl = (Math.cos(currentAngle) * r) + centerx;
    yControl = (Math.sin(currentAngle) * r) + centery;
    currentAngle = currentAngle + (angleStep / 2.0);

    r =  radiusRateChange * r;

    xEnd = (Math.cos(currentAngle) * r) + centerx;
    yEnd = (Math.sin(currentAngle) * r) + centery;

    ctx.arcTo(xControl, yControl, xEnd, yEnd, r);
    
  }
  cx.stroke();
  cx.closePath();

}
function star(ctx, x, y, r){
  ctx.save();

  ctx.translate(x + r, y + r);
  var currentAngle = 0;
  var angleStep = Math.PI * (0.25);

  ctx.beginPath();
  ctx.moveTo(r, 0);
  var newX, newY;
  while (currentAngle < Math.PI * 2){
    currentAngle += angleStep;
    newX = Math.cos(currentAngle) * r;
    newY = Math.sin(currentAngle) * r;
    ctx.quadraticCurveTo(0,0,newX, newY);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

trapezoid(cx,0,0,100,100);
cx.fillStyle = "red";
diamond(cx,125,0,100);
zigzag(cx,250,0,100,100,10);
cx.fillStyle = "blue";
cx.strokeStyle = "black"
spiral(cx,375,0,50);
star(cx,500,0,50);
