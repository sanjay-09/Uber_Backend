import CrudRepository from "./crud-repository.js";
import Ride from "../Model/Ride.js";

class RideRepository extends CrudRepository{
    constructor(){
        super(Ride);
    }
    async getById(ride_id){
        try{
            const data=await Ride.findById(ride_id).populate("userId");
            return data;


        }
        catch(err){
            throw err;
        }
    }
}
export default RideRepository;