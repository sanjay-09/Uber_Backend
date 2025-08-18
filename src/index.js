import express from "express";
import bodyParser from "body-parser";
import { GOOGLE_CLOUD_API, PORT } from "./Config/serverConfig.js";
import connect from "./Config/db.js";
import appRouter from "./Route/index.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
const setUpAndStartServer=()=>{
   const app=express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(cookieParser());
   app.use(cors());
   app.use("/api",appRouter)

 

   app.listen(PORT,async()=>{
     console.log(`listening on the port ${PORT}`);
     await connect();
     console.log("connected to the db");
     



     
   })

}
setUpAndStartServer();