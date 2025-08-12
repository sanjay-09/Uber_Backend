import {UserRepository} from "../Repository/index.js"
import CrudService from "./crud-service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../Config/serverConfig.js";

class UserService extends CrudService{
    constructor(){
        const repo=new UserRepository();
        super(repo);
        this.userRep=new UserRepository();
    }

    async login(data){
        try{
            const {email,password}=data;

        const user=await this.userRep.findByEmail(email);
        if(!user){
            throw new Error("User is not present");
        }

        const isPasswordOk=bcrypt.compareSync(password,user.password);
        if(!isPasswordOk){
            throw new Error("password is incorrect");  
        }

        const token=jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'1d'});
        return token;

        }
        catch(err){
            throw err;
        }

    }
}
export default UserService;