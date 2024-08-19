import { Request, Response } from "express";
import { DriverModel } from "../model/driver_model";

import { IcreateObject } from "../interface/driver_interface"; 
import { UserModel } from "../../user/model/user_model";
import { OrderManagementModel } from "../../order/model/order_model";

export class DriverController {
    private _driverModel = new DriverModel();
    private _userModel = new UserModel();
    private _orderManagementModel = new OrderManagementModel();

    addUpdate = async (req: Request, res: Response) => {
        try {
            let create_res: any;
            let createObject: IcreateObject = {
                name: req.body.name ,
                email: req.body.email,
                phone: req.body.phone,
                vehicleType: req.body.vehicleType, 
                status: req.body.status
            }
            //  CHECK DRIVER IS PRESENT OR NOT AS A USER 
            let check_driver: any = await this._userModel.User.findOne({ email: req.body.email });
            if(!check_driver){
                return res.status(404).json({ status: false, message: `Can not ${req.body.driverId == '' ? 'add' : 'update'} as this driver is not a registered user.`});
            }

            if(req.body.driverId == ''){
                // ADD DRIVER
                create_res = await this._driverModel.Driver.create(createObject);
            }else{
                // UPDATE DRIVER
                create_res = await this._driverModel.Driver.findOneAndUpdate({
                    driverId: req.body.driverId
                },{ $set: createObject })
            }

            return res.status(200).json({
                status: true,
                data: {
                    driver_id: create_res.driverId
                },
                message: `Driver ${req.body.driverId == '' ? 'added' : 'updateed'} successfully.`
            })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    getDriver = async (req: Request, res: Response) => {
        try {

            let driverId = req.body.driverId == '' ? {} : { driverId: req.body.driverId };

            let driver: any = await this._driverModel.Driver.find(driverId).select('-createdAt -updatedAt -__v')

            return res.status(200).json({
                status: true,
                data: {
                    driver: driver
                },
                message: `Driver fetched successfully.`
            })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    deleteDriver =async (req: Request, res: Response) => {
        try {

            let checkDriver: any = await this._driverModel.Driver.findOne({ driverId: req.body.driverId }).select('_id status');
            if(!checkDriver){
                return res.status(404).json({ status: false, message: "Please provide valid driver id." });
            }

            if(checkDriver.status == 'active'){
                return res.status(400).json({ message: 'Cannot delete the driver because their status is currently active' });
            }
            let driver: any = await this._driverModel.Driver.findByIdAndDelete(checkDriver._id)

            return res.status(200).json({
                status: true,
                data: {},
                message: `Driver deleted successfully.`
            })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    driverPayment = async( req: Request, res: Response) => {
        try {
            let { driverId, ordersCompleted, timeSpentOnline, distanceTraveled } =req.body;
            let ratePerOrder = 50; 
            let ratePerHourOnline = 20; 
            let ratePerKm = 0.5; 

            let findDriver: any =  await this._driverModel.Driver.findOne({ driverId });
            if (!findDriver) {
                return res.status(404).json({ status: false, message: 'Driver not found.' });
            }
            let totalPayment = (ordersCompleted * ratePerOrder) +
            (timeSpentOnline * ratePerHourOnline) +
            (distanceTraveled * ratePerKm);

            return res.status(200).json({
                status: true,
                data: {
                    driverId,
                    totalPayment
                },
                message: "Driver's total payment fetched successdully"
            });
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }
}