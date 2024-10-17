function init(){
    const socket = io("wss://solid-invention-x6j7qqx66ghp59g-3000.app.github.dev/");
    loginBox = new WinBox("Modal Window", {
        title: "Enter API Key",
        modal: true,
        class: ["no-close"],
        
    });

    apiKeyBox = document.createElement("input");
    apiKeyBox.style.position = "absolute";
    apiKeyBox.style.top = "50%";
    apiKeyBox.style.left = "50%";
    apiKeyBox.style.transform = "translate(-50%,-50%)";
    apiKeyBox.style.padding = "15px";
    apiKeyBox.disabled = "true";
    loginBox.body.appendChild(apiKeyBox);

    apiKeyBox.addEventListener("keydown",function(e){
        if(e.key = "Enter"){

        }
    })

    socket.on("connection", function(e){
        apiKeyBox.disabled = "false"
    })
}

window.addEventListener("load",init)