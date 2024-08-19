import express  from "express";
const route = express.Router();

import { OrderController } from "../controller/order_controller";
const orderController = new OrderController();

import { CommonMiddleware } from "../../helper/common_middleware";
const commonMiddleware = new CommonMiddleware();

import { OrderValidation } from "../middleware/order_middleware";
const orderValidation = new OrderValidation();

let middleware: any [] = [];



middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin','User'),
    orderValidation.createOrdervalidation(),
    commonMiddleware.checkForErrors
]
route.route('/create').post(middleware,orderController.createOrder);


middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin','User'),
    orderValidation.orderListValidation(),
    commonMiddleware.checkForErrors
]
route.route('/list').post(middleware,orderController.orderList);

middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin','User'),
    orderValidation.deleteOrderValidation(),
    commonMiddleware.checkForErrors
]
route.route('/delete').post(middleware,orderController.deleteOrder);

middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin'),
    orderValidation.updateOrderValidation(),
    commonMiddleware.checkForErrors
]
route.route('/update').post(middleware,orderController.updateOrder);


export const order_route = route;