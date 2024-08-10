import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Application = express();






const PORT = process.env.PORT || 3100;
app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`);
})