import { SERVER_URL } from "./constants";

export const postLongUrl = async(longUrl) =>{
    const data = {
        longUrl: longUrl
    }
    try{
        
       const response =  await fetch(SERVER_URL,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            mode:'cors',
            body:JSON.stringify(data) 
       });
       if(!response.ok){
            throw new Error("Error posting data");
       }
       const jsonData = await response.json();
       console.log("Response recvd after post",jsonData.data);
       return jsonData.data;
    }
    catch{

    }
}