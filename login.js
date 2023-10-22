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
            const {user:{displaName: name, email}} = await signInWithPopup(firebaseAuth,provider);
            console.log(user);
        });
    }
}customElements.define("login-div",Login,{extends:"div"});
