import mongoose from "mongoose";
import { MONGO_DB_URI } from "./serverConfig.js";



const connect=async()=>{
   try{
     await mongoose.connect(`${MONGO_DB_URI}/uber`)
   }
   catch(err){
    console.log(err);
   }

}
export default connect;

