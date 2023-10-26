import { userSocket } from "./SocketService";

export class ChatPanel extends HTMLDivElement{
    panel;
    messageBar;
    constructor(){
        super();
        this.className="ChatPanel";
        this.panel = document.createElement("div");
        
        /* let text = document.createElement("textarea");
        text.placeholder="Enter your message";
        let sendButton = document.createElement("button");
        sendButton.innerHTML="Send"; */

        this.messageBar= new MessageBar();

        this.append(this.panel);
        /* this.panel.append(text);
        this.panel.append(sendButton); */

        this.append(this.messageBar);

        this.messageBar.sendButton.addEventListener("click",()=>{
            let message= this.messageBar.getTextValue();
            this.messageBar.setTextValue();
        
            userSocket.send(JSON.stringify(message));
        });
        userSocket.onmessage = (event) =>{
            this.appendMessage(event.data);
        } 
    }
    appendMessage(text){
        let newBubble = document.createElement("p");
        newBubble.innerHTML=text;
        newBubble.className="Bubble";
        this.panel.appendChild(newBubble);
    }
}customElements.define("chat-panel",ChatPanel,{extends:"div"});

class MessageBar extends HTMLDivElement{
    textBar;
    sendButton;
    constructor(){
        super();
        this.textBar= document.createElement("textarea");
        this.textBar.placeholder="Enter your message";
        this.sendButton= document.createElement("button");
        this.sendButton.innerHTML="Send Message";

        this.appendChild(this.textBar);
        this.appendChild(this.sendButton);
    }
    getTextValue(){
        return this.textBar.value.toString();
    }
    setTextValue(){
        this.textBar.value="";
    }
}customElements.define("message-bar",MessageBar,{extends:"div"});