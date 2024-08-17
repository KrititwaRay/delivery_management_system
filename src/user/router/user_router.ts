import express  from "express";
const router = express.Router();


import { UserController } from "../controller/user_controller";
const userController = new UserController();




router
.route('/sign-up')
.post(userController.signUp)


export const user_route = router;