import Loader from "./Loader/Loader.js";

let camera;
let scene;
let renderer;
let spotLight;

window.onloadend = init();

function init() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(500));

    scene.background = new THREE.Color("#ffffff");

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.toneMapping = THREE.Uncharted2ToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let loader = new Loader();
    loader.loadModel('../../Assets/Schrank/schrank.gltf', scene, camera, renderer.domElement);

    let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);

    spotLight = new THREE.SpotLight(0xffa95c, 4);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024 * 4;
    spotLight.shadow.mapSize.height = 1024 * 4;
    scene.add(spotLight);

    animate();
}

function animate() {
    renderer.render(scene, camera);
    spotLight.position.set(
        camera.position.x +10,
        camera.position.y +10,
        camera.position.z +10
    );
    requestAnimationFrame(animate);
}