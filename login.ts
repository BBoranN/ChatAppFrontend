import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
import { userSocket } from "./SocketService";
import { userInformation } from "./types";
import { changePage } from ".";
import { ApiConnectionService } from "./ConnectionService"; 
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
            let user = {displaName :await userCrendtial.user.displayName,
                        email: await userCrendtial.user.email};
            
            console.log(user);
            await ApiConnectionService.getUserInformation(user);
            changePage();
        });
        this.className="login";
    }
}customElements.define("login-div",Login,{extends:"div"});
