import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./Config/serverConfig.js";
import connect from "./Config/db.js";
import appRouter from "./Route/index.js"
import cookieParser from "cookie-parser";
const setUpAndStartServer=()=>{
   const app=express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(cookieParser());
   app.use("/api",appRouter)

 

   app.listen(PORT,async()=>{
     console.log(`listening on the port ${PORT}`);
     await connect();
     console.log("connected to the db");
     
   })

}
setUpAndStartServer();