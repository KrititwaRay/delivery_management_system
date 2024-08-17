import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app: Application = express();

import { Config } from './configuration/config';
// declare global {
//     var connectionObj: mongoose.Connection;
// }
// Initialize the global connectionObj with a null value to be set later

const config = new Config().connectMongoDb();
// Store the connection object globally
// global.connectionObj = mongoose.connection; 

app.use(express.json({ limit: '150mb' }));

import { app_router } from "./app_routing";
app.use('/v1',app_router);



const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


