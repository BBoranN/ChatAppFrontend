
import { message } from "./types";
export class ChatPanel extends HTMLDivElement{
    panel: HTMLDivElement;
    messageBar: MessageBar;
    constructor(userSocket:WebSocket){
        super();
        this.className="ChatPanel";
        this.panel = document.createElement("div");
        this.messageBar= new MessageBar();

        this.append(this.panel);
        this.append(this.messageBar);

        this.messageBar.sendButton.addEventListener("click",()=>{
            let messagex= this.messageBar.getTextValue();
            this.messageBar.setTextValue();
            let messageJson: message ={type:"text", content: messagex}
            userSocket.send(JSON.stringify(messageJson));
        });
        /* userSocket.onmessage = (event) =>{
            console.log(event.data);
            let incomingMessage= JSON.parse(event.data);
            if (incomingMessage.type =='text'){
                this.appendMessage(incomingMessage.content);
            }
            else if(incomingMessage.type=='image'){
                this.appendImageMessage(incomingMessage.content);
            }
        }  */
        this.messageBar.addFile.addEventListener("change",(event)=>{
            const file = (event.target!).files[0];
            let url = window.URL.createObjectURL(file);
            let newMessage: message={
                "type":"image",
                "content":url
            }
            userSocket.send(JSON.stringify(newMessage));
            console.log(url);
        })
    }
    public appendMessage(text){
        let newText = document.createElement("p");
        newText.innerHTML=text;
        let newBubble = document.createElement("div");
        newBubble.className="Bubble";
        newBubble.appendChild(newText);
        this.panel.appendChild(newBubble);
    }
    public appendImageMessage(url){
        let img = document.createElement("img");
        img.className="imageMessage";
        img.src=url;
        let bubble = document.createElement("div");
        bubble.className="Bubble";
        bubble.appendChild(img);
        this.panel.appendChild(bubble);
    }
}customElements.define("chat-panel",ChatPanel,{extends:"div"});

class MessageBar extends HTMLDivElement{
    textBar: HTMLInputElement;
    sendButton: HTMLButtonElement;
    addFile : HTMLInputElement;
    constructor(){
        super();
        this.className="MessageBar";
        this.textBar= document.createElement("input");
        this.textBar.placeholder="Enter your message";
        this.textBar.type="text";
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