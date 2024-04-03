import { SERVER_URL } from "./constants"

export const redirectURL = async(shortURL)=>{
   try{
    const response =  await fetch(SERVER_URL + shortURL,{
        method:"GET", 
    });
    if (response.redirected) {
        // Get the final URL after redirection
        const redirectedUrl = response.url;
        
        // Redirect the browser to the final URL
        window.location.href = redirectedUrl;
      }
    console.log(response);
   }catch{
        throw new Error;
   }
    
}