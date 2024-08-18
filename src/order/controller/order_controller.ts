import { Request, Response } from "express";
import { OrderManagementModel } from "../model/order_model";

import { IOrderAdd, IresponseObj } from "../interface/order_interface";

export class OrderController {
    private _orderManagementModel = new OrderManagementModel();

    createOrder = async (req: Request, res: Response) => {

        try {
            let orderAddObj: IOrderAdd = {
                customerName: req.body.customerName,
                deliveryAddress: req.body.deliveryAddress,
                orderStatus: req.body.orderStatus,
                totalAmount: req.body.totalAmount,
                user_id: req.body.user_id
            }
            let create_res: any = await this._orderManagementModel.Order.create(orderAddObj);

            return res.status(201).json({
                status: true,
                data: {
                    order_id: create_res.orderId
                },
                message: "Order created successfully."

            })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message});
        }
    }


    orderList = async (req: Request, res: Response) => {
        try {
            
            let user_id: object = Object.keys(req.body).length != 0 ? {user_id: req.body.user_id} : {};
            const orders = await this._orderManagementModel.Order.find(user_id).populate('user_id', 'f_name l_name email role').select( "orderId customerName deliveryAddress orderStatus totalAmount");
            let count = await this._orderManagementModel.Order.countDocuments(user_id);

            let order_list = orders.map((val: any) => {
                let orderObj = {
                    _id : val.id,
                    orderId: val.orderId,
                    deliveryAddress: val.customerName,
                    orderStatus: val.orderStatus,
                    totalAmount: val.totalAmount,
                    user: val.user_id
                   
                };
                delete val.user_id
                return orderObj
            })

           
            return res.status(200).json({
                status: true,
                data: {
                    order_list: order_list,
                    count: count
                },
                message: "Order list fetched successfully"

            })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }

    deleteOrder = async (req: any, res: Response) =>{
        try {
            let getOrderDetails: any = await this._orderManagementModel.Order.findOne({ orderId : req.body.orderId, user_id: req.body.user_id }).populate('user_id','_id')
            if(!getOrderDetails){
                return res.status(404).json({ status: false, message: "Please provide valid order details."})
            }
            if(req.user.role != 'Admin'){
                if(!req.user._id.equals(getOrderDetails.user_id._id) ){
                    return res.status(404).json({ status: false, message: "Please provide valid order id."})
                }
            }
            let deleteOrder: any = await this._orderManagementModel.Order.deleteOne({orderId: req.body.orderId});
            
            return res.status(200).json({ status: true, data: {}, message: "Order deleted successfully." })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }


    updateOrder = async(req: Request, res: Response) => {
        try {
            let responseObj: IresponseObj  = {};
    
            let updateObject = {
                customerName: req.body.customerName,
                deliveryAddress: req.body.deliveryAddress,
                orderStatus: req.body.orderStatus,
                totalAmount: req.body.totalAmount
            };
            let getOrderDetails = await this._orderManagementModel.Order.findOne({orderId: req.body.orderId}).select('_id');
            
            if(!getOrderDetails){
                return res.status(404).json({ status: false, message: "Order not found." })
            }

            let updatedOrder: any = await this._orderManagementModel.Order.findByIdAndUpdate(getOrderDetails._id,{
                $set: updateObject
            },{ new: true })
       
            responseObj.orderId= updatedOrder.orderId;
            responseObj.user_id= updatedOrder.user_id;
            return res.status(200).json({ status: true, data: { order: responseObj },message: "Order updated successfully." })
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message })
        }
    }
}