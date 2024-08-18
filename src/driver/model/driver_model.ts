import mongoose, { Schema, Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
interface IDriver{
    driverId: string,
    name: string,
    email: string,
    phone: string,
    vehicleType: string,
    status: string,
}

export class DriverModel {
    public Driver: Model<IDriver>
    constructor(){
        const schema: Schema<IDriver> = new mongoose.Schema({
            driverId: {
                type: String,
                required: true,
                unique: true,
                default: function () {
                    return generateOrderId(6); // generate a 6 character alphanumeric orderId
                }
            },
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            phone: {
                type: String,
                required: true,
                unique: true
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ['van', 'bike',],
            },
            status: {
                type: String,
                required: true,
                enum: ['active', 'inactive'],
                default: 'inactive'
            }
        },{ timestamps: true })

        this.Driver = mongoose.model('Driver', schema);
    }
}

function generateOrderId(length: number = 6): string {
    return uuidv4().slice(0, length).toUpperCase();
}