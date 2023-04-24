// Get WebGL context
var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

// Vertex shader code
var vertCode = `
attribute vec4 coordinates;
attribute vec2 aTexCoord;
uniform mat4 uRotationMatrix;
varying vec2 vTexCoord;

void main(void) {
    gl_Position = uRotationMatrix * coordinates;
    vTexCoord = aTexCoord;
}`;

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

// Fragment shader code
var fragCode = `
precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D sampler;

void main(void) {
    gl_FragColor = texture2D(sampler, vTexCoord);
}`;

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

// Create and link shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Vertex data
var vertices = [
    -0.5,  0.5, 0.0,  0.0, 1.0,
    -0.5, -0.5, 0.0,  0.0, 0.0,
     0.5, -0.5, 0.0,  1.0, 0.0,
     0.5,  0.5, 0.0,  1.0, 1.0
];

var indices = [0, 1, 2, 0, 2, 3];

// Create and bind vertex buffer
var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Set vertex attributes
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 20, 0);
gl.enableVertexAttribArray(coord);

var texCoordAttrib = gl.getAttribLocation(shaderProgram, "aTexCoord");
gl.vertexAttribPointer(texCoordAttrib, 2, gl.FLOAT, false, 20, 12);
gl.enableVertexAttribArray(texCoordAttrib);

// Create and bind index buffer
var index_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

// Load texture and create sampler
function loadTexture(imageURL, callback) {
    var image = new Image();
    image.crossOrigin = '';
    image.onload = function () {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        callback(texture);
    };
    image.src = imageURL;
}

loadTexture('/path/to/sample-image.jpg', function (texture) {
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.activeTexture(gl.TEXTURE0);
    var samplerUniformLocation = gl.getUniformLocation(shaderProgram, "sampler");
gl.uniform1i(samplerUniformLocation, 0);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

var rotationAngle = 0;
var rotationSpeed = 0.05; // Controls the rotation speed

function getRotationMatrix(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return [        c, -s, 0, 0,        s, c, 0, 0,        0, 0, 1, 0,        0, 0, 0, 1    ];
}

function drawScene() {
    rotationAngle += rotationSpeed;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var rotationMatrix = getRotationMatrix(rotationAngle);
    var uRotationMatrix = gl.getUniformLocation(shaderProgram, 'uRotationMatrix');
    gl.uniformMatrix4fv(uRotationMatrix, false, new Float32Array(rotationMatrix));

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(drawScene);
}

drawScene();
});


