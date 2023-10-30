/* import { httpRequest } from "./ConnectionService"; */
import { UserInfo } from "firebase/auth";
import { ApiConnectionService } from "./ConnectionService";
import { ChatPanel } from "./chatPanel";
import { friend, response, userInformation } from "./types";

export class MainPage extends HTMLDivElement{
    userInfo:response;
    user:userInformation;
    constructor(userInfo:response,user:userInformation){
        super();
        this.className="MainPage";
        this.userInfo=userInfo;
        this.user=user;
        let sideBar = document.createElement("div");
        sideBar.className="SideBar";
        this.appendChild(sideBar);
        this.addLeftPanel(sideBar);
        this.addFriendsBar(sideBar);
        this.addChatPanel();
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
            friendsBar.appendChild(friend);
        }
    }
    addChatPanel(){
        let chatPanel = new ChatPanel();
        this.appendChild(chatPanel);
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