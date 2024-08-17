import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    role: string //'Admin' | 'Driver' | 'User';
    refreshToken?: string;
}

export class UserModel {
    public User: Model<IUser>

    constructor(){
        const schema: Schema<IUser> = new mongoose.Schema({
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

        schema.pre('save', async function(next) {
            // IF PASSWORD MODIFIED
            if(!this.isModified('password')) return next();
            // IF MODIFIED 
            this.password = await bcrypt.hash(this.password, 10)
            next()
        })

        schema.methods.isPasswordCorrect = async function (password: string){
            return await bcrypt.compare(password, this.password);
        }

        this.User = mongoose.model('User',schema);
    }
}