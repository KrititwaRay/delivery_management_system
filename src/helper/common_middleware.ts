import { validationResult } from "express-validator";
import { Request, Response, NextFunction, json } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../user/model/user_model";
export class CommonMiddleware {

    private _userModel = new UserModel();
    

    checkForErrors = async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response_status = {
                message: "Bad Request.",
                action_status: false
            };
            const response_data = {
                data: errors.array(),
                status: response_status
            };

            return res.status(400).json({ response: response_data });
        } else {
            next();
        }
    }


    authenticationMiddleware = async (req: any,  res: Response, next: NextFunction ) : Promise<any> => {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        if(!token){
            return res.status(401).json({ status: false, message: "Unauthorized request." })
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user: any = await this._userModel.User.findById(decodedToken?._id).select("-password -refreshToken")
        req.user = user;
        next();
    }


     isAdminOrNot = (...roles: string[]) => {
        return (req: any, res: Response, next: NextFunction) => {
            // Check if the user's role is included in the allowed roles
            if (!roles.includes(req.user?.role)) {
                return res.status(403).json({status: false, message: "You are not allowed to access this."})
            }
            next();
        };
    };
}
