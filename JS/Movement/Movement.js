import {DragControls} from "../../three.js-master/examples/jsm/controls/DragControls.js";
import {OrbitControls} from "../../three.js-master/examples/jsm/controls/OrbitControls.js";

export default class Movement{
    constructor(model, camera, domElement, scene) {
        this.xTranslationSlider = document.getElementById("xTranslation");
        this.yTranslationSlider = document.getElementById("yTranslation");
        this.zTranslationSlider = document.getElementById("zTranslation");

        this.xRotationSlider = document.getElementById("xRotation");
        this.yRotationSlider = document.getElementById("yRotation");
        this.zRotationSlider = document.getElementById("zRotation");

        this.xScaleSlider = document.getElementById("xScale");
        this.yScaleSlider = document.getElementById("yScale");
        this.zScaleSlider = document.getElementById("zScale");

        this.regalAnzahl = document.getElementById("regalAnzahl");
        this.regalOutput = document.getElementById("regalOutput");

        this.outputX = document.getElementById("xOutput");
        this.outputY = document.getElementById("yOutput");
        this.outputZ = document.getElementById("zOutput");

        this.yOutputRotation = document.getElementById("yOutputRotation");
        this.xOutputRotation = document.getElementById("xOutputRotation");
        this.zOutputRotation = document.getElementById("zOutputRotation");

        this.xOutputScale = document.getElementById("xOutputScale");
        this.yOutputScale = document.getElementById("yOutputScale");
        this.zOutputScale = document.getElementById("zOutputScale");

        this.z = 0;
        this.x = 0;
        this.y = 0;

        this.model = model;
        this.shelfMesh = model.getObjectByName("regal");
        this.currentShelfAmount = 1;
        this.shelfs = [];
        this.currentShelfYPos = 0;

        this.camera = camera;
        this.domElement = domElement;
        this.orbitControls = new OrbitControls(this.camera, this.domElement);
        this.initTranslationHandling();
        this.initRotationHandling();
        this.initScaleHandling();
        this.scene = scene;
    }

    initScaleHandling(){
        this.changeScalingOutputBoxes();
        this.regalAnzahl.addEventListener("input", () => { this.addRegal() });
        this.xScaleSlider.addEventListener("input", () => {
            this.scaleModel();
            this.currentShelfYPos = 0;
            this.addRegal();
        });
        this.zScaleSlider.addEventListener("input", () => {
            this.scaleModel();
            this.currentShelfYPos = 0;
            this.addRegal();
        });
        this.yScaleSlider.addEventListener("input", () => {
            this.scaleModel();
            this.currentShelfYPos = 0;
            this.addRegal();
        });
        this.regalOutput.addEventListener("input", () => {
           this.changeOutputSlider(this.regalOutput, this.regalAnzahl);
        });
        this.xOutputScale.addEventListener("input", () => {
            this.changeOutputSlider(this.xOutputScale, this.xScaleSlider);
        });
        this.yOutputScale.addEventListener("input", () => {
            this.changeOutputSlider(this.yOutputScale, this.yScaleSlider);
        });
        this.zOutputScale.addEventListener("input", () => {
            this.changeOutputSlider(this.zOutputScale, this.zScaleSlider);
        });
    }

    addRegal() {
        this.changeOutputSlider(this.regalOutput, this.regalAnzahl);
        if(this.regalAnzahl.value > this.currentShelfAmount
            && this.currentShelfAmount < this.regalAnzahl.max
        ) {
            this.addNewRegal();
        } else {
            this.removeRegal();
        }
        this.currentShelfAmount = this.regalAnzahl.value;
    }

    removeRegal() {
        this.model.remove(this.shelfs[this.regalAnzahl.value - 1]);
        this.shelfs.pop();
        this.model.traverse(mesh => {
            if(mesh.name === "leftSide"){
                let box = new THREE.Box3().setFromObject(mesh);
                box.getCenter(this.model.origin);
                if(this.regalAnzahl.value > 1) {
                    this.currentShelfYPos = box.getSize(this.model.origin).y / this.regalAnzahl.value;
                    let x = this.shelfMesh.position.x;
                    this.setRegalPosition(x);
                }
            }
        });
    }

    addNewRegal() {
        let clonedShelf = null;
        this.model.traverse(mesh => {
            if(mesh.name === "leftSide"){
                let box = new THREE.Box3().setFromObject(mesh);
                box.getCenter(this.model.origin);
                if(this.regalAnzahl.value > 1) {
                    this.currentShelfYPos = box.getSize(this.model.origin).y / this.regalAnzahl.value;
                    clonedShelf = this.shelfMesh.clone();
                    this.shelfs.push(clonedShelf);
                    let x = this.shelfMesh.position.x;
                    this.setRegalPosition(x);
                }
            }
        });
        this.model.add(clonedShelf);
    }

    setRegalPosition(x){
        this.shelfMesh.position.y = this.currentShelfYPos;
        this.shelfs.forEach((regal) => {
            this.currentShelfYPos += 1;
            regal.position.y = this.currentShelfYPos;
            regal.position.x = x;
        })
    }

    initRotationHandling(){
        this.changeRotationOutputBoxes();
        this.xRotationSlider.addEventListener("input", () => { this.rotateModel()});
        this.yRotationSlider.addEventListener("input", () => { this.rotateModel()});
        this.zRotationSlider.addEventListener("input", () => { this.rotateModel()});
        this.xOutputRotation.addEventListener("input", () => {
            this.changeSliderValue(this.xRotationSlider, this.xOutputRotation);
        });
        this.yOutputRotation.addEventListener("input", () => {
            this.changeSliderValue(this.yRotationSlider, this.yOutputRotation);
        });
        this.zOutputRotation.addEventListener("input", () => {
            this.changeSliderValue(this.zRotationSlider, this.zOutputRotation);
        });
    }

    changeSliderValue(slider, output){
        slider.value = output.value;
        this.rotateModel();
        this.translateModel();
    }

    initTranslationHandling(){
        this.changeTranslationOutputBoxes();
        let objects = [];
        objects.push(this.model);
        let controls = new DragControls(objects, this.camera, this.domElement);
        controls.addEventListener('dragstart', (event) => {
           this.orbitControls.enabled = false;
           event.object.material.emissive.set(0xaaaaaa);
        });
        controls.addEventListener('dragend', (event) => {
           this.orbitControls.enabled = true;
           event.object.material.emissive.set(0x000000);
        });
        this.xTranslationSlider.addEventListener("input", () => { this.translateModel()});
        this.yTranslationSlider.addEventListener("input", () => { this.translateModel()});
        this.zTranslationSlider.addEventListener("input", () => { this.translateModel()});
    }

    changeScalingOutputBoxes() {
        this.changeOutputSlider(this.xOutputScale, this.xScaleSlider);
        this.changeOutputSlider(this.yOutputScale, this.yScaleSlider);
        this.changeOutputSlider(this.zOutputScale, this.zScaleSlider);
        this.changeOutputSlider(this.regalOutput, this.regalAnzahl);
    }

    changeRotationOutputBoxes() {
        this.changeOutputSlider(this.xOutputRotation, this.xRotationSlider);
        this.changeOutputSlider(this.yOutputRotation, this.yRotationSlider);
        this.changeOutputSlider(this.zOutputRotation, this.zRotationSlider);
        this.outputX.addEventListener("input", () => {
            this.changeSliderValue(this.xTranslationSlider, this.outputX);
        });
        this.outputY.addEventListener("input", () => {
            this.changeSliderValue(this.yTranslationSlider, this.outputY);
        });
        this.outputZ.addEventListener("input", () => {
            this.changeSliderValue(this.zTranslationSlider, this.outputZ);
        });
    }

    changeTranslationOutputBoxes(){
        this.changeOutputSlider(this.outputX, this.xTranslationSlider);
        this.changeOutputSlider(this.outputY, this.yTranslationSlider);
        this.changeOutputSlider(this.outputZ, this.zTranslationSlider);
    }

    changeOutputSlider(output, slider){
        output.value = slider.value;
    }

    scaleModel() {
        this.changeScalingOutputBoxes();
        let x = this.xScaleSlider.value;
        let y = this.yScaleSlider.value;
        let z = this.zScaleSlider.value;
        if(z > 1 || y > 1|| x > 1) {
            this.model.scale.set(x, y, z);
        } else {
            this.model.scale.set(1,1,1);
        }
    }

    rotateModel() {
        this.changeRotationOutputBoxes();
        this.model.rotation.x = THREE.Math.degToRad(this.xRotationSlider.value);
        this.model.rotation.z = THREE.Math.degToRad(this.zRotationSlider.value);
        this.model.rotation.y = THREE.Math.degToRad(this.yRotationSlider.value);
    }

    translateModel() {
        this.changeTranslationOutputBoxes();
        this.model.position.x = this.xTranslationSlider.value;
        this.model.position.y = this.yTranslationSlider.value;
        this.model.position.z = this.zTranslationSlider.value;
    }
}