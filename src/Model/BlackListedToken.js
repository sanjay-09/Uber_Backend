import mongoose from "mongoose";


const blackListedTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*60*24
    }
})

const BlackListToken=mongoose.model("BlackListToken",blackListedTokenSchema);

export default BlackListToken;