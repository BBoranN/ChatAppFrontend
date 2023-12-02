
import { Login } from "./login";
import { MainPage } from "./mainPage";
import { message, response, userInformation } from "./types";

let userSocket;
let userId;
export function changePage(userInfo:response,user:userInformation){
    //userSocket = new WebSocket("ws://localhost:8089");
    userSocket = new WebSocket("ws://agalarchat-1fc8ccec3c82.herokuapp.com");
    userSocket.onopen= ()=>{
        let connectionMessage: message={type:"login", content:userInfo.id};
        userSocket.send(JSON.stringify(connectionMessage));
    }
    userId=userInfo.id;
    let mainPage= new MainPage(userInfo,user,userSocket);
    document.body.appendChild(mainPage);
    
    userSocket.onmessage =(event)=>{
        let incomingMessage= JSON.parse(event.data);
        if(incomingMessage.type !='addFriend'){
            if(incomingMessage.reciever!=user.id){
                if (incomingMessage.type =='text'){
                    mainPage.chatList[incomingMessage.reciever].appendMessage(incomingMessage.content,"right");
                }
                else if(incomingMessage.type=='image'){
                    mainPage.chatList[incomingMessage.reciever].appendImageMessage(incomingMessage.content,"right");
                }else if(incomingMessage.type =='file'){
                    mainPage.chatList[incomingMessage.reciever].appendFileMessage(incomingMessage.content,"right",incomingMessage.fileName);
                }
            }else{
                if (incomingMessage.type =='text'){
                    mainPage.chatList[incomingMessage.sender].appendMessage(incomingMessage.content,"left");
                }
                else if(incomingMessage.type=='image'){
                    mainPage.chatList[incomingMessage.sender].appendImageMessage(incomingMessage.content,"left");
                }else if(incomingMessage.type =='file'){
                    mainPage.chatList[incomingMessage.sender].appendFileMessage(incomingMessage.content,"left",incomingMessage.fileName);
                }
            }
        }else{
            console.log(incomingMessage.newList);
            mainPage.updateFriends(incomingMessage.newList,userSocket);
        }
    }
    
    
}
let login = new Login();
document.body.appendChild(login);

window.addEventListener("beforeunload", function(){
    if(userSocket.readyState == WebSocket.OPEN){
        userSocket.close(1000,userId);
    }
})
