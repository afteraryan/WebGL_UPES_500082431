import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import * as CANNON from 'cannon-es'

const canvas = document.querySelector('.webgl');
const can1: HTMLCanvasElement = canvas as HTMLCanvasElement;
const canvas2 = document.querySelector('.webgl2');
const can2: HTMLCanvasElement = canvas2 as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: can1,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true
const renderer2 = new THREE.WebGLRenderer({
    canvas: can2,
    antialias: true
});
renderer2.setSize(window.innerWidth / 3, window.innerHeight / 3);
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.shadowMap.enabled = true


const scene = new THREE.Scene()

let insetWidth, insetHeight;
const aspect = window.innerWidth/window.innerHeight;

const camera = new THREE.PerspectiveCamera(
    75,
    aspect,
    0.1,
    1500
)
camera.position.set(0,30,-50)

let cameraSide = new THREE.PerspectiveCamera(
    90,
    aspect,
    0.01,
    1500
)
cameraSide.position.set(40,8,0);
cameraSide.lookAt(0,0,0)

cameraSide.name = "SideCamera"

scene.add(cameraSide);
scene.add(camera);

new OrbitControls(camera, renderer.domElement)


var mobileMaterial = [
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/indigo_lf.jpg')}),   // right
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/indigo_rt.jpg')}),     // left
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/indigo_up.jpg')}),    // topt
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/indigo_dn.jpg')}),    // bottom
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/indigo_ft.jpg')}),    // front
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/indigo_bk.jpg')})   //back
];

for(var i=0;i<6;i++){
    mobileMaterial[i].side= THREE.BackSide;
}

const pointLight = new THREE.AmbientLight( 0xffffff, 1);
pointLight.position.set( 0, 10, 0 );
pointLight.intensity = 5;
scene.add( pointLight );


const geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
const cube = new THREE.Mesh( geometry, mobileMaterial );
scene.add( cube );

var modelgrp = new THREE.Group();
const loader = new GLTFLoader();
loader.load('./img/cube.glb', function(glb) {
    console.log(glb);
    const root = glb.scene;
    root.scale.set(5, 5, 5);
    root.position.set(0, 0, 0);
    
    modelgrp.add(root);
    modelgrp.add(cameraSide);
    scene.add(modelgrp);    
})


window.addEventListener('resize', onWindowResize)
function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

    insetWidth = window.innerWidth/4;
    insetHeight = window.innerHeight/4;

    cameraSide.aspect = insetWidth / insetHeight;
    cameraSide.updateProjectionMatrix();
    render()
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event: { which: any }) {
    var keyCode = event.which;
    // up
    if (keyCode == 87) {
        cube.position.z -= 10;
        // down
    } else if (keyCode == 83) {
        cube.position.z += 10;
        // left
    } else if (keyCode == 65) {
        cube.position.x -= 10;
        // right
    } else if (keyCode == 68) {
        cube.position.x += 10;
        // space
    } else if (keyCode == 32) {
        cube.position.x = 0.0;
        cube.position.y = 0.0;
    } else if (keyCode == 81) {
        cube.rotation.z += -25;
    } else if (keyCode == 69){
        cube.rotation.z += 25;
    }
    render();
};

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    

    stats.update()
    render()
}

function render() {
    renderer.render(scene, camera)
    //renderer2.render(scene, cameraSide)
}

animate()
