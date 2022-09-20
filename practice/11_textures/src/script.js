import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//------------------------------ TEXTURES ------------------------------------//


const loadingManager = new THREE.LoadingManager()

// use for testing when loading images // prints in console
// loadingManager.onStart = () => {
//     console.log('onStart')
// }

// loadingManager.onLoad = () => {
//     console.log('onLoaded')
// }
// loadingManager.onProgress = () =>{
//     console.log('onProgress')
// }

            // /// Behind the scene apprach but easier way is via TextureLoader ^^
            // const image = new Image()
            // const texture = new THREE.Texture(image)

            // image.onload = () =>
            // {
            //     texture.needsUpdate = true   
            // }
            // image.src = '/textures/door/color.jpg'

const textureLoader = new THREE.TextureLoader(loadingManager) /// textureLoader Approach  // can load multiple textures in one texture loader
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
// const colorTexture = textureLoader.load('/textures/minecraft.png')
const colorTexture = textureLoader.load('/textures/lion/lion.jpg') // image from https://threejs.org/manual/#en/textures
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


// Textures  // Many can be used together to create unique textures
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// // Offsets image  // can use with colorTexture.repeat, wrap, mirrored wrap, etc or by itself
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// // /// repeats image in a wrapped format
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping 

// // /// repeats image in a wrapped format but in an altnerate direction (reverse image)
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping


// // // // rotation // rotation in the image // uses radians 
//             // // half-cirle = Math.PI   // full circle = pi * 2  // 1/8th rotation = pi * 0.25 OR pi / 4
// colorTexture.rotation = Math.PI / 4 // rotates the color pattern 
// // controls pivot point of textured image
//     // below moves pivot point to center
// colorTexture.center.x = 0.5  
// colorTexture.center.y = 0.5


//------------------------------ FILTERING AND MIPMAPPING ------------------------------------//

//MIPMapping
    // Looking at cube top face when almost hidden it will be blurry texture // due to filtering and mipmapping and means gpu is doing its job
        // mipmapping = technique of creating half a smaller version of a texture over and over until it reaches 1x1 texture 
            // all sent to gpu // gpu chooses most appropriate & dependent on the amount of pixel we see
colorTexture.generateMipmaps = false // use when using THREE.NearestFilter on minFilter as mipmaps is not needed // this deactivates mipmaps generation // better performance

//Minification Filter
    // Happens when pixels of texture are smaller than pixels of the render // texture is TOO big for surface
        // Zoom all the way out and that's minification filter    // these use different algorithms for all the types and dependent on how blurry you need something to be

colorTexture.minFilter = THREE.NearestFilter // creates a sharp visual result 
colorTexture.magFilter = THREE.NearestFilter // creates a sharp render on small images that appear blurry  //LinearFilter is the default  // Nearest is cheaper than the others, better frame rate & results

//****** Preparing Textures (getting photos from online */
        // weight 
            // users download textures when loading page keep it light to keep it fast
                // .jpg = lossy compression // lighter 
                // .png = lossless compression // heavier
                // compression website TinyPNG to get smaller images & test results, may not always turn out 

        // size (or resolution)
                // each pixel is stored on the GPU regardless of image's weight 
                    // GPU has limitations & worse with mipmapping increasing # of pixels to store 
                    // solution: reduce size of image as small as possible 
                        // dependent on need for application // ie. far away house can go tiny on image for door
                //Must be a power of 2 resolutions  // will get an error and THREE.js will resize the image itself resulting in a bad image
                    // 512x512  OR    1024x1024    OR 512x2048


        // data
            // data is stored in the pixels for exact coordinates
            // example of using normal texture we want the exact values to refrain from blurry image
                // which is why to not use lossy compression and use .png 
                    // may have strange artifacts with lossy and normal combination

        // Transparency
                // only able to have **transparency in .png files**        *NOT .jpg files*    
                // Can have only one texture that combines color and alpha but best to use .png file

        // bottom line: difficulty is finding the right combination of texture formats + resolutions = requires time

//------------------------------ END OF TEXTURES ------------------------------------//


//------------------------------ BASE ------------------------------------//
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()




//------------------------------ OBJECT ------------------------------------//
const geometry = new THREE.BoxGeometry(1, 1, 1)
// getting attributes of geometry ^^ 
// console.log(geometry.attributes) // very important for editing a geometry
// getting specific attribute of geometry
console.log(geometry.attributes.uv) // prints in console

//===============================================
// Testing other geometries with texture
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1) // what is the difference between buffer and no buffer?
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32)
// const geometry = new THREE.ConeBufferGeometry(1, 1, 32)
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100)
//==============================================
const material = new THREE.MeshBasicMaterial({ map: colorTexture })  // removed color and mapping texure from image
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)





//------------------------------ SIZES ------------------------------------//
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})





//------------------------------ CAMERA ------------------------------------//
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
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

    // Update objects (added for demo)
    mesh.rotation.x = elapsedTime / 3
    mesh.rotation.y = elapsedTime / 3

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()