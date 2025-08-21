import express from "express";
import bodyParser from "body-parser";
import { GOOGLE_CLOUD_API, PORT } from "./Config/serverConfig.js";
import connect from "./Config/db.js";
import appRouter from "./Route/index.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import http from "http"
import {Server} from "socket.io"

import User from "./Model/user.js";
import Captain from "./Model/Captain.js";

let io;





const setUpAndStartServer=()=>{
   const app=express();
   const server=http.createServer(app);
   io=new Server(server,{
    cors:{
      origin:"*"
    }
   });

   io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("join",async(data)=>{

      console.log(data);
      const {userId,userType}=data;
      if(userType=='user'){
        await User.findByIdAndUpdate(userId,{socketId:socket.id});

      }
      else{
        await Captain.findByIdAndUpdate(userId,{socketId:socket.id})
      }

    })

    socket.on("captain_live_location",async(data)=>{
      const {captainId,location}=data;
      console.log(captainId);
      console.log(location);
      try{
       await Captain.findByIdAndUpdate(
  captainId,
  {
    $set: {
      location: {
        type: "Point",
        coordinates: [location.lng, location.ltd]
      }
    }
  }

);

      }
      catch(err){
        console.log(err);

      }

    })
   })


   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(cookieParser());
  app.use(cors({
  origin: "*", // your React app
  credentials: true,               // allow cookies/auth headers
}));
   app.use("/api",appRouter)

 

    server.listen(PORT,async()=>{
     console.log(`listening on the port ${PORT}`);
     await connect();
     console.log("connected to the db");
     



     
   })

}
setUpAndStartServer();

export {
  io
}

