import {BlackListTokenRepository} from "../Repository/index.js";
import CrudService from "./crud-service.js";

class BlackListTokenService extends CrudService{
    constructor(){
        const repo=new BlackListTokenRepository();
        super(repo);
        this.blackTokenRepo=new BlackListTokenRepository();
    }
    async findByToken(token){
        try{
            const data=await this.blackTokenRepo.findByToken(token);
            return data;

        }
        catch(err){
            throw err;
        }
    }
}
export default BlackListTokenService;