
export class ApiConnectionService{
    constructor(){

    }
    static async getUserInformation(userInformation){
        try{
            const response = await fetch("http://localhost:8089/UserInfo",{
                method: "POST",
                body: JSON.stringify(userInformation),
                headers:{
                    "content-type": "application/json"
                }
            });
            const data =await response.json();
            console.log(data.value);
        }catch(exception){

        }
    }
}