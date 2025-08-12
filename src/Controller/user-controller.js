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
export{
    create,
    testRouter
}

