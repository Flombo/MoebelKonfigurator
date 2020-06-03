import { GLTFLoader } from "../../../../../../three.js-master/examples/jsm/loaders/GLTFLoader.js";
import Movement from "../Movement/Movement.js";
import MaterialManager from "../MaterialManager.js";

export default class  {
    constructor() {
        this.loader = new GLTFLoader();
    }

    loadModel(path, scene, camera, domElement){
        this.loader.load( path, function ( gltf ) {
            let gltfScene = gltf.scene;
            gltfScene.position.z = 0;
            gltfScene.position.x = 0;
            gltfScene.position.y = 0;
            gltfScene.traverse( n => {
               if(n.isMesh){
                   n.castShadow = true;
                   n.receiveShadow = true;
                   if(n.material.map) n.material.map.anisotropy = 16;
               }
            });
            new Movement(gltfScene, camera, domElement, scene);
            new MaterialManager(gltfScene);
            console.log(gltfScene);
            scene.add(gltfScene);
        }, undefined, function ( error ) {
            console.error( error );
        } );
    }
}