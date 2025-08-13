import {UserService} from "../service/index.js";
const userService=new UserService();


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
export{
    create,
    testRouter,
    login
}

