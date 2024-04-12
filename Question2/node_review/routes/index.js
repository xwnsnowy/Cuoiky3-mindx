import { Router } from "express";
import orderRouter from "./order.js";
import authRouter from "./auth.js";
import inventoryRouter from "./inventory.js";

const router = Router();

router.use("/inventories", inventoryRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);

export default router;
