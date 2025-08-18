import {RideRepository} from "../Repository/index.js"
import { BASE_FARE, PER_KM_RATE } from "../Config/serverConfig.js";
import LocationService from "./location-service.js";
import crypto from "crypto";


class RideService{
    constructor(){
        this.rideRepository=new RideRepository();
        this.locationService=new LocationService();
        

    }
     getFare(distance,time){
        try{
         const perKmRate={
            auto:9,
            motorcycle:7,
            car:12
         }
         const perMinRate={
             auto:5,
            motorcycle:3,
            car:9

         }
        const fare={
            auto:(BASE_FARE+20)+(distance*perKmRate.auto)+(time*perMinRate.auto),
            motorcycle:(BASE_FARE+20)+(distance*perKmRate.motorcycle)+(time*perMinRate.motorcycle),
            car:(BASE_FARE+20)+(distance*perKmRate.car)+(time*perMinRate.car)
            
        }
        return fare;


        }
        catch(err){
            throw err;

        }

    }
    async getDistanceAndTime(origin,destination){
        try{
            const res=await this.locationService.getDistanceTime(origin,destination);
           

            return {
                distance:Number(res.distance.split(" ")[0]),
                duration:Number(res.duration.split(" ")[0])
            };


        }
        catch(err){
            throw err;

        }


    }
    generateOtp(len){
        return crypto.randomInt(0,Math.pow(10,len));

    }
    async create(data){
       try{
         const {userId,origin,destination,vehicleType}=data;
         console.log(vehicleType);
 
        const res=await this.getDistanceAndTime(origin,destination);

        const totalFare=this.getFare(res.distance,res.duration);
     
        const ride=await this.rideRepository.create({
            userId,
            origin,
            destination,
            otp:this.generateOtp(6),
            fare:totalFare[vehicleType]
        });

        return ride;
       }
       catch(err){
        console.log(err);
        throw err;
       }



    }

   
}
export default RideService;