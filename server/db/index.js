import mongoose from "mongoose";
import { MONGO_DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${MONGO_DB_NAME}`);
        console.log(`MONGODB connected successfully : ${connectionInstance}`);
    }
    catch(e){
        console.log("MONGODB connection failed",e);
        process.exit(0);
    }
}

export default connectDB;