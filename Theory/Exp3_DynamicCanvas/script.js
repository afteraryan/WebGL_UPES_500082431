var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var xSlider = document.getElementById("xSlider");
var ySlider = document.getElementById("ySlider");

var x = xSlider.value;
var y = ySlider.value;

xSlider.oninput = function() {
    x = this.value;
    drawCircle();
}

ySlider.oninput = function() {
    y = this.value;
    drawCircle();
}

function drawCircle() {
    // Create a canvas element
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setTransform(1,0,0,1,x,y);

    //Draw Back Wheels
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.arc(30, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(130, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  
    // Draw the bus body
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, 200, 100);
  
    // Draw the wheels
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(65, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(165, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  
    // Draw the windows
    ctx.fillStyle = "black";
    ctx.fillRect(10, 15, 60, 35);
    ctx.fillStyle = "grey";
    ctx.fillRect(80, 20, 30, 30);
    ctx.fillRect(120, 20, 30, 30);
    ctx.fillRect(160, 20, 30, 30);

    //Draw Passngers
    // set line stroke and line width
    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(125, 40);
    ctx.lineTo(125, 50);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(128, 40);
    ctx.lineTo(128, 50);
    ctx.stroke();


    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 5;
    // draw a red line
    ctx.beginPath();
    ctx.moveTo(125+40, 40);
    ctx.lineTo(125+40, 50);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(128+40, 40);
    ctx.lineTo(128+40, 50);
    ctx.stroke();

    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 5;
    // draw a red line
    ctx.beginPath();
    ctx.moveTo(125-40, 40);
    ctx.lineTo(125-40, 50);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(128-40, 40);
    ctx.lineTo(128-40, 50);
    ctx.stroke();
}

drawCircle();
