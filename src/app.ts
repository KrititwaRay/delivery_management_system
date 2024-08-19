import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

import { Config } from './configuration/config';
const config = new Config().connectMongoDb();

app.use(express.json({ limit: '150mb' }));

import { app_router } from "./app_routing";
app.use('/v1',app_router);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


