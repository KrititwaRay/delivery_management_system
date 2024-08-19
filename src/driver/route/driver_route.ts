import express  from "express";
const route = express.Router();

import { DriverController } from "../controller/driver_controller";
const driverController = new DriverController();

import { CommonMiddleware } from "../../helper/common_middleware";
const commonMiddleware = new CommonMiddleware();

import { DriverValidation } from "../middleware/driver_middleware";
const driverValidation = new DriverValidation();

let middleware: any [] = [];


middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    driverValidation.createDriverValidation(),
    commonMiddleware.checkForErrors
]
route.route('/add-update').post(middleware,driverController.addUpdate);

middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    commonMiddleware.checkForErrors
]
route.route('/get-driver').post(middleware,driverController.getDriver);

middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    driverValidation.deleteDriverValidation(),
    commonMiddleware.checkForErrors
]
route.route('/delete').post(middleware,driverController.deleteDriver);

middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    driverValidation.driverPaymentValidation(),
    commonMiddleware.checkForErrors
]
route.route('/payment').post(middleware,driverController.driverPayment);

export const driver_route = route;
