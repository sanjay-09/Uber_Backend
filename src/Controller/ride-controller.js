import {RideService,LocationService,CaptainService} from "../service/index.js"
const locationService=new LocationService();
const rideService=new RideService();
const captainService=new CaptainService();
import {io} from "../index.js"

const create = async (req, res) => {
  try {
    const input = {
      userId: req.user.id,
      origin: req.body.origin,
      destination: req.body.destination,
      vehicleType: req.body.vehicleType
    };

    const data = await rideService.create(input);

    const coordinates = await locationService.getCoordinates(data.origin);

    const locationObj = {
      ltd: coordinates.lat,
      lng: coordinates.lng,
      radius: 3
    };

    const captains = await captainService.captainInRadius(locationObj);

    const userRide = await rideService.getById(data._id);
    console.log(userRide);

    captains.forEach((c) => {
      io.to(c.socketId).emit("ride-notifications", userRide);
    });

    return res.status(201).json({
      data,
      status: true,
      message: "successfully created the ride",
      err: {}
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      message: "not able to create the ride",
      err: err.message
    });
  }
};


const ridesFare=async(req,res)=>{
    try{
        const finalData={
            origin:req.query.origin,
            destination:req.query.destination
        }
        const data=await rideService.allFares(finalData);

        res.status(200).json({
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