import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
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
            console.log(userCrendtial.user);
            this.hidden=true;
        });
    }
}customElements.define("login-div",Login,{extends:"div"});
