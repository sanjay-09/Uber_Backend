import CrudRepository from "./crud-repository.js";
import Ride from "../Model/Ride.js";

class RideRepository extends CrudRepository{
    constructor(){
        super(Ride);
    }
}
export default RideRepository;