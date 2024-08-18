import express from "express";
const app = express();

import { order_route } from "./order/router/order_router";
import { user_route } from "./user/router/user_router";
import { driver_route } from "./driver/route/driver_route";

app.use('/order',order_route);
app.use('/user',user_route)
app.use('/driver',driver_route)


export const app_router = app;