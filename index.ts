
import { Login } from "./login";
import { MainPage } from "./mainPage";
import { message, response, userInformation } from "./types";



export function changePage(userInfo:response,user:userInformation){
    console.log(userInfo.friends[0][0]);
    let userSocket = new WebSocket("ws://localhost:8088");
    userSocket.onopen= ()=>{
        let connectionMessage: message={type:"login", content:userInfo.id};
        userSocket.send(JSON.stringify(connectionMessage));
    }
    
    let mainPage= new MainPage(userInfo,user,userSocket);
    document.body.appendChild(mainPage);
    
    userSocket.onmessage =(event)=>{
        console.log(event.data);
            let incomingMessage= JSON.parse(event.data);
            if (incomingMessage.type =='text'){
                mainPage.chatPanel.appendMessage(incomingMessage.content);
            }
            else if(incomingMessage.type=='image'){
                mainPage.chatPanel.appendImageMessage(incomingMessage.content);
            }
    }
    
    
}
let login = new Login();
document.body.appendChild(login);

