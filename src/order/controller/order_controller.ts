import { Request, Response } from "express";
import { OrderManagementModel } from "../model/order_model";

import { IOrderAdd } from "../interface/order_interface";

export class OrderController {
    private _orderManagementModel = new OrderManagementModel();

    createOrder = async (req: Request, res: Response) => {

        try {

            let orderAddObj: IOrderAdd = {
                customerName: req.body.customerName,
                deliveryAddress: req.body.deliveryAddress,
                orderStatus: req.body.orderStatus,
                totalAmount: req.body.totalAmount
            }
            let create_res: any = await this._orderManagementModel.Order.create(orderAddObj);

            return res.status(201).json({
                status: true,
                order_id: create_res.orderId,
                message: "Order created successfully."

            })
        } catch (error: any) {
            return res.status(404).json({
                status: false,
                message: error.message
            })
        }
    }


    orderList = async (req: Request, res: Response) => {
        try {
            let list_res: any = await this._orderManagementModel.Order.find().select("orderId customerName deliveryAddress orderStatus totalAmount");

            list_res = JSON.parse(JSON.stringify(list_res)) ;

            let order_list = list_res.map((val: any) => {
                delete val._id;
                return ({
                    order_id: val.orderId,
                    customer_name: val.customerName,
                    delivery_address: val.deliveryAddress,
                    order_status: val.orderStatus,
                    total_amount: val.totalAmount
                })
            })
          
            return res.status(200).json({
                status: true,
                order_list: order_list,
                message: "Order list fetched successfully"

            })
        } catch (error: any) {
            return res.status(404).json({
                status: false,
                message: error.message
            })
        }
    }


    getPerticularOrder = async( req: Request, res: Response) => {
        try {
            
            let order: any = await this._orderManagementModel.Order.findOne({ orderId: req.body.orderId })
            console.log(order);
        } catch (error: any) {
            return res.status(404).json({
                status: false,
                message: error.message
            })
        }
    }

    updateOrder = async (req: Request, res: Response) =>{
        try {
            
        } catch (error: any) {
            
        }
    }


    deleteOrder = async(req: Request, res: Response) => {
        try {
            
        } catch (error: any) {
            
        }
    }
}