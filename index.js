
import { Login } from "./login";
import { MainPage } from "./mainPage";

export function changePage(){
    let mainPage= new MainPage();
    document.body.appendChild(mainPage);
}
let login = new Login();
document.body.appendChild(login);

