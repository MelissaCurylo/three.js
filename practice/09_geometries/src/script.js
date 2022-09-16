import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//============================== BASE ================================//
//---------- Canvas
const canvas = document.querySelector('canvas.webgl')

//---------- Scene
const scene = new THREE.Scene()

//---------- Object

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)  // changes shape per side x.y.z // not using this option
const geometry = new THREE.BufferGeometry() 
// const geometry = new THREE.SphereGeometry(1, 32, 22) 
// const geometry = new THREE.SphereGeometry(1, 20, 1) 
// const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 )
const count = 50 // how many triangles are being created // add/decrease number to see differences :D
const positionsArray = new Float32Array(count * 3 * 3) // calling count and giving it 3 vertices with 3 values (x.y.z) per triangle

// fill array with random numbers 
for(let i = 0; i < count * 3 * 3; i++ )
{
    // adding the - 0.5 places triangles in the center on rotation // multiplying * 2 adds a axis rotation
    positionsArray[i] = Math.random() - 0.5
}

// creating an attribute, sending Float32Array, then telling it the program takes 3 values for 1 vertex
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)   
geometry.setAttribute('position', positionsAttribute)



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Float32array -> array can only store on data type, fixed length // Two ways to create the vetices // three vertices with x,y,z
// //--Way #1 short form sending an array which is easier on computer:
// const positionsArray = new Float32Array([
//     0, 0, 0, // first vertex x, y, z
//     0, 1, 0, // second vertex x, y, z
//     1, 0, 0  // third vertex x, y, z
// ])
// // converting array into Three.js attribute by providing the Float32Array
//     // the number 3 is saying we have 3 values per vertex
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)  // faces are auto compiled via Three.js, CPU, and shaders 

// // sending geometry to the attribute // buffer geometry
// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttribute) // adding/setting attribute containing the position 
//     // positionsAttribute is the name of the value attribute sent and being used in the shaders
//     // shaders are now written with the assigned name 'position' and must use this set name


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //--Way #2 long form:
// const positionsArray = new Float32Array(9) 
// // first vertex 
// positionsArray[0] = 0 // x
// positionsArray[1] = 0 // y
// positionsArray[2] = 0 // z

// // second vertex 
// positionsArray[3] = 0 // x
// positionsArray[4] = 1 // y
// positionsArray[5] = 0 // z

// // third vertex 
// positionsArray[6] = 1 // x
// positionsArray[7] = 0 // y
// positionsArray[8] = 0 // z

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const material = new THREE.MeshBasicMaterial({ 
    color: 0xFEB500, 
    wireframe: true   // wireframe enables subdivisions triangles //default is 1 meaning 2 triangles/face // has a the "staircase" affect
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//---------- Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //**Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //**Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //**Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//============================== CAMERA ================================//
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)


//============================== CONTROLS ================================//
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//============================== RENDERER ================================//
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//============================== ANIMATE ================================//
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //**Update controls
    controls.update()

    //** Render
    renderer.render(scene, camera)

    //** Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()