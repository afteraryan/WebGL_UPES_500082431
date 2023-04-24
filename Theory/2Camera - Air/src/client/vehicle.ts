import * as THREE from 'three'
import { Vector3 } from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Color } from 'three/src/Three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
var camera2 = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

const canvas1= document.querySelector(".canvas1");
const can1: HTMLCanvasElement= canvas1 as HTMLCanvasElement;
const canvas2= document.querySelector(".canvas2");
const can2: HTMLCanvasElement= canvas2 as HTMLCanvasElement;


var renderer = new THREE.WebGLRenderer({
    canvas:can1
});
renderer.setSize(1500, 1400);
document.body.appendChild(renderer.domElement);

var renderer2 = new THREE.WebGLRenderer({
    canvas:can2
})
renderer2.setSize(1500/4, 1400/6)
document.body.appendChild(renderer2.domElement)

var geometry = new THREE.PlaneGeometry(10000,10000);
var material = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI/2;
scene.add(plane);
plane.position.y-=300;
plane.position.x=300;

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( './assets/miramar_ft.png');
let texture_bk = new THREE.TextureLoader().load( './assets/miramar_bk.png');
let texture_up = new THREE.TextureLoader().load( './assets/miramar_up.png');
let texture_dn = new THREE.TextureLoader().load( './assets/miramar_dn.png');
let texture_rt = new THREE.TextureLoader().load( './assets/miramar_rt.png');
let texture_lf = new THREE.TextureLoader().load( './assets/miramar_lf.png');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

var pointLight= new THREE.PointLight(0xffffff,5);
pointLight.position.set(10,10,10);
scene.add(pointLight);

//model loader
const loader = new GLTFLoader();
var grp = new THREE.Group()
loader.load( './assets/heavy_army_truck_summer_version.glb', function ( gltf ) {
    grp.add(gltf.scene)
	scene.add( grp );

}, undefined, function ( error ) {

	console.error( error );

} );
const controls = new PointerLockControls(camera2, renderer.domElement)
window.addEventListener('mousedown',()=>{
    controls.lock()
})
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "ArrowDown"){
        // Handle "down"
    //    grp.position.x+=0.5;
        controls.moveForward(-20);
} else if (event.code === "ArrowUp"){
        // Handle "up"
        // grp.position.x-=0.5;
        controls.moveForward(20);
    } else if (event.code === "ArrowLeft"){
        // Handle "left"
        // grp.position.z+=0.5;
        controls.moveRight(-2);
    } else if (event.code === "ArrowRight"){
        // Handle "right"
        // grp.position.z-=0.5;
        controls.moveRight(2);
    }
    event.preventDefault();
  }, true);

// const controls2 = new OrbitControls(camera2, renderer2.domElement)
// controls2.update();

camera.position.x = 5;
camera2.position.x = -5



// camera2.position.y = 5
grp.position.x +=0.01;
camera2.position.x +=0.01;
camera.position.x += 0.05;
const stats = Stats()
document.body.appendChild(stats.dom)

// const cameraOffset = new Vector3(0.0, 1.0, -1.0); // NOTE Constant offset between the camera and the target

// // NOTE Assuming the camera is direct child of the Scene
// const objectPosition = new Vector3();
// grp.getWorldPosition(objectPosition);

// camera.position.copy(objectPosition).add(cameraOffset);


var render = function () {
    requestAnimationFrame(render);
    stats.update()
    camera.lookAt(grp.position);
    grp.position.set(camera2.position.x -10,camera2.position.y-10,camera2.position.z);
    renderer.render(scene, camera2);
    renderer2.render(scene, camera)
};

render();