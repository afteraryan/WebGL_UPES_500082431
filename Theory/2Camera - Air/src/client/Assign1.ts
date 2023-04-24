import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import * as CANNON from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()


const light = new THREE.DirectionalLight()
light.position.set(25, 50, 25)
light.castShadow = true
light.intensity = 2;
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
light.shadow.camera.top = 100
light.shadow.camera.bottom = -100
light.shadow.camera.left = -100
light.shadow.camera.right = 100
scene.add(light)

const helper = new THREE.CameraHelper(light.shadow.camera)
//scene.add(helper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
    )
const camera2 = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    )
    
    const chaseCam = new THREE.Object3D()
    chaseCam.position.set(0, 0, 0)
    const chaseCamPivot = new THREE.Object3D()
    chaseCamPivot.position.set(0, 2, 4)
    chaseCam.add(chaseCamPivot)
    scene.add(chaseCam)
    
    const can1=document.querySelector(".webgl");
const can2=document.querySelector(".webgl2");

const cana: HTMLCanvasElement = can1 as HTMLCanvasElement;
const canb: HTMLCanvasElement = can2 as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({canvas: cana});
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

const renderer2 = new THREE.WebGLRenderer({canvas: canb});
renderer2.setSize(window.innerWidth/4, window.innerHeight/4)
// document.body.appendChild(renderer2.domElement)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

renderer2.shadowMap.enabled = true
renderer2.shadowMap.type = THREE.PCFSoftShadowMap

    
    const phongMaterial = new THREE.MeshPhongMaterial()
    
    const world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    new OrbitControls (camera, renderer.domElement);
    
const groundMaterial = new CANNON.Material('groundMaterial')
groundMaterial.friction = 0.25
groundMaterial.restitution = 0.25

const wheelMaterial = new CANNON.Material('wheelMaterial')
wheelMaterial.friction = 0.25
wheelMaterial.restitution = 0.25

//skybox
var mobileMaterial2 = [
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/clouds1_east.bmp')}),   // right
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/clouds1_west.bmp')}),     // left
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/clouds1_up.bmp')}),    // topt
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/clouds1_down.bmp')}),    // bottom
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/clouds1_north.bmp')}),    // front
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./img/clouds1_south.bmp')})   //back
  ];
  
  for(var i=0;i<6;i++){
    mobileMaterial2[i].side= THREE.BackSide;
}

const geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
const cube = new THREE.Mesh( geometry, mobileMaterial2);
scene.add( cube );

//ground
const groundGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100, 100)
const groundMesh: THREE.Mesh = new THREE.Mesh(groundGeometry, phongMaterial)
groundMesh.rotateX(-Math.PI / 2)
groundMesh.receiveShadow = true
//scene.add(groundMesh)
const groundShape = new CANNON.Box(new CANNON.Vec3(50, 1, 50))
const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial })
groundBody.addShape(groundShape)
groundBody.position.set(0, -1, 0)
world.addBody(groundBody)

//jumps

for (let i = 0; i < 20; i++) {
    const jump = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.5, 3.5, 5),
        phongMaterial
    )
    jump.position.x = Math.random() * 100 - 50
    jump.position.y = 0.5
    jump.position.z = Math.random() * 100 - 50
    scene.add(jump)

    const cylinderShape = new CANNON.Cylinder(0.01, 1, 0.5, 5)
    const cylinderBody = new CANNON.Body({ mass: 0 })
    cylinderBody.addShape(cylinderShape, new CANNON.Vec3())
    cylinderBody.position.x = jump.position.x
    cylinderBody.position.y = jump.position.y
    cylinderBody.position.z = jump.position.z
    world.addBody(cylinderBody)
}

const carBodyMesh = new THREE.Group()
let loaded;
        const loader = new GLTFLoader()
        loader.load('assets/sukhoi.glb',function (glb) {
loaded=glb.scene;
loaded.scale.set(1,1,1);

                 glb.scene.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                         m.receiveShadow = true
                         m.castShadow = true
                    }
                     if (((child as THREE.Light)).isLight) {
                         const l = (child as THREE.Light)
                        l.castShadow = true
                        l.shadow.bias = -.003
                        l.shadow.mapSize.width = 2048
                         l.shadow.mapSize.height = 2048
                     }
                 })
               // grp.add(loaded);
               loaded.rotateY(Math.PI)
                 carBodyMesh.add(loaded)
                 carBodyMesh.add(camera2)
                 camera2.position.y += 3;
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
          
    scene.add(carBodyMesh)
const carBodyGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 2)
carBodyMesh.position.y = 3
carBodyMesh.castShadow = true
scene.add(carBodyMesh)
carBodyMesh.add(chaseCam)

const carBodyShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 1))
const carBody = new CANNON.Body({ mass: 10 })
carBody.addShape(carBodyShape)
carBody.position.x = carBodyMesh.position.x
carBody.position.y = carBodyMesh.position.y
carBody.position.z = carBodyMesh.position.z
world.addBody(carBody)

//Car 2
var model2 =new THREE.Group()
loader.load( 'assets/sukhoi.glb', function ( gltf ) {

  gltf.scene.scale.set(1,1,1)
  gltf.scene.position.set(2, 1, -25)
  gltf.scene.rotateY(Math.PI);
  model2.add(gltf.scene)
  scene.add(model2)

}, undefined, function ( error ) {

	console.error( error );

} );

const carBodyShape2 = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
const carBody2 = new CANNON.Body({ mass:0 })
carBody2.addShape(carBodyShape2)
carBody2.position.x = model2.position.x
carBody2.position.y = model2.position.y
carBody2.position.z = model2.position.z
world.addBody(carBody2)


//front left wheel
const wheelLFGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
    0.33,
    0.33,
    0.2
)
wheelLFGeometry.rotateZ(Math.PI / 2)
const wheelLFMesh: THREE.Mesh = new THREE.Mesh(wheelLFGeometry, phongMaterial)
wheelLFMesh.position.x = -1
wheelLFMesh.position.y = 3
wheelLFMesh.position.z = -1
wheelLFMesh.castShadow = true
//scene.add(wheelLFMesh)
const wheelLFShape = new CANNON.Sphere(0.33)
const wheelLFBody = new CANNON.Body({ mass: 1, material: wheelMaterial })
wheelLFBody.addShape(wheelLFShape)
wheelLFBody.position.x = wheelLFMesh.position.x
wheelLFBody.position.y = wheelLFMesh.position.y
wheelLFBody.position.z = wheelLFMesh.position.z
world.addBody(wheelLFBody)

//front right wheel
const wheelRFGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
    0.33,
    0.33,
    0.2
)
wheelRFGeometry.rotateZ(Math.PI / 2)
const wheelRFMesh: THREE.Mesh = new THREE.Mesh(wheelRFGeometry, phongMaterial)
wheelRFMesh.position.y = 3
wheelRFMesh.position.x = 1
wheelRFMesh.position.z = -1
wheelRFMesh.castShadow = true
//scene.add(wheelRFMesh)
const wheelRFShape = new CANNON.Sphere(0.33)
const wheelRFBody = new CANNON.Body({ mass: 1, material: wheelMaterial })
wheelRFBody.addShape(wheelRFShape)
wheelRFBody.position.x = wheelRFMesh.position.x
wheelRFBody.position.y = wheelRFMesh.position.y
wheelRFBody.position.z = wheelRFMesh.position.z
world.addBody(wheelRFBody)

//back left wheel
const wheelLBGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
    0.4,
    0.4,
    0.33
)
wheelLBGeometry.rotateZ(Math.PI / 2)
const wheelLBMesh: THREE.Mesh = new THREE.Mesh(wheelLBGeometry, phongMaterial)
wheelLBMesh.position.y = 3
wheelLBMesh.position.x = -1
wheelLBMesh.position.z = 1
wheelLBMesh.castShadow = true
//scene.add(wheelLBMesh)
const wheelLBShape = new CANNON.Sphere(0.4)
const wheelLBBody = new CANNON.Body({ mass: 1, material: wheelMaterial })
wheelLBBody.addShape(wheelLBShape)
wheelLBBody.position.x = wheelLBMesh.position.x
wheelLBBody.position.y = wheelLBMesh.position.y
wheelLBBody.position.z = wheelLBMesh.position.z
world.addBody(wheelLBBody)

//back right wheel
const wheelRBGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(
    0.4,
    0.4,
    0.33
)
wheelRBGeometry.rotateZ(Math.PI / 2)
const wheelRBMesh: THREE.Mesh = new THREE.Mesh(wheelRBGeometry, phongMaterial)
wheelRBMesh.position.y = 3
wheelRBMesh.position.x = 1
wheelRBMesh.position.z = 1
wheelRBMesh.castShadow = true
//scene.add(wheelRBMesh)
const wheelRBShape = new CANNON.Sphere(0.4)
const wheelRBBody = new CANNON.Body({ mass: 1, material: wheelMaterial })
wheelRBBody.addShape(wheelRBShape)
wheelRBBody.position.x = wheelRBMesh.position.x
wheelRBBody.position.y = wheelRBMesh.position.y
wheelRBBody.position.z = wheelRBMesh.position.z
world.addBody(wheelRBBody)

const leftFrontAxis = new CANNON.Vec3(1, 0, 0)
const rightFrontAxis = new CANNON.Vec3(1, 0, 0)
const leftBackAxis = new CANNON.Vec3(1, 0, 0)
const rightBackAxis = new CANNON.Vec3(1, 0, 0)

const constraintLF = new CANNON.HingeConstraint(carBody, wheelLFBody, {
    pivotA: new CANNON.Vec3(-1, -0.5, -1),
    axisA: leftFrontAxis,
    maxForce: 0.99,
})
world.addConstraint(constraintLF)
const constraintRF = new CANNON.HingeConstraint(carBody, wheelRFBody, {
    pivotA: new CANNON.Vec3(1, -0.5, -1),
    axisA: rightFrontAxis,
    maxForce: 0.99,
})
world.addConstraint(constraintRF)
const constraintLB = new CANNON.HingeConstraint(carBody, wheelLBBody, {
    pivotA: new CANNON.Vec3(-1, -0.5, 1),
    axisA: leftBackAxis,
    maxForce: 0.99,
})
world.addConstraint(constraintLB)
const constraintRB = new CANNON.HingeConstraint(carBody, wheelRBBody, {
    pivotA: new CANNON.Vec3(1, -0.5, 1),
    axisA: rightBackAxis,
    maxForce: 0.99,
})
world.addConstraint(constraintRB)

//rear wheel drive
constraintLB.enableMotor()
constraintRB.enableMotor()

const keyMap: { [id: string]: boolean } = {}
const onDocumentKey = (e: KeyboardEvent) => {
    keyMap[e.code] = e.type === 'keydown'
}

let forwardVelocity = 0
let rightVelocity = 0

document.addEventListener('keydown', onDocumentKey, false)
document.addEventListener('keyup', onDocumentKey, false)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()
let delta



const v = new THREE.Vector3()
let thrusting = false

function animate() {
    requestAnimationFrame(animate)

    helper.update()

    delta = Math.min(clock.getDelta(), 0.1)
    world.step(delta)


    // Copy coordinates from Cannon to Three.js
    carBodyMesh.position.set(
        carBody.position.x,
        carBody.position.y,
        carBody.position.z
    )
    carBodyMesh.quaternion.set(
        carBody.quaternion.x,
        carBody.quaternion.y,
        carBody.quaternion.z,
        carBody.quaternion.w
    )
/*
    model2.position.set(
        carBody2.position.x,
        carBody2.position.y,
        carBody2.position.z
    )
    model2.quaternion.set(
        carBody2.quaternion.x,
        carBody2.quaternion.y,
        carBody2.quaternion.z,
        carBody2.quaternion.w
    )
*/

    wheelLFMesh.position.set(
        wheelLFBody.position.x,
        wheelLFBody.position.y,
        wheelLFBody.position.z
    )
    wheelLFMesh.quaternion.set(
        wheelLFBody.quaternion.x,
        wheelLFBody.quaternion.y,
        wheelLFBody.quaternion.z,
        wheelLFBody.quaternion.w
    )

    wheelRFMesh.position.set(
        wheelRFBody.position.x,
        wheelRFBody.position.y,
        wheelRFBody.position.z
    )
    wheelRFMesh.quaternion.set(
        wheelRFBody.quaternion.x,
        wheelRFBody.quaternion.y,
        wheelRFBody.quaternion.z,
        wheelRFBody.quaternion.w
    )

    wheelLBMesh.position.set(
        wheelLBBody.position.x,
        wheelLBBody.position.y,
        wheelLBBody.position.z
    )
    wheelLBMesh.quaternion.set(
        wheelLBBody.quaternion.x,
        wheelLBBody.quaternion.y,
        wheelLBBody.quaternion.z,
        wheelLBBody.quaternion.w
    )

    wheelRBMesh.position.set(
        wheelRBBody.position.x,
        wheelRBBody.position.y,
        wheelRBBody.position.z
    )
    wheelRBMesh.quaternion.set(
        wheelRBBody.quaternion.x,
        wheelRBBody.quaternion.y,
        wheelRBBody.quaternion.z,
        wheelRBBody.quaternion.w
    )

    thrusting = false
    if (keyMap['KeyW'] || keyMap['ArrowUp']) {
        if (forwardVelocity < 25.0) forwardVelocity += 1
        thrusting = true
    }
    if (keyMap['KeyS'] || keyMap['ArrowDown']) {
        if (forwardVelocity > -25.0) forwardVelocity -= 1
        thrusting = true
    }
    if (keyMap['KeyA'] || keyMap['ArrowLeft']) {
        if (rightVelocity > -1.0) rightVelocity -= 0.1
    }
    if (keyMap['KeyD'] || keyMap['ArrowRight']) {
        if (rightVelocity < 1.0) rightVelocity += 0.1
    }
    if (keyMap['Space']) {
        if (forwardVelocity > 0) {
            forwardVelocity -= 1
        }
        if (forwardVelocity < 0) {
            forwardVelocity += 1
        }
    }

    if (!thrusting) {
        //not going forward or backwards so gradually slow down
        if (forwardVelocity > 0) {
            forwardVelocity -= 0.25
        }
        if (forwardVelocity < 0) {
            forwardVelocity += 0.25
        }
    }

    constraintLB.setMotorSpeed(forwardVelocity)
    constraintRB.setMotorSpeed(forwardVelocity)
    constraintLF.axisA.z = rightVelocity
    constraintRF.axisA.z = rightVelocity

    camera.lookAt(carBodyMesh.position)

    chaseCamPivot.getWorldPosition(v)
    if (v.y < 1) {
        v.y = 1
    }
    camera.position.lerpVectors(camera.position, v, 0.05)

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
    renderer2.render(scene, camera2)
}

animate()