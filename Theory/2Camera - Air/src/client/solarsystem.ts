import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(1500, 1400);
document.body.appendChild(renderer.domElement);

const materialPlanet= {
    roughness:0.3,
    transmission:1.0,
    ior:1.7,
    thickness:0.5,
    specularIntensity:1.0,
    clearcoat:1.0
}

var geometry = new THREE.SphereGeometry(3, 30, 30, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

var geometry3 = new THREE.SphereGeometry(6, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
var material3 = new THREE.MeshPhysicalMaterial(materialPlanet);
var outer = new THREE.Mesh(geometry3, material3);
scene.add(cube,outer);

const geometry1=  new THREE.TorusGeometry(7,1,16,50);
const geometry2=  new THREE.TorusGeometry(10,1,16,50);
const material2= new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus= new THREE.Mesh(geometry1,material2);
const torus2= new THREE.Mesh(geometry2,material2);
scene.add(torus, torus2);

//star
function addstar(){
    const geometry3= new THREE.SphereGeometry(0.25,24,24);
    const material3= new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    const star= new THREE.Mesh(geometry3, material3);

    var arr= [];
    for(var i=0;i<3;i++){
        
    arr[i]=Math.floor(Math.random() * (40+40)-40);
    }
    star.position.set(arr[0], arr[1], arr[2]);
    scene.add(star);
}
for(var i =0; i<100; i++){
    addstar();
}

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
   
let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

//light
const pointLight= new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);

// var dirtlight = new THREE.DirectionalLight(0xffff00, 2);
// dirtlight.position.set(400,400,400)

const ambientLight= new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.z = 10;
const stats = Stats()
document.body.appendChild(stats.dom)

//Create Sun
function createSun(x:number,y:number,z:number){
    var dirtlight = new THREE.DirectionalLight(0xffff00, 2);
    dirtlight.position.set(x,y,z)

    // var ambLight = new THREE.AmbientLight(0xffaa00);
    
    var geometrySun = new THREE.SphereGeometry(40, 40, 40, 0, Math.PI * 2, 0, Math.PI * 2);

    const SunTexture = new THREE.TextureLoader().load('./assets/2k_sun.jpg');
    SunTexture.repeat.set(1,1);
    var materialSun = new THREE.MeshStandardMaterial({
        map : SunTexture
    });
    var sun = new THREE.Mesh(geometrySun, materialSun);
    sun.position.set(x,y,z);
    scene.add(dirtlight,sun);
}
createSun(50,50,50);

var render = function () {
    requestAnimationFrame(render);

    cube.rotation.y += 0.01;
    torus.rotation.x +=0.01;
    torus.rotation.y +=0.005;
    torus2.rotation.x +=0.01;
    // torus2.rotation.y +=0.005;
    stats.update()
    renderer.render(scene, camera);
};

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

render();