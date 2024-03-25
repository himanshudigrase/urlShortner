import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
// import connectZK from './utils/zookeper.js'
import { connectZK } from "./utils/zookeper.js";

dotenv.config({
    path:'./.env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server listening at PORT: ${process.env.PORT}`)
    })
}).catch((err) =>{
    console.log("MONGODB connection failed !!",err);
}).then(()=>{
    connectZK();
});
