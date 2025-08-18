import { body, query } from "express-validator";

const LocationCoordinatesValidator=[
    query("address").exists({checkFalsy:true}).withMessage("address can not be empty").bail().isLength({min:3}).withMessage("address minimun length should be 3")
]

const LocationDistanceValidator=[
    query("origin").exists({checkFalsy:true}).withMessage("origin address can not be empty").bail().isLength({min:3}).withMessage("origin address length length should be greater than 3"),
     query("destination").exists({checkFalsy:true}).withMessage("destination address can not be empty").bail().isLength({min:3}).withMessage("destination address length length should be greater than 3")

]

const LocationInputValidator=[
    query("input").exists({checkFalsy:true}).withMessage("input should be present for the suggestion").bail().isLength({min:3}).withMessage("length should be minimum 3")
]

export {
    LocationCoordinatesValidator,
    LocationDistanceValidator,
    LocationInputValidator
}