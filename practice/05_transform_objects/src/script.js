import './style.css'
import * as THREE from 'three'

//==== Canvas
const canvas = document.querySelector('canvas.webgl')

//==== Scene
const scene = new THREE.Scene()

//==== Objects
    // TWO ways to develop object(s) individually or in Group class
    // Option #1
        // const geometry = new THREE.BoxGeometry(1, 1, 1)
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        // const mesh = new THREE.Mesh(geometry, material)

    // Option #2
        //==== Scene Graph via Group class
        // useful when building objects like houses and needing to scale which will scale all items in the group together
    const group = new THREE.Group()
    group.scale.y = 2
    group.rotation.y = 4.7
    group.position.y = 1.2
    group.scale.x = 2
    scene.add(group)

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xFEC5E5 })
        )
        cube1.position.x = -2
        group.add(cube1)
        

        const cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0xFD5DA8 })
            )
            cube2.position.x = 0
            group.add(cube2)
            

            const cube3 = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({color: 0xFF1694 })
                )
                cube3.position.x = 2
                group.add(cube3)


//======== TWO ways to set properties position, camera
    // Option #1 Indivdually 
        // mesh.position.x = 1 // moves along x axis
        // mesh.position.y = 1 // moves along y axis
        // mesh.position.z = 1 // moves along z axis 
    // Option #2 Set 
        // mesh.position.set(0, 0, 1) // moves along x axis (x, y, z)
        // scene.add(mesh) // always add to the scene
    // console.log(mesh.position.length()) // gets distance from another vector


//==== Scale
    // Two ways to assign 
        // #1 individually
            // mesh.scale.x = 2
            // mesh.scale.y = 0.25
            // mesh.scale.z = 0.5
        // #2 set (x, y, z)
        // mesh.scale.set(2, 0.25, 0.5)


//==== Rotation
    // Two ways to rotate via rotation or quaternion property
        // Option #1 rotation based on Euler rather than Vector3
            // Meaning changes to x,y,z are based on properties of Euler and expressed in radians
            // Default rotaion is in x, y, z and changing one axis changes all axes
                // spin on y axis : picture a carousel
                // spin on x axis : picture wheels rotating on car
                // spin on z axis : picture rotating propellers in front of an aircraft
            // Radian expressions:  
                // written in native Javascript
                // half rotation = Math.PI (3.14159...)
            // Euler can present Gimbal lock (why most use Quaternion)
            // Correct with reorder(...) method // object.rotation.reorder('yxz')
                // mesh.rotation.x = Math.PI * 0.25
                // mesh.rotation.y = Math.PI * 0.25

         // Option #2 Quaternion based mathematically (solves the order problem) => covered later
            // Quaternion updates when rotation is changed using any one of the two as desired



//==== Axex Helper  
    // Helper to position objects in space
    // To see z axis change camera rotation
    const axesHelper = new THREE.AxesHelper(8)
    axesHelper.position.x = -2
    scene.add(axesHelper)


//==== Normalize
    // Takes Vector length and reduce it until 1
    // mesh.position.normalize()
    // console.log(mesh.postion.length) // length between 


//==== Sizes
const sizes = {
    width: 800,
    height: 800
}


//==== Look at this Object 3D
    // lookAt(...) method
        // Object will automatically rotate its -z axis toward target provided
        // Use to orient camera toward an object 
            // Example: move characters eyes to look at an object 
            // camera.lookAt(new THREE.Vector3(0, - 1, 0))  // since it is for camera needs to go below camera position
            // camera.lookAt(mesh.position) // using Vector3 but default camera position as mesh is already at scene center


//==== Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 10
// camera.lookAt(new THREE.Vector3(0, -1, 0)) // cube looks higher but camera is looking below cube
// camera.lookAt(mesh.position) // using Vector3 but default camera position as mesh is already at scene center
scene.add(camera)

// console.log(mesh.position.distanceTo(camera.position))  // distance between object and camera


//==== Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)