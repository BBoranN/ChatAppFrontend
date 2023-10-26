import { userSocket } from "./SocketService";

export class ChatPanel extends HTMLDivElement{
    constructor(){
        super();
        this.className="ChatPanel";
        let panel = document.createElement("div");    
        let text = document.createElement("textarea");
        text.placeholder="Enter your message";
        let sendButton = document.createElement("button");
        sendButton.innerHTML="Send";
        this.append(panel);
        this.append(text);
        this.append(sendButton);

        sendButton.addEventListener("click",()=>{
            let message= text.value;
            text.value="";
            
            userSocket.send(JSON.stringify(message));
        });
    }
}customElements.define("chat-panel",ChatPanel,{extends:"div"});
