
import * as path from 'path';
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
            let messageJson: message ={type:"text", content: messageText,sender:user.id,reciever:friend.friendId}
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
                    reciever:friend.friendId
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
                    fileName:file.name,
                    sender:user.id,
                    reciever:friend.friendId
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
    public appendFileMessage(url,place:bubblePlace,fileName:string){
        //console.log(url);
        //const blob= URL.createObjectURL(url);
        //const file= new File([new Blob([url])],"new file");
        /* var arr = url.split(',');
        var mime= arr[0].match(/:(.*?);/)[1];
        const file= new File([new Blob([url])], "file", {type:mime});
        console.log(file); */
        var dFile= document.createElement('a');
        let bubble = document.createElement("div");
        if(place ==location.left){
            bubble.className="LeftBubble";
        }else{
            bubble.className="RightBubble";
        }
        dFile.className='dFile';
        dFile.href=url;
        dFile.download=fileName;
        dFile.innerHTML=fileName;
        bubble.appendChild(dFile);
        this.panel.appendChild(bubble);
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

        this.addFile.id="file-input";
        let addFileLabel = document.createElement("label");
        addFileLabel.htmlFor="file-input";
        let addFileImg = document.createElement("svg");
        addFileLabel.appendChild(addFileImg);
        addFileImg.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
        <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v160M336 256H176"/>
      </svg>`;
        

        this.addFileImage.id="image-input";
        let addFileImgLabel = document.createElement("label");
        addFileImgLabel.htmlFor="image-input";
        let addFileImgImg = document.createElement("svg");
        addFileImgLabel.appendChild(addFileImgImg);
        addFileImgImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="48" y="80" width="416" height="352" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><circle cx="336" cy="176" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`;

        this.sendButton.id="message-input";
        let MessageSendLabel = document.createElement("label");
        MessageSendLabel.htmlFor="message-input";
        let MessageSendImg = document.createElement("svg");
        MessageSendLabel.appendChild(MessageSendImg);
        MessageSendImg.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M53.12 199.94l400-151.39a8 8 0 0110.33 10.33l-151.39 400a8 8 0 01-15-.34l-67.4-166.09a16 16 0 00-10.11-10.11L53.46 215a8 8 0 01-.34-15.06zM460 52L227 285" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`;



    
        
        

        this.appendChild(this.textBar);
        this.appendChild(this.sendButton);
        this.appendChild(MessageSendLabel);
        this.appendChild(this.addFileImage);
        this.appendChild(addFileImgLabel);
        this.appendChild(this.addFile);
        this.appendChild(addFileLabel);
    }
    getTextValue(){
        return this.textBar.value.toString();
    }
    setTextValue(){
        this.textBar.value="";
    }
}customElements.define("message-bar",MessageBar,{extends:"div"});