
  function drawAryan() {
    // Create a canvas element
    var canvas = document.createElement("canvas");
    canvas.id = "aryan";
    document.body.appendChild(canvas);

    // Get the canvas context
    var ctx = canvas.getContext("2d");

    //set canvas width and height
    canvas.width = 400;
    canvas.height = 100;
    var OrgX=0;
    var OrgY=0;

    // Draw the letter A
    ctx.beginPath();
    ctx.moveTo(OrgX+50, OrgY+50);
    ctx.lineTo(OrgX+50, OrgY+20);
    ctx.lineTo(OrgX+70, OrgY+20);
    ctx.moveTo(OrgX+70, OrgY+20);
    ctx.lineTo(OrgX+70, OrgY+50);
    ctx.moveTo(OrgX+70, OrgY+35);
    ctx.lineTo(OrgX+50, OrgY+35);
    ctx.stroke();

    // Draw the letter R
    ctx.beginPath();
    ctx.moveTo(OrgX+80, OrgY+50);
    ctx.lineTo(OrgX+80, OrgY+20);
    ctx.lineTo(OrgX+100, OrgY+20);
    ctx.moveTo(OrgX+100, OrgY+20);
    ctx.lineTo(OrgX+100, OrgY+35);
    ctx.moveTo(OrgX+100, OrgY+35);
    ctx.lineTo(OrgX+80, OrgY+35);
    ctx.moveTo(OrgX+80, OrgY+35);
    ctx.lineTo(OrgX+100, OrgY+50);
    ctx.stroke();

    //Draw the letter S
    ctx.beginPath();
    ctx.moveTo(OrgX+110, OrgY+20);
    ctx.lineTo(OrgX+110, OrgY+35);
    ctx.moveTo(OrgX+110, OrgY+20);
    ctx.lineTo(OrgX+130, OrgY+20)
    ctx.moveTo(OrgX+110, OrgY+35);
    ctx.lineTo(OrgX+130, OrgY+35);
    ctx.moveTo(OrgX+130, OrgY+35);
    ctx.lineTo(OrgX+130, OrgY+50);
    ctx.moveTo(OrgX+130, OrgY+50);
    ctx.lineTo(OrgX+110, OrgY+50);
    ctx.stroke();

    
    }
    
// Call the function to draw the text when the page loads
window.onload = drawAryan;
