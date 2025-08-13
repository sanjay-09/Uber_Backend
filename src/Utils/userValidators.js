import { body } from "express-validator";

const userCreateValidator = [
  body("fullName.firstName")
    .exists({ checkFalsy: true })
    .withMessage("firstName is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("firstName should be at least 3 characters long"),

  body("fullName.lastName")
    .optional({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("lastName should be at least 3 characters long"),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("please provide a valid email"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .bail()
    .isLength({ min: 4 })
    .withMessage("password should be at least 6 characters long")
];

const userLoginValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("please provide a valid email"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .bail()
    .isLength({ min: 4 })
    .withMessage("password should be at least 6 characters long")
];

export {
  userCreateValidator,
  userLoginValidator
};
