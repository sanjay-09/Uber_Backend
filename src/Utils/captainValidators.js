import { body } from "express-validator";

const captainCreateValidator=[
    body("fullName.firstName").exists({checkFalsy:true}).withMessage("firstName should be present").bail().isLength({min:3}).withMessage("FirstName length should be greater than 3"),
    body("fullName.lastName").optional({checkFalsy:true}).isLength({min:3}).withMessage("lastName minimum length should be 3"),
    body("email").exists({checkFalsy:true}).withMessage("email should be present").bail().isEmail().withMessage("provide a valid email"),
    body("password").exists({checkFalsy:true}).withMessage("password is compulsory").bail().isLength({min:4}).withMessage("password should be 3 or more than 3"),
    body("vehicle.color").exists({checkFalsy:true}).withMessage("vehicle color is required"),
    body("vehicle.plate").exists({checkFalsy:true}).withMessage("vehicle plate is required"),
    body("vehicle.vehicleType").exists({checkFalsy:true}).withMessage("vehicle type is required"),
    body("vehicle.capacity").exists({checkFalsy:true}).withMessage("vehicle capacity is required").isInt({min:1}).withMessage("value should be greater than 1")

]

const captainLoginValidator=[
      body("email").exists({checkFalsy:true}).withMessage("email should be present").bail().isEmail().withMessage("provide a valid email"),
    body("password").exists({checkFalsy:true}).withMessage("password is compulsory").bail().isLength({min:4}).withMessage("password should be 3 or more than 3")

]

export {
    captainCreateValidator,
    captainLoginValidator
}