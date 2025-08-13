import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../Config/serverConfig.js";
const authMiddleware=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({
                msg:"token is not passed"
            })
        }
        const token=authHeader.split(" ")[1];
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