import './style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import gsap from 'gsap'
import { generateSlug } from "random-word-slugs";





// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xffffff )

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


/**
 * Test mesh
 */


const geometry = new THREE.BoxGeometry(2,4,.01, 128, 128, 128)


// Material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() },

    uValueA: {
      value: 0
    },
    uValueB: {
      value: 0
    },
    uValueC: {
      value: 0
    },
    uValueD: {
      value: 0
    }


  }
})


const mesh = new THREE.Mesh(geometry, material)
 //mesh.rotation.z +=.4
  mesh.rotation.y +=.7
scene.add(mesh)



/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>{

  //Update uniforms



  material.uniforms.uResolution.value.x = renderer.domElement.width
  material.uniforms.uResolution.value.y = renderer.domElement.height

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,4.5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.localClippingEnabled = true
renderer.globalClippingEnabled = true

/**
 * Animate
 */

let titular = document.getElementById('titular')

let made = document.getElementById('made')

titular.addEventListener('click', function (e) {

  material.uniforms.uValueA.value = 0
  material.uniforms.uValueB.value = 0
  material.uniforms.uValueC.value = 0
  material.uniforms.uValueD.value = 0

  gsap.to(material.uniforms.uValueA, {delay: .5, duration: 3,  value: Math.random()* 10 });
  gsap.to(material.uniforms.uValueB, {delay: .5, duration: 3,  value: Math.random()* 10 });
  gsap.to(material.uniforms.uValueC, {delay: .5, duration: 3,  value: Math.random()* 10 });
  gsap.to(material.uniforms.uValueD, {delay: .5, duration: 3,  value: Math.random()* 1. });

  setTimeout(function () {
      made.innerHTML = 'You made a ' + generateSlug(1, {partsOfSpeech: ['noun']})
  }, 500)

  // material.uniforms.uValueA.value = Math.random()* 10.
  // material.uniforms.uValueB.value = Math.random()* 10.
  // material.uniforms.uValueC.value = Math.random()* 10.
  // material.uniforms.uValueD.value = Math.random()* 10.
})

const clock = new THREE.Clock()

const tick = () =>{
  const elapsedTime = clock.getElapsedTime()
  if(material.uniforms.uResolution.value.x === 0 && material.uniforms.uResolution.value.y === 0 ){
    material.uniforms.uResolution.value.x = renderer.domElement.width
    material.uniforms.uResolution.value.y = renderer.domElement.height
    // if(p5Tex){
    // material.uniforms.uTexture2.value = p5Tex
    // material.needsUpdate = true
    // }
  }
  // console.log(camera)
  //Update Material
  material.uniforms.uTime.value = elapsedTime


  //mesh.rotation.y += .01

  material.needsUpdate = true


  // Render
  renderer.render(scene, camera)



  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()