import mongoose, { Schema, Model } from "mongoose";


export class UserModel {
    public User: Model<any>

    constructor(){
        const schema: Schema<any> = new mongoose.Schema({
            f_name: {
                type: String,
                required: true,
            },
            l_name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            role: {
                type: String,
                enum: ['Admin', 'Driver', 'User'],
                required: true
            },
            refreshToken: {
                type: String
            }
        
        },{ timestamps: true })

        this.User = mongoose.model('User',schema);
    }
}