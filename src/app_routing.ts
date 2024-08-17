import express from "express";
const app = express();




import { order_route } from "./orderManagement/router/order_router";


app.use('/order',order_route);






export const app_router = app;