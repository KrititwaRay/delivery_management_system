import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export class CommonMiddleware {
    
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
}
