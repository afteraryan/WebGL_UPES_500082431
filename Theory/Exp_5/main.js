var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

var vertices = [
    0.2, 0.5, 0,
    0.2, -0.3, 0,
    -0.2, 0, 0,
    0.3, 0, 0,
    -0.2, 0, 0,
    0.2, 0.5, 0,
];

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

var vertCode =
    'attribute vec3 coordinates;' +
    'void main(void) {' +
    ' gl_Position = vec4(coordinates, 1.0);' +
    '}';

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);' +
    '}';

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.LINES, 0, vertices.length / 3);
