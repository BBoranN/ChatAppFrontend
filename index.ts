
import { Login } from "./login";
import { MainPage } from "./mainPage";
import { response, userInformation } from "./types";

export function changePage(userInfo:response,user:userInformation){
    console.log(userInfo.friends[0][0]);
    let mainPage= new MainPage(userInfo,user);
    document.body.appendChild(mainPage);
}
let login = new Login();
document.body.appendChild(login);

