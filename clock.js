var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height /2;


ctx.translate(radius,radius);
radius = radius*0.90;
setInterval(drawClock,1000);

function drawClock(){

  drawFace(ctx, radius);
  drawNumbers(ctx,radius);
  drawTime(ctx,radius);
 
}

function drawFace(ctx, radius){
  var grad;
  ctx.beginPath();
  ctx.arc(0,0,radius,0,2*Math.PI);
  ctx.fillStyle = "White";
  ctx.fill();

  grad = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0,0, radius*0.05, 0,2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(){
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "Center";

  for(num=1;num<=12;num++){
    ang = num*Math.PI/6;
    ctx.rotate(ang);
    ctx.translate(0,-radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(),0,0);
    ctx.rotate(ang);
    ctx.translate(0,radius*0.85);
    ctx.rotate(-ang);
  }

}

function drawTime(ctx,radius){
  var now = new Date();
  var hour = now.getHours();

  var minute = now.getMinutes();
  var second = now.getSeconds();

  var hr = hour%12;
  hr = hr.toString();
  var min= minute.toString();
  var sec = second.toString();

  var timeDigital = hr+":"+min+":"+sec;

  document.getElementById("digital").innerHTML =timeDigital;

  var color = "#333";
  hour = hour%12;

  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));

  drawHand(ctx,hour,radius*0.5,radius*0.07,color);

  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx,minute,radius*0.7,radius*0.05,color);

  color = "Red";
  second = (second*Math.PI/30);
  drawHand(ctx,second,radius*0.7,radius*0.02,color);
}

function drawHand(ctx,pos,length,width,color){

  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.linecap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0,-length);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.rotate(-pos);

  ctx.beginPath();
  ctx.arc(0,0, radius*0.05, 0,2*Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}