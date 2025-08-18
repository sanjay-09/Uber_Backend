import { body } from "express-validator";

const rideCreateValidator=[
    body("origin").exists({checkFalsy:true}).withMessage("origin is the mandatory field").bail().isLength({min:3}).withMessage("origin length cannot be less than 3"),
    body("destination").exists({checkFalsy:true}).withMessage("destination is the mandatory field").bail().isLength({min:3}).withMessage("destination length cannot be less than 3 "),
    body("vehicleType").exists({checkFalsy:true}).withMessage("vechileType is the mandatory field").bail()
    
]
export {
    rideCreateValidator
}