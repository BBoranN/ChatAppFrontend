import { friend, response } from "./types";

export class ApiConnectionService{
    constructor(){

    }
    static async getUserInformation(userInformation): Promise<response|null>{
        try{
            const response = await fetch("http://localhost:8089/UserInfo"
            /* "https://agalarchat-1fc8ccec3c82.herokuapp.com/UserInfo" */,{
                method: "POST",
                body: JSON.stringify(userInformation),
                headers:{
                    "content-type": "application/json"
                }
            });
            const data =await response.json();
            console.log(data);
            return data;
        }catch(exception){
            return null;
        }
    }
    static async updateFriends(friendList): Promise<friend[]|null>{
        try{
            const response = await fetch("http://localhost:8089/addToFriends"
            /* "https://agalarchat-1fc8ccec3c82.herokuapp.com/addToFriends" */,{
                method: "PUT",
                body: JSON.stringify(friendList),
                headers:{
                    "content-type": "application/json"
                }
            });
            const data= await response.json();
            console.log(data);
            return data;
        }catch(exception){
            return null;
        }
    }
}