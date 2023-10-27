import { userSocket } from "./SocketService";

export class ChatPanel extends HTMLDivElement{
    panel: HTMLDivElement;
    messageBar: MessageBar;
    constructor(){
        super();
        this.className="ChatPanel";
        this.panel = document.createElement("div");
        this.messageBar= new MessageBar();

        this.append(this.panel);
        

        this.append(this.messageBar);

        this.messageBar.sendButton.addEventListener("click",()=>{
            let message= this.messageBar.getTextValue();
            this.messageBar.setTextValue();
        
            userSocket.send(JSON.stringify(message));
        });
        userSocket.onmessage = (event) =>{
            this.appendMessage(event.data);
        } 
        this.messageBar.addFile.addEventListener("input",(event)=>{
            let image = document.createElement("image");
            
            console.log(event);
            
        })
        this.messageBar.addFile.addEventListener("change",(event)=>{
            let image = document.createElement("image");
            
            console.log(event);
            
        })
    }
    appendMessage(text){
        let newBubble = document.createElement("p");
        newBubble.innerHTML=text;
        newBubble.className="Bubble";
        this.panel.appendChild(newBubble);
    }
}customElements.define("chat-panelx",ChatPanel,{extends:"div"});

class MessageBar extends HTMLDivElement{
    textBar;
    sendButton;
    addFile : HTMLInputElement;
    constructor(){
        super();
        this.textBar= document.createElement("textarea");
        this.textBar.placeholder="Enter your message";
        this.sendButton= document.createElement("button");
        this.sendButton.innerHTML="Send Message";
        this.addFile=document.createElement("input");
        this.addFile.type="file";
        this.addFile.accept="image";
        

        this.appendChild(this.textBar);
        this.appendChild(this.sendButton);
        this.appendChild(this.addFile);
    }
    getTextValue(){
        return this.textBar.value.toString();
    }
    setTextValue(){
        this.textBar.value="";
    }
}customElements.define("message-bar",MessageBar,{extends:"div"});