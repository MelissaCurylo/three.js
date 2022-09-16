import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// console.log(gsap) // testing to check if library imported

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xee82ee })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time variable outside (global let) 
    // let time = Date.now() // Using time to control movement


// Clock variable outside (global let) // another method to control object movement
const clock = new THREE.Clock() // creating the object


// Using gsap library to control movement
    //Creating a tween with gsap
//     // animation 
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2}) // moving along x axis at a specified duration and delay
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0}) // returning back to original position



// 

// Animations
const gameLoop = () => 
{

////============= Using Time to control movement
    // Using native Javascript can obtain time of movement
        // const currentTime = Date.now() // in console on browser // setting current time 
        // const deltatTime = currentTime - time
        // time = currentTime
        // // console.log(deltatTime)

        // // console.log('gameLoop') // used to see the counting frames in console log

    // Update objects 
        // give the feeling of depth
        // mesh.position.x += 0.01  // moving position along the x axis 
        // mesh.rotation.y += 0.001 * deltatTime // adding the time variable of deltaTime further controls the movement per frame

//============= Using Clock to control movement
// Clock
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime) // testing in console on browser // using seconds

//Update objects
    // mesh.rotation.y = elapsedTime * Math.PI * 0.25
    // mesh.position.y = elapsedTime * Math.PI * 0.25
    
    // using math to rotate cube in a circle
        // mesh.position.y = Math.sin(elapsedTime)
        // mesh.position.x= Math.cos(elapsedTime)

    // using math to rotate the camera 
        mesh.position.y = Math.sin(elapsedTime)
        mesh.position.x = Math.cos(elapsedTime)  //moves back and forth on x axis when /0.5
        mesh.position.z = Math.cos(elapsedTime)
        camera.lookAt(mesh.position)

// Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(gameLoop)  // passing the function to call it in the next frame
}

gameLoop()  // always call function at least once