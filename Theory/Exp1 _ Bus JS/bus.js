// JavaScript code to draw the bus
function drawBus() {
    // Create a canvas element
    var canvas = document.createElement("canvas");
    canvas.id = "bus";
    canvas.style = "border: 1px black solid;"
    document.body.appendChild(canvas);
  
    // Get the canvas context
    var ctx = canvas.getContext("2d");

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
  
  // Call the function to draw the bus when the page loads
  window.onload = drawBus;
  