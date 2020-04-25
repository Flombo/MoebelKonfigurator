import {DragControls} from "../../three.js-master/examples/jsm/controls/DragControls.js";
import {OrbitControls} from "../../three.js-master/examples/jsm/controls/OrbitControls.js";

export default class Movement{
    constructor(model, camera, domElement) {
        this.xTranslationSlider = document.getElementById("xTranslation");
        this.yTranslationSlider = document.getElementById("yTranslation");
        this.zTranslationSlider = document.getElementById("zTranslation");
        this.xRotationSlider = document.getElementById("xRotation");
        this.yRotationSlider = document.getElementById("yRotation");
        this.zRotationSlider = document.getElementById("zRotation");
        this.outputX = document.getElementById("xOutput");
        this.outputY = document.getElementById("yOutput");
        this.outputZ = document.getElementById("zOutput");
        this.yOutputRotation = document.getElementById("yOutputRotation");
        this.xOutputRotation = document.getElementById("xOutputRotation");
        this.zOutputRotation = document.getElementById("zOutputRotation");
        this.z = 0;
        this.x = 0;
        this.y = 0;
        this.model = model;
        this.camera = camera;
        this.domElement = domElement;
        this.orbitControls = new OrbitControls(this.camera, this.domElement);
        this.initTranslationHandling();
        this.initRotationHandling();
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

    rotateModel() {
        this.changeRotationOutputBoxes();
        this.model.rotation.x = this.xRotationSlider.value;
        this.model.rotation.z = this.zRotationSlider.value;
        this.model.rotation.y = this.yRotationSlider.value;
    }

    translateModel() {
        this.changeTranslationOutputBoxes();
        this.model.position.x = this.xTranslationSlider.value;
        this.model.position.y = this.yTranslationSlider.value;
        this.model.position.z = this.zTranslationSlider.value;
    }
}