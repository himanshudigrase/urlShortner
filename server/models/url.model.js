import mongoose,{Schema} from "mongoose";

const urlSchema = new Schema({
    shortURL:{
        type: String,
        required:true,
        unique: true
    },
    redirectionURL:{
        type: String,
        required:true,
    },
    visitHistory:{
        type:Number,
        default:0
    }
},{timestamps: true});

export const Url = mongoose.model("Url",urlSchema);
