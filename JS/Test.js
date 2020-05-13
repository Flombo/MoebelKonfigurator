import Loader from "./Loader/Loader.js";

let camera;
let scene;
let renderer;
let spotLight;

window.onloadend = init();

function init() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(500));

    // let materialArray = [];
    // let textureRight = new THREE.TextureLoader().setPath('../../Assets/skybox/').load('posx.jpg');
    // let textureLeft = new THREE.TextureLoader().setPath('../../Assets/skybox/').load('negx.jpg');
    // let textureDown = new THREE.TextureLoader().setPath('../../Assets/skybox/').load('negy.jpg');
    // let textureUp = new THREE.TextureLoader().setPath('../../Assets/skybox/').load('posy.jpg');
    // let textureForward = new THREE.TextureLoader().setPath('../../Assets/skybox/').load('posz.jpg');
    // let textureBackwards = new THREE.TextureLoader().setPath('../../Assets/skybox/').load('negz.jpg');
    //
    // materialArray.push(new THREE.MeshBasicMaterial({map : textureForward}));
    // materialArray.push(new THREE.MeshBasicMaterial({map : textureBackwards}));
    // materialArray.push(new THREE.MeshBasicMaterial({map : textureUp}));
    // materialArray.push(new THREE.MeshBasicMaterial({map : textureDown}));
    // materialArray.push(new THREE.MeshBasicMaterial({map : textureRight}));
    // materialArray.push(new THREE.MeshBasicMaterial({map : textureLeft}));
    //
    // for(let i = 0; i < 6; i++){
    //     materialArray[i].side = THREE.BackSide;
    // }
    //
    // let skyboxGeo = new THREE.BoxGeometry(75, 75, 75);
    // let skybox = new THREE.Mesh(skyboxGeo, materialArray);

    scene.background = new THREE.Color("#ffffff");

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let loader = new Loader();
    loader.loadModel('../../Assets/LeatherChair/scene.gltf', scene, camera, renderer.domElement);

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