import express  from "express";
const route = express.Router();


import { OrderController } from "../controller/order_controller";
const orderController = new OrderController();



route.route('/create').post(orderController.createOrder);


route.route('/list').get(orderController.orderList);


route.route('/order').get(orderController.updateOrder);
route.route('/order-update').get(orderController.getPerticularOrder);
route.route('/order-delete').get(orderController.deleteOrder);







export const order_route = route;