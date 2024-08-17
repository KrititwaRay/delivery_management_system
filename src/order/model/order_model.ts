import mongoose, { Schema, Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface IOrder {
    orderId: string;
    customerName: string;
    deliveryAddress: string;
    orderStatus: string;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

export class OrderManagementModel {
    public Order: Model<IOrder>;
    constructor() {
        const schema: Schema<IOrder> = new mongoose.Schema({

            orderId: {
                type: String,
                required: true,
                unique: true,
                default: function () {
                    return generateOrderId(6); // generate a 6 character alphanumeric orderId
                }
            },
            customerName: {
                type: String,
                required: true,
                trim: true
            },
            deliveryAddress: {
                type: String,
                required: true,
            },
            orderStatus: {
                type: String,
                enum: ['pending', 'dispatched', 'delivered', 'canceled'],
                default: 'pending'
            },
            totalAmount: {
                type: Number,
                required: true,
            },

        }, { timestamps: true })

        schema.pre('save', function (next) {
            if (!this.orderId) {
                this.orderId = generateOrderId(6);
            }
            next();
        });
        // Middleware to generate unique orderId before saving
        // schema.pre('save', function (next) {
        //     if (!this.orderId) {
        //         this.orderId = uuidv4().slice(0, 6); // Generates a 6-character alphanumeric code
        //     }
        //     next();
        // });
        this.Order = mongoose.model('Order', schema);
    }
}

function generateOrderId(length: number = 6): string {
    return uuidv4().slice(0, length).toUpperCase();
}


