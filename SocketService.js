export let userSocket = new WebSocket("ws://localhost:8088");

userSocket.onopen = () =>{
    console.log("websocket opened");
};

userSocket.onmessage = (event) =>{
    console.log(event.data);
} 