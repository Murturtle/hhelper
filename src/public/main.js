function init(){
    const socket = io({
        path: '/socket.io/',
        transports: ['websocket', 'polling']
    });
    
    const loginBox = new WinBox("Login", {
        title: "Enter API Key",
        modal: true,
        class: ["no-close"],
    });
    
    loginBox.width = loginBox.height
    
    const apiKeyBox = document.createElement("input");
    apiKeyBox.style.position = "absolute";
    apiKeyBox.style.top = "50%";
    apiKeyBox.style.left = "50%";
    apiKeyBox.style.transform = "translate(-50%,-50%)";
    apiKeyBox.style.padding = "15px";
    apiKeyBox.style.width = "65%"
    apiKeyBox.disabled = true;  // Changed to boolean
    loginBox.body.appendChild(apiKeyBox);
    
    
    apiKeyBox.addEventListener("keydown", function(e) {
        if(e.key === "Enter") {  
            socket.emit("key",apiKeyBox.value);
            apiKeyBox.disabled = true;
        }
    });
    
    socket.on("connect", function() {
        console.log("connected");
        apiKeyBox.disabled = false;
    });
    
    socket.on("classes", (data)=>{
        console.log(data);
        for(key in data){
            const classBox = document.createElement("button");
            classBox.innerText = data[key].name;
            classBox.style.display = "block";
            classBox.style.margin = "5px";
            classBox.style.fontSize = "16px";
            classBox.style.background = "#FFFFFF";
            classBox.style.border = "solid 1px black"
            classBox.style.padding = "10px";
            classBox.style.borderRadius = "5px";
            classSelector.appendChild(classBox)
        }
        loginBox.close();
    })
}


document.addEventListener("load",init())