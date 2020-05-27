document.onload = init();

function init(){
    initSwitchButtons();
    initSubmitHandling();
    initAnimation();
    checkLoginInputs();
    checkRegistryInputs();
}

function initSubmitHandling(){
    let loginUser = document.getElementById("loginUser");
    let loginPasswd = document.getElementById("loginPassword");
    let registryUser = document.getElementById("registryUser");
    let registryPassword = document.getElementById("registryPassword");
    registryUser.addEventListener("input", checkRegistryInputs);
    registryPassword.addEventListener("input", checkRegistryInputs);
    loginUser.addEventListener("input", checkLoginInputs);
    loginPasswd.addEventListener("input", checkLoginInputs);
}

function initAnimation() {
    let animationContainer = document.getElementById("animationContainer");
    for(let i = 0; i <= 25; i++){
        let bedIMG = '<img src="../icons/bed.svg"/>';
        let seatIMG = '<img src="../icons/stuhl.svg"/>';
        animationContainer.innerHTML += bedIMG;
        animationContainer.innerHTML += seatIMG;
        setIMGAttributes();
    }
}

function setIMGAttributes() {
    let animationContainer = document.getElementById("animationContainer");
    let imgs = animationContainer.getElementsByTagName("img");
    let oldLeft = 0;
    let oldBottom = 0;
    Array.from(imgs).forEach((img)=>{
        let left = getLeft(oldLeft);
        let bottom = getBottom(oldBottom);
        img.setAttribute("style", "left:" + left + "px;"
            + "bottom:" + bottom + "px;"
            + "animation-duration:" + Math.round(Math.random() * 25 + 10) + "s;"
            + "opacity:" + Math.random() * 0.3 + ";"
        );
    })
}

function getBottom(oldBottom) {
    let bottomArr = [-1000, 5, 500, 20, 450, 75, -600, 40, 50];
    let bottomIndex = Math.random() * bottomArr.length;
    let bottom = Math.random() * bottomArr[Math.floor(bottomIndex)];
    while(bottom === oldBottom){
        bottom = Math.random() * bottomArr[Math.floor(bottomIndex)];
    }
    return bottom;
}

function getLeft(oldLeft) {
    let leftArr = [-1000, 5, 500, 20, 450, 75, -600, 40, 50, 700, 600, 900, 1000, 300, 200];
    let leftIndex = Math.random() * leftArr.length;
    let left = Math.random() * leftArr[Math.floor(leftIndex)];
    while (left === oldLeft){
        left = Math.random() * leftArr[Math.floor(leftIndex)];
    }
    return left;
}

function checkRegistryInputs(){
    let registrySubmit = document.getElementById("registrySubmit");
    let registryUser = document.getElementById("registryUser");
    let registryPasswd = document.getElementById("registryPassword");
    let registryEmail = document.getElementById("registryEmail");
    let userLength = registryUser.value.length;
    let emailLength = registryEmail.value.length;
    let passwdLength = registryPasswd.value.length;
    if (userLength >= 5 && userLength <= 20 && passwdLength >= 8 && emailLength >= 8){
        registrySubmit.setAttribute("class", "unlocked");
        registrySubmit.type = "submit";
    } else {
        registrySubmit.setAttribute("class", "locked");
        registrySubmit.type = "reset";
    }
}

function checkLoginInputs(){
    let loginSubmit = document.getElementById("loginSubmit");
    let loginUser = document.getElementById("loginUser");
    let loginPasswd = document.getElementById("loginPassword");
    let userLength = loginUser.value.length;
    let passwdLength = loginPasswd.value.length;
    if (userLength >=7 && passwdLength >= 8){
        loginSubmit.setAttribute("class", "unlocked");
        loginSubmit.type = "submit";
    } else {
        loginSubmit.setAttribute("class", "locked");
        loginSubmit.type = "reset";
    }
}

function initSwitchButtons(){
    let registerBT = document.getElementById("register");
    let loginBT = document.getElementById("login");
    loginBT.addEventListener("mousedown", showLogin);
    registerBT.addEventListener("mousedown", showRegistry);
}

function showLogin(){
    let registry = document.getElementById("registryForm");
    let login = document.getElementById("loginForm");
    resetMSG();
    login.setAttribute("class", "visible");
    registry.setAttribute("class", "invisible");
}

function showRegistry(){
    let registry = document.getElementById("registryForm");
    let login = document.getElementById("loginForm");
    resetMSG();
    login.setAttribute("class", "invisible");
    registry.setAttribute("class", "visible");
}

function resetMSG(){
    let msg = document.getElementById("msg");
    let p = msg.firstElementChild;
    if(p !== null){
        msg.removeChild(p);
    }
}