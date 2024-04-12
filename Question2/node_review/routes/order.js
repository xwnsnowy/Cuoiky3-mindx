import { Router } from "express";

import { checkPermission } from "../middlewares/checkPermission.js";
import { getOrder } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.use(checkPermission);
orderRouter.get("/", getOrder);

export default orderRouter;
