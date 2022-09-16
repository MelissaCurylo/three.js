import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'


// console.log(GUI) // testing GUI connected // will see in console log the library object

//------------------------------ DEBUG ------------------------------------//
// mesh debug sorted under object, otherwise will not function gui.add(mesh.position, 'y') 
const gui = new GUI(
    {
        
        open: true,  // option to open or close panel once unhidden // mine is represented as a down arrow on controls
        width: 400    // adding drag width to enlarge gui panel
    })
gui.hide() // hides gui panel from the start


// Create color pickers for multiple color formats
// add colorFormats to original call for MeshBasicMaterial color
const parameters = {
    color: 0xAF4F41,
    spin: () =>
    {
        console.log('spin') // testing spin in gui connecting to object
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + Math.PI * 2
        })
    }
	// string: '#ffffff',
	// int: 0xffffff,
	// object: { r: 1, g: 1, b: 1 },
	// array: [ 1, 1, 1 ]
}



//------------------------------ BASE ------------------------------------//
//======= Canvas
const canvas = document.querySelector('canvas.webgl')

//======= Scene
const scene = new THREE.Scene()



//------------------------------ OBJECT ------------------------------------//
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//===== ** Debug
// // tweaking added element via panel // gui = panel
// // tweak values(property) must be added as an object in order to use in GUI
// // 1st param = object // 2nd param = property being tweaked (name of property) // 1st + 2cnd add in panel numerical position that can be adjusted
// // 3rd param = minimum // 4th param = maximum // 5th param = step (precision) // 3rd thru 5th add in panel slide bar
        // gui.add(mesh.position, 'y', - 3, 3, 0.01) 
        // gui.add(mesh.position, 'x', - 3, 3, 0.01)
        // gui.add(mesh.position, 'z', - 3, 3, 0.01)

// Using library names instead of hard coding
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')  // changes name in panel for property
gui
    .add(mesh, 'visible') // gui understands this should be a checkbox for the boolean state
gui
    .add(material, 'wireframe') // boolean for allowing the wireframe
gui
    .addColor( parameters, 'color') // changed from colorFormat to parameters as added other properties
    .onChange(() =>
    {
        console.log('tweak did change') // testing onChange
        material.color.set(parameters.color) // sets color change from panel to object // set method updates color
    })
gui
    .add(parameters, 'spin')
    .name('spin on y-axis')

window.addEventListener('keydown', (event) => 
{
    if(event.key === 'h')
    {
        if(gui._hidden)
            gui.show()
        else
            gui.hide()
    }
})

//------------------------------ SIZES ------------------------------------//
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
//======= Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

//======= Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

//======= Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//------------------------------ CAMERA ------------------------------------//
//======= Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

//======= Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true




//------------------------------ RENDERER ------------------------------------//
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




//------------------------------ ANIMATE ------------------------------------//
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

//======= Update controls
    controls.update()

//======= Render
    renderer.render(scene, camera)

//======= Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()