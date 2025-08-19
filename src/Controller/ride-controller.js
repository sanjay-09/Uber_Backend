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

const ridesFare=async(req,res)=>{
    try{
        const finalData={
            origin:req.query.origin,
            destination:req.query.destination
        }
        const data=await rideService.allFares(finalData);
        return res.status(200).json({
            data:data,
            status:true,
            message:"successfully fetched the details",
            err:{}

        })



    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to fetch the details",
            err:err
        })

    }
}
export {
    create,
    ridesFare
}