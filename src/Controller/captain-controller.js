import { CaptainService, BlackListTokenService} from "../service/index.js";

const captainService=new CaptainService();
const blackListService=new BlackListTokenService();

const create=async(req,res)=>{
    try{
        const data=await captainService.create(req.body);
        return res.status(201).json({
            data,
            status:true,
            message:"succesfully created the captain",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to create the captain",
            err:err
        })

    }

}

const login=async(req,res)=>{
    try{
        const data=await captainService.login(req.body);
        return res.status(200).json({
            data,
            status:true,
            message:"sucessfully fetched the token",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to fetch the token",
            err:err
        })

    }
}
const getCaptainProfile=async(req,res)=>{
    try{
        const data=await captainService.getById(req.captain.id);
        return res.status(200).json({
            data,
            status:true,
            message:"successfully fetch the captain profile",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to get the captain profile",
            err:{}

        })
    }
}

const logout=async(req,res)=>{
    try{
        let token=null;
        if(req.cookies.token){
            token=req.cookies.token;
        }
        else if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer ")){
            token=req.headers.authorization.split(" ")[1];
        }
       await blackListService.create({token});
       return res.status(200).json({
        msg:"successfully logout"
       })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"Not able to logout",
            err:{}
        })
    }
}
export{
    create,
    login,
    getCaptainProfile,
    logout
}