import mongoose, { Schema, Model, ObjectId } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface IStep {
    location: {
        type: String
    }
}

interface IRoute {
    routeId: string;
    orderId: mongoose.Types.ObjectId;
    steps: IStep[];
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export class RouteModel {
    public Route: Model<IRoute>;

    constructor() {
        const stepSchema: Schema<IStep> = new mongoose.Schema({
            location: {
                type: String,
                required: true,
            },
           
        },{ timestamps: true });
        const schema: Schema<IRoute> = new mongoose.Schema({
            routeId: {
                type: String,
                unique: true,
                default: function () {
                    return generateOrderId(6); 
                }
            },
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
                required: true
            },
            steps: [stepSchema],
            status: {
                type: String,
                enum: ['pending', 'in-progress', 'completed'],
                default: 'pending'
            }
        }, { timestamps: true })

        this.Route = mongoose.model('Route', schema);
    }
}

function generateOrderId(length: number = 6): string {
    return uuidv4().slice(0, length).toUpperCase();
}