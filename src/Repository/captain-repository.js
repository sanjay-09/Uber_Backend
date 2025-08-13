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

}
export default CaptainRepository;