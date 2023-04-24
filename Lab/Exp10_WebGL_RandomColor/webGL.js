const canvas = document.getElementById('my_Canvas');
const gl = canvas.getContext('experimental-webgl');

function randomColor() {
    return [Math.random(), Math.random(), Math.random(), 1.0];
}

const heptagonColor = randomColor();

const heptagonVertices = [0, 0, 0];
const heptagonIndices = [];

const numSides = 24;
const angleStep = (2 * Math.PI) / numSides;

for (let i = 0; i < numSides; i++) {
    const angle = i * angleStep;
    heptagonVertices.push(Math.cos(angle), Math.sin(angle), 0);
    if (i < numSides - 1) {
        heptagonIndices.push(0, i + 1, i + 2);
    } else {
        heptagonIndices.push(0, i + 1, 1);
    }
}

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(heptagonVertices), gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(heptagonIndices), gl.STATIC_DRAW);

const vertCode = `
attribute vec3 coordinates;
void main(void) {
    gl_Position = vec4(coordinates, 1.0);
}`;

const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

const fragCode = `
precision mediump float;
uniform vec4 uColor;
void main(void) {
    gl_FragColor = uColor;
}`;

const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

const uColor = gl.getUniformLocation(shaderProgram, 'uColor');
gl.uniform4fv(uColor, heptagonColor);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.drawElements(gl.TRIANGLES, heptagonIndices.length, gl.UNSIGNED_SHORT, 0);
