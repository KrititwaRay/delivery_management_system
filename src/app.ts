import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app: Application = express();

import { Config } from './configuration/config';
declare global {
    var connectionObj: mongoose.Connection | null;
}
// Initialize the global connectionObj with a null value to be set later
global.connectionObj = null;

app.use(express.json({ limit: '150mb' }));

import { app_router } from "./app_routing";
app.use('/v1',app_router);


(() => {
    try {
        const config = new Config().connectMongoDb();
        global.connectionObj = mongoose.connection; // Store the connection object globally
        const PORT = process.env.PORT || 3100;
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    } catch (error) {
        console.log('Failed to initialize server:', error);
    }
})();
