import express from "express";
import { UserController } from "../../Controller/index.js";
import authMiddleware from "../../Middleware/authMiddleware.js";
import { userCreateValidator, userLoginValidator } from "../../Utils/userValidators.js";
import userValidator from "../../Middleware/validatorMiddleware.js";
const router=express.Router();

router.post("/user/create",userCreateValidator,userValidator,UserController.create);
router.get("/test",UserController.testRouter);

router.post("/user/login",userLoginValidator,userValidator,UserController.login);

router.get("/user/protected",authMiddleware,(req,res)=>{
    return res.status(200).json({
        user:req.user
    })
});

router.get("/user/profile",authMiddleware,UserController.getUserData);

router.post("/user/logout",authMiddleware,UserController.logout);


export default router;