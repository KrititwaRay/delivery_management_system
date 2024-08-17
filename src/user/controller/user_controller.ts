import { Request, Response } from "express";
import { UserModel } from "../model/user_model";
import { IsignUp } from "../interface/user_interface";

export class UserController {
    private _userModel = new UserModel();

    signUp = async (req: Request, res: Response) => {
        try {
            let signUpObj: IsignUp = {
                f_name: req.body.f_name,
                l_name: req.body.l_name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            // CHECK USER IS PRESENT OR NOT
            let checkUser = await this._userModel.User.findOne({ email: req.body.email });

            if (checkUser) {
                return res.status(409).json({
                    status: false,
                    message: "A user with the provided credentials already exists. Please try another email or username."
                })
            }

            let { _id } = await this._userModel.User.create(signUpObj);

            return res.status(201).json({
                status: true,
                data: { _id },
                message: "Signup successful."
            })

        } catch (error: any) {

            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    }
}