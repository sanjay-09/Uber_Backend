import User from "../Model/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findByEmail(email){
        try{
            const res=await User.findOne({email:email});
            return res;

        }
        catch(err){
            throw err;

        }
    }
}
export default UserRepository;