import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
import { userSocket } from "./SocketService";
import { userInformation } from "./types";
import { changePage } from ".";
export class Login extends HTMLDivElement{
    constructor(){
        super();
        let loginButton = document.createElement("button");
        loginButton.innerHTML= "Connect with Google";
        this.appendChild(loginButton);
        loginButton.className="login button";
        loginButton.addEventListener("click", async ()=>{
            const provider = new GoogleAuthProvider();
            
            const userCrendtial = await signInWithPopup(firebaseAuth,provider);
            /* userInformation.displayName=userCrendtial.user.displayName;
            userInformation.email= userCrendtial.user.email;
            userInformation.profileImage= userCrendtial.user.photoURL;           
            this.hidden=true;
            userSocket.send(JSON.stringify(userInformation)); */
            console.log(userCrendtial);
            changePage();
        });
        this.className="login";
    }
}customElements.define("login-div",Login,{extends:"div"});
