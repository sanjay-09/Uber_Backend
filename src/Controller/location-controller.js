import {LocationService} from "../service/index.js"
const locationService=new LocationService();

const getCoordinates=async(req,res)=>{
    try{
        const data=await locationService.getCoordinates(req.query.address);
        return res.status(200).json({
            data:data,
            status:true,
            message:"able to fetch the coordinates",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"not able to fetch the coordinates",
            err:{}


        })
    }

}

const getDistance=async(req,res)=>{
    try{

        const data=await locationService.getDistanceTime(req.query.origin,req.query.destination);
        return res.status(200).json({
            data:data,
            status:true,
            message:"succesfully fetched the details",
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

const getSuggestions=async(req,res)=>{
    try{
        const data=await locationService.getLocationSuggestions(req.query.input);
        return res.status(200).json({
            data:data,
            status:true,
            message:"able to fetch the location",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:true,
            message:"not able to fetch the location",
            err:err
        })

    }
}
export {
    getCoordinates,
    getDistance,
    getSuggestions

}