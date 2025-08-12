import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { SALT } from "../Config/serverConfig.js";

const userSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"Length must be more than 3"]
        },

        lastName:{
            type:String,
            required:true,
            minLength:[3,"Length must be more than 3"]


        }
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});


userSchema.pre("save",function(next){
    

     this.password=bcrypt.hashSync(this.password,SALT);
     next();

})

const User=mongoose.model("User",userSchema);
export default User;


