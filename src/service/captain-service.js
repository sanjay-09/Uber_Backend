import { JWT_SECRET } from "../Config/serverConfig.js";
import {CaptainRepository} from "../Repository/index.js";
import CrudService from "./crud-service.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

class CaptainService extends CrudService{
    constructor(){
        const captrepo=new CaptainRepository();
        super(captrepo);
        this.repo=new CaptainRepository();
    }

    async login(data){
        try{
            console.log(data);
            const {email,password}=data;
            const captain=await this.repo.getByEmail(email);
            if(!captain){
                throw new Error("user is not present");
            }
            const isPasswordCorrect=bcrypt.compareSync(password,captain.password);
            if(!isPasswordCorrect){
                throw new Error("Password is incorrect");

            }
            const token=jwt.sign({id:captain.id,email:captain.password},JWT_SECRET,{expiresIn:'1d'});


            return token;


        }
        catch(err){
            console.log(err);
            throw err;

        }
    }

}
export default CaptainService;