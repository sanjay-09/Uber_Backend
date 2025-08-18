import {RideService} from "../service/index.js"
const rideService=new RideService();

const create=async(req,res)=>{
    try{
        const input={
            userId:req.user.id,
            origin:req.body.origin,
            destination:req.body.destination,
            vehicleType:req.body.vehicleType
        }
    
        const data=await rideService.create(input);
        return res.status(201).json({
            data:data,
            status:true,
            message:"successfully created the ride",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            message:"not able to create the ride",
            err:{}
        })
    }
}
export {
    create
}