import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



//========= Cursor
const cursor = {  
    x: 0,
    y: 0
}

    //Using native javascript
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5 // will set x values from -0.5 to 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5) // add -() to negate inverse

    // console.log(cursor.x, cursor.y) // used to test coordinates
})

//========= Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600 
}


//========= Scene
const scene = new THREE.Scene()

//========= Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xa2d5c6})
)
scene.add(mesh)


//========== Camera Views ==============//

//========== Orthographic Camera
// const aspectRatio = sizes.width / sizes.height //width/height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, //left side
//     1* aspectRatio,  // right side
//         // now a perfect cube
//     1, // top side
//     -1, // bottom side
//     0.1, // near
//     100 // far
// )  // aspectRatio will cube shape and remove stretching // test shape by placing a smaller height value in sizes 
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 2
// // console.log(camera.position.length()) // distance of camera
// camera.lookAt(mesh.position)
// scene.add(camera)


//========= Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
// console.log(camera.position.length()) // distance of camera
camera.lookAt(mesh.position)
scene.add(camera)


//========= Controls
const controls = new OrbitControls(camera, canvas)  // can zoom in and out and rotate 360
    //Adding Targets 
        // controls.target.y = 1
        // controls.update()

    //Adding Damping
        // If using damping always update the controls on update in tick function
    controls.enableDamping = true 



//========= Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//========= Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects 
        // // rotation of object on it's own
            // mesh.rotation.y = elapsedTime;


     //========= Update Camera
        //===== updating camera position in tick function with cursor coordinates
            // camera.position.x = cursor.x * 10
            // // y axis must be negated // cursor.y is positive when going down while Three.js y is positive going up
            // // in event for cursor add inverse
                    // camera.position.y = cursor.y * 10 
                    // camera.lookAt(mesh.position) // telling camera to look at mesh 


        //====== Using math to rotate cube and see all sides // update z and x
            // Reminder: 
                // //cos(x) = oscillation is up and down when value increase 
                // //sin = oscilation is opposite, starts at zero
                // //combining cos and sin with same angle places object position on a circle
                // //pi = 360 full rotation 
                    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5
                    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5
                    // camera.position.y = cursor.y * 5 // to see above and below use y (vertical)
                    // camera.lookAt(mesh.position) // telling camera to look at mesh // !!!make sure to inclue lookAt!!!!
    
    
    // Update Controls via Damping
    controls.update()

    //========= Render
    renderer.render(scene, camera)

    //========= Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()