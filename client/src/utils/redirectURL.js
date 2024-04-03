import { SERVER_URL } from "./constants"

export const redirectURL = async(shortURL)=>{
   try{
    const response =  await fetch(SERVER_URL + shortURL,{
        method:"GET", 
    });
    if (response.redirected) {
        const redirectedUrl = response.url;
        window.location.href = redirectedUrl;
      }
   }catch{
        throw new Error;
   }
    
}