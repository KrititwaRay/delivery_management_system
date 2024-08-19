import { Request, Response } from "express";
import { RouteModel } from "../model/route_model";
import { OrderManagementModel } from "../../order/model/order_model";
import { IaddUpdateObj } from "../interface/route_interface";
export class RouteController {
    private _routeModel = new RouteModel();
    private _orderManagementModel = new OrderManagementModel();

    createUpdateRoute = async( req: any, res: Response) => {

        try {
            let route: any;
            let addUpdateObj: IaddUpdateObj = {
                orderId: req.body.orderId,
                steps: req.body.steps,
                status: req.body.status,
            }
            if(req.user.role == 'Driver'){
                delete addUpdateObj.orderId
            }
            let checkOrder: any = await this._orderManagementModel.Order.countDocuments({ _id: req.body.orderId })
            
            if(checkOrder == 0){
                return res.status(404).json({ status: false, message: "Please provide valid order id." })
            }

            if(req.body.routeId == ''){
                // CREATE ROUTE
                route = await this._routeModel.Route.create(addUpdateObj)

            }else{
                // UPDATE ROUTE
                let checkRoute: any = await this._routeModel.Route.findOne({ routeId: req.body.routeId }).select('_id');

                if(!checkRoute){
                    return res.status(404).json({ status: false, message: "Route not found." })
                }
                route = await this._routeModel.Route.findByIdAndUpdate(checkRoute._id,{ $set: addUpdateObj})
            }
            return res.status(200).json({ status: true,data: { routeId: route.routeId } ,message: `Route ${req.body.routeId == '' ? 'created' : 'updated'} successfully.`});
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message});
        }

    }

    getRouteWithOrder = async (req: Request, res: Response) => {
        try {
            
            let routeId = req.body.routeId == '' ? {} : { routeId: req.body.routeId };
            if (Object.keys(routeId).length != 0) {
                let checkRouteId: number = await this._routeModel.Route.countDocuments({ routeId: req.body.routeId });
                if (checkRouteId == 0) {
                    return res.status(500).json({ status: false, message: "Please provide valid route id." });
                }
            }
            let route: any = await this._routeModel.Route.find(routeId).populate('orderId','orderId customerName deliveryAddress totalAmount').select('-createdAt -updatedAt -__v')

            let route_list = route.map((val: any) => {
                let route_list_obj = {
                    customerName: val.orderId.customerName,
                    deliveryAddress: val.orderId.deliveryAddress,
                    totalAmount: val.orderId.totalAmount,
                    orderId: val.orderId.orderId,
                    status: val.status,
                    routeId: val.routeId,
                    steps: val.steps
                }

                return route_list_obj
            })
           
            return res.status(200).json({ status: false, data:{
                route: route_list
            } , message: 'Route fetched successfully.' });
        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }


    deleteRoute = async( req: Request, res: Response) => {
        try {
            let checkRoute: any = await this._routeModel.Route.findOne({ routeId: req.body.routeId }).select('status');
            if(!checkRoute){
                return res.status(404).json({ status: false, message: 'Route not found.' });
            }
            if(checkRoute.status != 'completed'){
                return res.status(400).json({ status: false, message: 'Cannot delete the route because it is not completed yet.' });
            }

            let delete_route = await this._routeModel.Route.deleteOne({ _id:checkRoute._id });

            return res.status(200).json({ status: false, data:{} , message: 'Route deleted successfully.' });

        } catch (error: any) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }
}