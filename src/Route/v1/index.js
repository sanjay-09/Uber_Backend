import express from "express";
import { CaptainController, UserController } from "../../Controller/index.js";
import authMiddleware from "../../Middleware/authMiddleware.js";
import { userCreateValidator, userLoginValidator } from "../../Utils/userValidators.js";
import userValidator from "../../Middleware/validatorMiddleware.js";
import { captainCreateValidator, captainLoginValidator } from "../../Utils/captainValidators.js";
const router=express.Router();

////user

router.post("/user/create",userCreateValidator,userValidator,UserController.create);
router.get("/test",UserController.testRouter);
router.post("/user/login",userLoginValidator,userValidator,UserController.login);
router.get("/user/protected",authMiddleware,(req,res)=>{
    return res.status(200).json({
        user:req.user
    })
});
router.get("/user/profile",authMiddleware("user"),UserController.getUserData);
router.post("/user/logout",authMiddleware("user"),UserController.logout);




//captain
router.post("/captain/create",captainCreateValidator,userValidator,CaptainController.create);
router.post("/captain/login",captainLoginValidator,userValidator,CaptainController.login);
router.get("/captain/protected",authMiddleware("captain"),(req,res)=>{
    return res.status(200).json({
        captain:req.captain
    })
})
router.get("/captain/profile",authMiddleware("captain"),CaptainController.getCaptainProfile);

export default router;