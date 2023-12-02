
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
        let addFileImg = document.createElement("img");
        addFileLabel.appendChild(addFileImg);
        addFileImg.src="./imagess/docs.png";

        this.addFileImage.id="image-input";
        let addFileImgLabel = document.createElement("label");
        addFileImgLabel.htmlFor="image-input";
        let addFileImgImg = document.createElement("img");
        addFileImgLabel.appendChild(addFileImgImg);
        addFileImgImg.src="./imagess/gallery.png";

        this.sendButton.id="message-input";
        let MessageSendLabel = document.createElement("label");
        MessageSendLabel.htmlFor="message-input";
        let MessageSendImg = document.createElement("img");
        MessageSendLabel.appendChild(MessageSendImg);
        MessageSendImg.src="./imagess/sendmessage.png";



    
        
        

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