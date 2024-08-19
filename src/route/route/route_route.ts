import express  from "express";
const route = express.Router();

import { RouteController } from "../controller/route_controller";
const routeController = new RouteController();

import { CommonMiddleware } from "../../helper/common_middleware";
const commonMiddleware = new CommonMiddleware();

import { RouteValidation } from "../middleware/route_middleware";
const routeValidation = new RouteValidation();

let middleware: any [] = [];

middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    routeValidation.createUpdateRouteValidation(),
    commonMiddleware.checkForErrors
]
route.route('/add-update').post(middleware,routeController.createUpdateRoute);


middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin','Driver'),
    routeValidation.getRouteWithOrder(),
    commonMiddleware.checkForErrors
]
route.route('/get-route').post(middleware,routeController.getRouteWithOrder);



middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    routeValidation.deleteRouteValidation(),
    commonMiddleware.checkForErrors
]
route.route('/delete').post(middleware,routeController.deleteRoute);


export const route_route = route;