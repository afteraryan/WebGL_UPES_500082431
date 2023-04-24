import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(1500, 1400);
document.body.appendChild(renderer.domElement);

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

const pointLight= new THREE.PointLight(0xffffff);
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

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "ArrowDown"){
        // Handle "down"
       grp.position.x+=0.5;
    } else if (event.code === "ArrowUp"){
        // Handle "up"
        grp.position.x-=0.5;
       
    } else if (event.code === "ArrowLeft"){
        // Handle "left"
        grp.position.z+=0.5;
      
    } else if (event.code === "ArrowRight"){
        // Handle "right"
        grp.position.z-=0.5;
       
    }
    event.preventDefault();
  }, true);

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 10;
const stats = Stats()
document.body.appendChild(stats.dom)


var render = function () {
    requestAnimationFrame(render);
    stats.update()
    renderer.render(scene, camera);
};

render();