
import {UserService,BlackListTokenService} from "../service/index.js";
const userService=new UserService();
const blackTokenService=new BlackListTokenService();


const testRouter=(req,res)=>{

    return res.status(200).json({
        msg:"v1 route is working"
    })
    
}

const create=async(req,res)=>{
    try{
        console.log(req.body);
        const data=await userService.create(req.body);
        return res.status(201).json({
            data,
            status:true,
            message:"successfully created the user",
            err:{}
        })

    }
    catch(err){
        throw err;
    }
}

const login=async(req,res)=>{
   try{
    const data=await userService.login(req.body);
    res.cookie('token',data);
    return res.status(200).json({
        data,
        status:true,
        message:"successfully fetched the token",
        err:{}
    })

   }
   catch(err){
     return res.status(500).json({
        data:{},
        status:false,
        message:"not able to fetch the token",
        err:{}
     })

   }
}
const getUserData=async(req,res)=>{
    try{
       
        const data=await userService.getById(req.user.id);
        return res.status(200).json({
            data:data,
            status:true,
            message:"successfully fetch the user",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:fase,
            message:"not able to fetch the user",
            err:err
        })

    }
}

const logout=async(req,res)=>{
    try{
        let token=null;
        if(req.cookies.token){
            token=req.cookies.token;
        }
        else if(req.headers.authorization && req.headers.authorization.split(" ")[1]){
            token=req.headers.authorization.split(" ")[1];
        }

          res.clearCookie("token");

        if(!token){
            return res.status(200).json({
                msg:"logged out successfully,token was not present",

            })

        }

        await blackTokenService.create({token:token});
        return res.status(200).json({
            msg:"logged out successfully",

        })


    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to logout",
            err:err
        })

    }
}

export{
    create,
    testRouter,
    login,
    getUserData,
    logout
}

