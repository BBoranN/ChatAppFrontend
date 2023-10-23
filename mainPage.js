
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
        let chatPanel= document.createElement("div");
        chatPanel.className="ChatPanel";
        this.appendChild(chatPanel);
    }
}customElements.define("main-page",MainPage,{extends:"div"});