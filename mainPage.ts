/* import { httpRequest } from "./ConnectionService"; */
import { ApiConnectionService } from "./ConnectionService";
import { ChatPanel } from "./chatPanel";
import { friend } from "./types";

export class MainPage extends HTMLDivElement{
    constructor(){
        super();
        this.className="MainPage";
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
        parent.appendChild(leftUserPanel);
    }
    addFriendsBar(parent){
        let friendsBar= document.createElement("div");
        friendsBar.className="FriendsBar";
        parent.appendChild(friendsBar);
    }
    addChatPanel(){
        let chatPanel = new ChatPanel();
        this.appendChild(chatPanel);
    }
}customElements.define("main-page",MainPage,{extends:"div"});

class FriendDiv extends HTMLDivElement{
    friendId:string;
    constructor(friend :friend){
        super();
        let displaName= document.createElement("p");
        displaName.innerHTML=friend.displayName;
        this.friendId= friend.friendId;
        this.className="FriendDiv";
    }
}customElements.define("friend-div",FriendDiv,{extends:'div'});