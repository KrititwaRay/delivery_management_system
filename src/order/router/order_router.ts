import express  from "express";
const route = express.Router();


import { OrderController } from "../controller/order_controller";
const orderController = new OrderController();

import { CommonMiddleware } from "../../helper/common_middleware";
const commonMiddleware = new CommonMiddleware();

let middleware: any [] = [];



middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin','User'),
    commonMiddleware.checkForErrors
]
route.route('/create').post(middleware,orderController.createOrder);


middleware = [
    commonMiddleware.authenticationMiddleware,
    commonMiddleware.isAuthorized('Admin','User'),
    commonMiddleware.checkForErrors
]
route.route('/list').get(orderController.orderList);


route.route('/order').get(orderController.updateOrder);
route.route('/order-update').get(orderController.getPerticularOrder);
route.route('/order-delete').get(orderController.deleteOrder);







export const order_route = route;