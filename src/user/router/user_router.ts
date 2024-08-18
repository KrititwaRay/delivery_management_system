import express  from "express";
const router = express.Router();


import { UserController } from "../controller/user_controller";
const userController = new UserController();

import { UserValidation } from "../middleware/user_middleware";
const userValidation = new UserValidation();

import { CommonMiddleware } from "../../helper/common_middleware";
const commonMiddleware = new CommonMiddleware();

let middleware : any [] = [];


middleware = [
    userValidation.signupValidation(),
    commonMiddleware.checkForErrors
]
router
.route('/sign-up')
.post(middleware,userController.signUp)


middleware = [
    userValidation.loginValidation(),
    commonMiddleware.checkForErrors
]
router
.route('/log-in')
.post(middleware,userController.loginUser)


middleware = [
    commonMiddleware.authenticationMiddleware
]
router
.route('/log-out')
.post(middleware,userController.logoutUser)

export const user_route = router;