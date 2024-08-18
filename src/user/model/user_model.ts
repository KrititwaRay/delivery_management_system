import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

        schema.methods.isPasswordCorrect = async function (password: string){
            return await bcrypt.compare(password, this.password);
        }
        
        schema.methods.generateAccessToken = async function (){
            const secret: any = process.env.ACCESS_TOKEN_SECRET;
            return jwt.sign({ _id: this._id, email: this.email }, secret ,{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
        }


        schema.methods.generateRefreshToken = function () {
            const secret: any = process.env.REFRESH_TOKEN_SECRET;
            return jwt.sign({
                _id: this._id,
              
            }, secret, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
        }

        this.User = mongoose.models.User || mongoose.model<IUser>('User', schema);
    }
}
