import express from "express";
const app = express();




import { order_route } from "./order/router/order_router";
import { user_route } from "./user/router/user_router";


app.use('/order',order_route);
app.use('/user',user_route)






export const app_router = app;