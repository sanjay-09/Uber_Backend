import Captain from "../Model/Captain.js";
import CrudRepository from "./crud-repository.js";

class CaptainRepository extends CrudRepository{
    constructor(){
        super(Captain);
    }
    async getByEmail(email){
        try{
            const data=await Captain.findOne({
                email
            })
            return data;

        }
        catch(err){
            throw err;
        }
    }

    async getCaptainInRadius(ltd,lng,radius){
        try{
            const ultd=Number(ltd);
            const ulng=Number(lng);
         const captains = await Captain.find({
  location: {
    $geoWithin: {
      $centerSphere: [[lng, ltd], radius / 6378.1] // if radius in miles
    }
  }
});
            console.log(captains);
            return captains;


        }
        catch(err){
            throw err;

        }
    }

}
export default CaptainRepository;