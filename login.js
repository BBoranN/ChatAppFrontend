
export class Login extends HTMLDivElement{
    constructor(){
        super();
        let loginButton = document.createElement("button");
        loginButton.innerHTML= "Connect with Google";
        this.appendChild(loginButton);
        loginButton.className="login button";
    }
}customElements.define("login-div",Login,{extends:"div"});
