export default class MaterialManager {

    constructor(model) {
        this.model = model;
        this.defaultModelColor = this.getDefaultModelColor();
        this.colorInputs = document.getElementsByClassName("colors")[0].getElementsByClassName("selection");
        this.materialInputs = document.getElementsByClassName("materials")[0].getElementsByClassName("selection");
        this.textureLoader = new THREE.TextureLoader();
        this.initHandler();
    }

    initHandler() {
        Array.from(this.materialInputs).forEach((input) => {
            input.addEventListener("mousedown", (event) => { this.changeModelTexture(event) });
        });
        Array.from(this.colorInputs).forEach((input) => {
            input.addEventListener("mousedown", (event) => { this.changeModelColor(event); });
        })
    }

    getDefaultModelColor(){
        let color = null;
        this.model.traverse( n => {
           if(n.isMesh){
               color = n.material.color;
           }
        });
        return color;
    }

    changeModelTexture(event) {
        let input = event.currentTarget;
        let texturePath = "../" + input.name;
        this.model.traverse( n => {
           if(n.isMesh){
               if(n.material === undefined){
                   n = new THREE.MeshBasicMaterial();
               }
               n.material.map = this.textureLoader.load(texturePath);
           }
        });
    }

    changeModelColor(event) {
        let input = event.currentTarget;
        let color = input.name;
        this.model.traverse( n => {
            if(n.isMesh){
                if(color === "default"){
                    n.material.color = this.defaultModelColor;
                } else {
                    n.material.color = new THREE.Color(color);
                }
            }
        });
    }

}