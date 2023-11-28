/* import { httpRequest } from "./ConnectionService"; */
import { UserInfo } from "firebase/auth";
import { ApiConnectionService } from "./ConnectionService";
import { ChatPanel } from "./chatPanel";
import { friend, response, userInformation } from "./types";

export class MainPage extends HTMLDivElement{
    userInfo:response;
    user:userInformation;
    chatPanel:ChatPanel;
    friendList: {};
    chatList: {};
    constructor(userInfo:response,user:userInformation,userSocket: WebSocket){
        super();
        this.chatList={};
        this.className="MainPage";
        this.userInfo=userInfo;
        this.user=user;
        let sideBar = document.createElement("div");
        sideBar.className="SideBar";
        this.appendChild(sideBar);
        this.addLeftPanel(sideBar);

        let addFriendB= document.createElement("button");
        addFriendB.innerHTML="Yeni bir sohbet başlatın";
        addFriendB.className="AddFriend";
        sideBar.appendChild(addFriendB);

        addFriendB.addEventListener("click",()=>{
            let popup= new PopupDiv();
            document.body.appendChild(popup);
        });

        this.addFriendsBar(sideBar);
        for(let i=0;i<userInfo.friends.length;i++){
            let newPanel= new ChatPanel(userSocket,userInfo.friends[i],user);
            
            this.chatList[userInfo.friends[i][0]]= newPanel;
        }
    }
    addLeftPanel(parent){
        let leftUserPanel= document.createElement("div");
        leftUserPanel.className="UserPanel";
        let image= document.createElement("img");
        let userName= document.createElement("p");
        userName.innerHTML=this.user.displayName;
        image.src=this.user.profileImage!;
        leftUserPanel.appendChild(image);
        leftUserPanel.appendChild(userName);
        parent.appendChild(leftUserPanel);
    }
    addFriendsBar(parent){
        let friendsBar= document.createElement("div");
        friendsBar.className="FriendsBar";
        parent.appendChild(friendsBar);
        for(let i=0; i<this.userInfo.friends.length;i++){
            let friend=new FriendDiv(this.userInfo.friends[i]);
            friend.button.addEventListener("click",()=>{
                this.switchPanel(this.userInfo.friends[i][0]);
            });
            friendsBar.appendChild(friend);
            //this.friendList[this.userInfo.friends[i].friendId]=friend;
        }
    }
    /* addChatPanel(userSocket:WebSocket){
        if(this.chatPanel==null){
            let chatPanel = new ChatPanel(userSocket);
            this.chatPanel=chatPanel;
            this.appendChild(chatPanel);
        }
    } */
    switchPanel(id){
        if(this.chatPanel)
            this.removeChild(this.chatPanel);
        this.chatPanel=this.chatList[id];
        this.appendChild(this.chatPanel);
    }
}customElements.define("main-page",MainPage,{extends:"div"});

class FriendDiv extends HTMLDivElement{
    friendId:string;
    button:HTMLButtonElement;
    constructor(friend :friend){
        super();
        this.button= document.createElement("button");
        this.button.innerHTML=friend[1];
        this.friendId= friend.friendId;
        this.className="FriendDiv";
        this.appendChild(this.button);
        this.button.className="FriendButton";
        
    }
}customElements.define("friend-div",FriendDiv,{extends:'div'});

class PopupDiv extends HTMLDivElement{
    add: HTMLButtonElement;
    constructor(){
        super();
        this.className="Popup";
        let info= document.createElement("p");
        info.innerHTML="Please enter the email of the user you want to chat with:";
        this.appendChild(info);

        let inputForm= document.createElement("input");
        inputForm.placeholder="Enter here";
        this.appendChild(inputForm);

        this.add= document.createElement("button");
        this.add.innerHTML="Add Friend";
        this.appendChild(this.add);

        let cancel= document.createElement("button");
        cancel.innerHTML="Cancel";
        this.appendChild(cancel);

        cancel.addEventListener("click",()=>{
            this.parentNode?.removeChild(this);
        })
    }
}customElements.define("popup-div",PopupDiv,{extends:'div'});