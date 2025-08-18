import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { SALT } from "../Config/serverConfig.js";

const captainSchema=new mongoose.Schema({
  fullName:{
    firstName:{
        type:String,
        required:true,
        minLength:[3,"length should be 3 or more than 3"]
    },
    lastName:{
        type:String,
        minLength:[3,"length should be 3 or more than 3"]
    }
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true,
     minLength:[4,"length should be 3 or more than 3"]

  },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"inactive"
  },
  vehicle:{
    color:{
        type:String,
        required:true
    },
    plate:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true,
        min:[1,"capacity should be atleast 1"]
    },
    vehicleType:{
        type:String,
        required:true,
        enum:["pending","car","motorcycle","auto"],
        
    },
    location:{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        }
    }

  }
},{timestamps:true});

captainSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,SALT);
    next();

})

const Captain=mongoose.model("Captain",captainSchema);
export default Captain;