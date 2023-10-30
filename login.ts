import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
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
            let user:userInformation= {
                        displayName :await userCrendtial.user.displayName!,
                        email: await userCrendtial.user.email!,
                        profileImage: await userCrendtial.user.photoURL!};
            
            console.log(user);
            let response =await ApiConnectionService.getUserInformation(user);
            console.log(response);
            user.id=(response?.id)?.toString();
            changePage(response!,user);
        });
        this.className="login";
    }
}customElements.define("login-div",Login,{extends:"div"});
