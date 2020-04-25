import Loader from "./Loader/Loader.js";

let camera;
let scene;
let renderer;

window.onloadend = init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let loader = new Loader();
    loader.loadModel('../../Assets/LeatherChair/scene.gltf', scene, camera, renderer.domElement);
    console.log(scene);

    let light = new THREE.AmbientLight('lightcyan', 0.5);
    scene.add(light);

    animate();
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}