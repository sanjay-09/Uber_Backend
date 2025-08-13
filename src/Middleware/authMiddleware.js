import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../Config/serverConfig.js";
import BlackListToken from "../Model/BlackListedToken.js";
const authMiddleware=async(req,res,next)=>{
    try{
      let token=null;
      if(req.cookies.token){
        token=req.cookies.token;
      }
      else if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer ")){
        token=req.headers.authorization.split(" ")[1];
      }
      
      if(!token){
        return res.status(500).json({
            msg:"token is not provided"
        })
      }
      const blackListToken=await BlackListToken.findOne({token:token});
      if(blackListToken){
        return res.status(400).json({
            msg:"Please login in again to move forward"
        })
      }
      const user=jwt.verify(token,JWT_SECRET);
      req.user=user;
      next();

    }
    catch(err){
        console.log(err.name);
        if(err.name=='JsonWebTokenError'){
            return res.status(400).json({
            msg:"invalid token"
        })

        }

        if(err.name=='TokenExpiredError'){
            return res.status(400).json({
                msg:"token is expired"
            })
        }

        return res.status(500).json({
            msg:"server error"
        })

    }

}
export default authMiddleware;