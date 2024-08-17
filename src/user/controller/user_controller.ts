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
                return res.status(409).json({ status: false, message: "A user with the provided credentials already exists. Please try another email or username." })
            }

            let { _id } = await this._userModel.User.create(signUpObj);

            return res.status(201).json({ status: true, data: { _id },  message: "Signup successful." })

        } catch (error: any) {
            return res.status(500).json({  status: false, message: error.message })
        }
    }



    loginUser = async( req: Request, res: Response) => {
        try {
            let { email, password } = req.body;
            let checkUser: any = await this._userModel.User.findOne({email});
          
            if (!checkUser || !(await checkUser.isPasswordCorrect(password))) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }
         
            const { accessToken, refreshToken } = await this.generateAccessAndRefreshTokens(checkUser._id);


            return res.status(200).cookie('accessToken',accessToken,{httpOnly: true, secure: true}).cookie('refreshToken',refreshToken,{httpOnly: true, secure: true}).json({status: true, data: { accessToken, refreshToken  },
            message: "Logged in successfully."})
        } catch (error: any) {
            return res.status(500).json({  status: false, message: error.message })
        }
    }

    generateAccessAndRefreshTokens =  async (userId: string): Promise<{ accessToken: string, refreshToken: string }> => {
        try {
            const user: any = await this._userModel.User.findById(userId);
            const accessToken = await  user.generateAccessToken();
            const refreshToken = await  user.generateRefreshToken();
    
            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });

            return {
                accessToken,
                refreshToken
            }
        } catch (error: any) {
            throw new Error("An error occurred while generating tokens.");
        }
    }
}