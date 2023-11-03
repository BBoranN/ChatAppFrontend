
import { location,bubblePlace, friend, message, userInformation } from "./types";
export class ChatPanel extends HTMLDivElement{
    user: userInformation;
    panel: HTMLDivElement;
    friendInfo:friend;
    messageBar: MessageBar;
    constructor(userSocket:WebSocket,friend:friend,user:userInformation){
        super();
        this.user=user;
        this.friendInfo=friend;
        this.className="ChatPanel";
        this.panel = document.createElement("div");
        this.messageBar= new MessageBar();

        this.append(this.panel);
        this.append(this.messageBar);

        this.messageBar.sendButton.addEventListener("click",()=>{
            let messageText= this.messageBar.getTextValue();
            this.messageBar.setTextValue();
            let messageJson: message ={type:"text", content: messageText,sender:user.id,reciever:friend[0]}
            console.log(messageJson);
            userSocket.send(JSON.stringify(messageJson));
        });
        
        this.messageBar.addFileImage.addEventListener("change",(event)=>{
            //const file = (event.target!).files[0];
            const file =this.messageBar.addFileImage.files![0];
            //let url = window.URL.createObjectURL(file);
            var reader  = new FileReader();
            let url;
            reader.onloadend = function () {
                url = reader.result;
                let newMessage: message={
                    type:"image",
                    content:url,
                    sender:user.id,
                    reciever:friend[0]
                } 
                userSocket.send(JSON.stringify(newMessage));
            }
            reader.readAsDataURL(file);
            /* let newMessage: message={
                "type":"image",
                "content":url,
                "sender":user.id,
                "reciever":friend[0]
            }
            userSocket.send(JSON.stringify(newMessage)); */
        });

        this.messageBar.addFile.addEventListener("change",()=>{
            let file = this.messageBar.addFile.files![0];
            var reader  = new FileReader();

            reader.onloadend = function () {
                let url = reader.result;
                let newMessage: message={
                    type:"file",
                    content:url!,
                    sender:user.id,
                    reciever:friend[0]
                } 
                userSocket.send(JSON.stringify(newMessage));
            }
            reader.readAsDataURL(file);
        });
    }
    public appendMessage(text,place:bubblePlace){
        let newText = document.createElement("p");
        newText.innerHTML=text;
        let newBubble = document.createElement("div");
        if(place ==location.left){
            newBubble.className="LeftBubble";
        }else{
            newBubble.className="RightBubble";
        }
        newBubble.appendChild(newText);
        this.panel.appendChild(newBubble);
    }
    public appendImageMessage(url,place:bubblePlace){
        let img = document.createElement("img");
        img.className="imageMessage";
        img.src=url;
        let bubble = document.createElement("div");
        if(place ==location.left){
            bubble.className="LeftBubble";
        }else{
            bubble.className="RightBubble";
        }
        bubble.appendChild(img);
        this.panel.appendChild(bubble);
    }
    public appendFileMessage(url,place:bubblePlace){
        console.log(url);
    }
}customElements.define("chat-panel",ChatPanel,{extends:"div"});

class MessageBar extends HTMLDivElement{
    textBar: HTMLInputElement;
    sendButton: HTMLButtonElement;
    addFileImage : HTMLInputElement;
    addFile : HTMLInputElement;
    constructor(){
        super();
        this.className="MessageBar";
        this.textBar= document.createElement("input");
        this.textBar.placeholder="Enter your message";
        this.textBar.type="text";
        this.sendButton= document.createElement("button");
        this.sendButton.innerHTML="Send Message";
        this.addFileImage=document.createElement("input");
        this.addFileImage.type="file";
        this.addFileImage.accept="image";
        this.addFile=document.createElement("input");
        this.addFile.type="file";

        this.appendChild(this.textBar);
        this.appendChild(this.sendButton);
        this.appendChild(this.addFileImage);
        this.appendChild(this.addFile);
    }
    getTextValue(){
        return this.textBar.value.toString();
    }
    setTextValue(){
        this.textBar.value="";
    }
}customElements.define("message-bar",MessageBar,{extends:"div"});