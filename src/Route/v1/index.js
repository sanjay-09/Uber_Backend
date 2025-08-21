import express from "express";
import { CaptainController, LocationController, RideController, UserController } from "../../Controller/index.js";
import authMiddleware from "../../Middleware/authMiddleware.js";
import { userLoginValidator,userCreateValidator } from "../../Utils/userValidators.js";
import Validator from "../../Middleware/validatorMiddleware.js";
import { captainCreateValidator, captainLoginValidator } from "../../Utils/captainValidators.js";
import { LocationCoordinatesValidator, LocationDistanceValidator, LocationInputValidator } from "../../Utils/locationValidators.js";
import { rideCreateValidator, rideFareValidator } from "../../Utils/rideValidator.js";
import Ride from "../../Model/Ride.js";

const router=express.Router();

////user

router.post("/user/create",userCreateValidator,Validator,UserController.create);
router.get("/test",UserController.testRouter);
router.post("/user/login",userLoginValidator,Validator,UserController.login);
router.get("/user/protected",authMiddleware,(req,res)=>{
    return res.status(200).json({
        user:req.user
    })
});
router.get("/user/profile",authMiddleware("user"),UserController.getUserData);
router.post("/user/logout",authMiddleware("user"),UserController.logout);




//captain
router.post("/captain/create",captainCreateValidator,Validator,CaptainController.create);
router.post("/captain/login",captainLoginValidator,Validator,CaptainController.login);
router.get("/captain/protected",authMiddleware("captain"),(req,res)=>{
    return res.status(200).json({
        captain:req.captain
    })
})
router.get("/captain/profile",authMiddleware("captain"),CaptainController.getCaptainProfile);
router.post("/captain/logout",authMiddleware("captain"),CaptainController.logout);



//location

router.get("/user/getCoordinates",LocationCoordinatesValidator,Validator,authMiddleware("user"),LocationController.getCoordinates);
router.get("/user/distance",LocationDistanceValidator,authMiddleware("user"),LocationController.getDistance);

router.get("/getSuggestions",LocationInputValidator,authMiddleware("user"),LocationController.getSuggestions);



//ride

router.post("/ride/create",rideCreateValidator,authMiddleware("user"),RideController.create);
router.get("/ride/getFare",rideFareValidator,authMiddleware("user"),RideController.ridesFare);


router.post("/ride",(req,res)=>{
    console.log(req.body);
    res.json({
        msg:"ok"
    })

})


router.get("/captains",CaptainController.testCaptains);

export default router;