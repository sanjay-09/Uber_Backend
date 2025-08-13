import BlackListToken from "../Model/BlackListedToken.js";
import CrudRepository from "./crud-repository.js";

class BlackListTokenRepository extends CrudRepository{
    constructor(){
        super(BlackListToken);
    }
    async findByToken(token){
        try{
            const data=await BlackListToken.findOne({
                token:token
            });
            return data;

        }
        catch(err){
            throw err;
        }
    }
}
export default BlackListTokenRepository;